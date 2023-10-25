package com.soti.sotistory.post.promotional.service;

import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.file.exception.FileErrorCode;
import com.soti.sotistory.post.file.exception.FileException;
import com.soti.sotistory.post.file.service.FileService;
import com.soti.sotistory.post.promotional.dto.PromotionalPostDetailInfoDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostListDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostSaveDto;
import com.soti.sotistory.post.promotional.dto.PromotionalPostUpdateDto;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.post.promotional.repository.PromotionalPostRepository;
import com.soti.sotistory.post.promotional.repository.PromotionalPostRepositoryCustom;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PromotionalPostServiceImpl implements PromotionalPostService{

    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final PromotionalPostRepository postRepository;
    private final PromotionalPostRepositoryCustom postRepositoryCustom;

    @Override
    public void save(PromotionalPostSaveDto postSaveDto) {
        PromotionalPost post = postSaveDto.toEntity();

        post.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        postSaveDto.getUploadFile().ifPresent(file -> {
            try {
                post.updateFilePath(fileService.save(file));
            } catch (Exception e) {
                throw new FileException(FileErrorCode.FILE_CAN_NOT_SAVE);
            }

        });

        postRepository.save(post);

        log.info("NickName : "+post.getWriter().getNickname()+" -> Promotional Post 작성");
    }

    @Override
    public void update(Long id, PromotionalPostUpdateDto postUpdateDto) {
        PromotionalPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        checkAuthority(post,PostErrorCode.NOT_AUTHORITY_UPDATE_POST);

        //제목, 내용 처리
        postUpdateDto.getTitle().ifPresent(post::updateTitle);
        postUpdateDto.getContent().ifPresent(post::updateContent);

        //수정 후 기존 파일이 없어졌을 시 삭제
        if(post.getFilePath() != null) {
            fileService.delete(post.getFilePath());
        }

        //첨부파일 처리
        postUpdateDto.getUploadFile().ifPresentOrElse(
                multipartFile -> {
                    try {
                        post.updateFilePath(fileService.save(multipartFile));
                    } catch (Exception e) {
                        throw new FileException(FileErrorCode.FILE_CAN_NOT_SAVE);
                    }
                }
                , () -> post.updateFilePath(null));

        log.info("NickName : "+post.getWriter().getNickname()+" -> Promotional Post 수정");
    }


    @Override
    public void delete(Long id) {
        PromotionalPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        checkAuthority(post, PostErrorCode.NOT_AUTHORITY_DELETE_POST);

        //기존에 올린 파일 지우기
        if(post.getFilePath() !=null){
            fileService.delete(post.getFilePath());
        }

        postRepository.delete(post);

        log.info("NickName : "+post.getWriter().getNickname()+" -> Promotional Post 삭제");
    }

    private void checkAuthority(PromotionalPost post, PostErrorCode postErrorCode){
        if(!post.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())){
            throw new PostException(postErrorCode);
        }
    }

    @Override
    public PromotionalPostDetailInfoDto getPostInfo(Long id) {
        return new PromotionalPostDetailInfoDto(postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));
    }

    @Override
    public ResponseEntity<PromotionalPostListDto> getPostList(Pageable pageable, PostSearchCondition condition) {
        Page<PromotionalPost> result = this.postRepositoryCustom.getPostList(pageable, condition);
        return new ResponseEntity<>(PromotionalPostListDto.builder()
                .postList(result.getContent())
                .totalCount(result.getTotalElements())
                .totalPages((long)result.getTotalPages())
                .build(), HttpStatus.OK);
    }
}
