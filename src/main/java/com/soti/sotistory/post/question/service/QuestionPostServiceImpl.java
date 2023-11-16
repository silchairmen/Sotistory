package com.soti.sotistory.post.question.service;

import com.soti.sotistory.post.PostType;
import com.soti.sotistory.post.question.dto.QuestionPostDetailInfoDto;
import com.soti.sotistory.post.question.dto.QuestionPostListDto;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.dto.QuestionPostUpdateDto;
import com.soti.sotistory.post.question.entity.QuestionPost;
import com.soti.sotistory.post.question.repository.QuestionPostRepository;
import com.soti.sotistory.post.question.repository.QuestionPostRepositoryCustom;
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
public class QuestionPostServiceImpl implements QuestionPostService {

    private final MemberRepository memberRepository;
    private final QuestionPostRepository postRepository;
    private final QuestionPostRepositoryCustom postRepositoryCustom;

    @Override
    public void save(QuestionPostSaveDto postSaveDto) {

        QuestionPost post = postSaveDto.toEntity();

        post.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        if(postSaveDto.getPassword()!=null){
            post.updatePostType(PostType.HIDDEN);
            post.updatePassword(postSaveDto.getPassword());
        } else {
            post.updatePostType(PostType.NORMAL);
        }

        post.addAnswerCompleted();

        postRepository.save(post);
    }

    @Override
    public void update(Long id, QuestionPostUpdateDto postUpdateDto) {
        QuestionPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        checkAuthority(post, PostErrorCode.NOT_AUTHORITY_UPDATE_POST);

        //제목, 내용 처리
        postUpdateDto.getTitle().ifPresent(post::updateTitle);
        postUpdateDto.getContent().ifPresent(post::updateContent);
        postUpdateDto.getAnswerCompleted().ifPresent(post::updateAnswerCompleted);

        if(postUpdateDto.getPassword().isEmpty()){
          post.updatePostType(PostType.NORMAL);
          post.updatePassword(null);
        } else {
            post.updatePostType(PostType.HIDDEN);
            postUpdateDto.getPassword().ifPresent(post::updatePassword);
        }
    }

    @Override
    public void delete(Long id) {
        QuestionPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        checkAuthority(post, PostErrorCode.NOT_AUTHORITY_UPDATE_POST);

        postRepository.delete(post);
    }

    @Override
    public QuestionPostDetailInfoDto getPostInfo(Long id, String password) {
        QuestionPost post = postRepository.findById(id).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));
        if(post.getPostType().equals(PostType.HIDDEN)){
            try{
                if(post.getPassword().equals(password) || post.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())){
                    return new QuestionPostDetailInfoDto(post);
                } else {
                    throw new PostException(PostErrorCode.NOT_AUTHORITY_POST);
                }
            } catch (Exception e){
                throw new PostException(PostErrorCode.NOT_AUTHORITY_POST);
            }
        } else {
            return new QuestionPostDetailInfoDto(post);
        }
    }

    @Override
    public ResponseEntity<QuestionPostListDto> getPostList(Pageable pageable, PostSearchCondition condition) {
        Page<QuestionPost> result = this.postRepositoryCustom.getPostList(pageable, condition);
        return new ResponseEntity<>(QuestionPostListDto.builder()
                .postList(result.getContent())
                .totalCount(result.getTotalElements())
                .totalPages((long)result.getTotalPages())
                .build(), HttpStatus.OK);
    }



    private void checkAuthority(QuestionPost post, PostErrorCode postErrorCode){
        if(!post.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())){
            throw new PostException(postErrorCode);
        }
    }
}
