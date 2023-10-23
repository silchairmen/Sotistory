package com.soti.sotistory.post.promotional.service;

import com.soti.sotistory.exception.PostNotFoundException;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.file.service.FileService;
import com.soti.sotistory.post.promotional.dto.PromotionalPostInfoDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
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
                throw new RuntimeException(e);
            }

        });

        postRepository.save(post);
    }

    @Override
    public void update(Long id, PromotionalPostUpdateDto promotionalPostUpdateDto) {
        PromotionalPost post = postRepository.findById(id).orElseThrow(RuntimeException::new);

        checkAuthority(post);

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
                        throw new RuntimeException(e);
                    }
                }
                , () -> post.updateFilePath(null));
    }

    private void checkAuthority(PromotionalPost post){
        if(!post.getWriter().getNickname().toString().equals(SecurityUtil.getLoginUserNickname())){
            throw new RuntimeException();
        }
    }

    @Override
    public void delete(Long id) {
        PromotionalPost post = postRepository.findById(id).orElseThrow(() ->
                new PostNotFoundException("없음"));

        checkAuthority(post);

        //기존에 올린 파일 지우기
        if(post.getFilePath() !=null){
            fileService.delete(post.getFilePath());
        }

        postRepository.delete(post);
    }

    @Override
    public PromotionalPostInfoDto getPostInfo(Long id) {
        return new PromotionalPostInfoDto(postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("글 없음")));
    }
}
