package com.soti.sotistory.post.promotional.service;

import com.soti.sotistory.exception.PostNotFoundException;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.file.exception.FileException;
import com.soti.sotistory.post.file.exception.FileExceptionType;
import com.soti.sotistory.post.file.service.FileService;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.post.promotional.exception.PostException;
import com.soti.sotistory.post.promotional.exception.PostExceptionType;
import com.soti.sotistory.post.promotional.repository.PromotionalPostRepository;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PromotionalPostServiceImpl implements PromotionalPostService{

    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final PromotionalPostRepository postRepository;

    @Override
    public void save(PromotionalPostSaveDto promotionalPostSaveDto) {
        PromotionalPost post = promotionalPostSaveDto.toEntity();

        post.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        promotionalPostSaveDto.getUploadFile().ifPresent(file -> {
            try {
                post.updateFilePath(fileService.save(file));
            } catch (Exception e) {
                throw new FileException(FileExceptionType.FILE_CAN_NOT_SAVE);
            }
        });

        postRepository.save(post);
    }

    @Override
    public void update(Long id, PromotionalPostUpdateDto promotionalPostUpdateDto) {
        PromotionalPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostExceptionType.POST_NOT_POUND));

        checkAuthority(post, PostExceptionType.NOT_AUTHORITY_UPDATE_POST);

        //제목, 내용 처리
        promotionalPostUpdateDto.getTitle().ifPresent(post::updateTitle);
        promotionalPostUpdateDto.getContent().ifPresent(post::updateContent);

        //수정 후 기존 파일이 없어졌을 시 삭제
        if(post.getFilePath() != null) {
            fileService.delete(post.getFilePath());
        }

        //첨부파일 처리
        promotionalPostUpdateDto.getUploadFile().ifPresentOrElse(
                multipartFile -> {
                    try {
                        post.updateFilePath(fileService.save(multipartFile));
                    } catch (Exception e) {
                        throw new FileException(FileExceptionType.FILE_CAN_NOT_SAVE);
                    }
                }
                , () -> post.updateFilePath(null));
    }

    private void checkAuthority(PromotionalPost post, PostExceptionType postExceptionType) {
        if(!post.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname()))
            throw new PostException(postExceptionType);
    }
}
