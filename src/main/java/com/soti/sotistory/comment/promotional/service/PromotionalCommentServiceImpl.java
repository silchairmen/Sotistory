package com.soti.sotistory.comment.promotional.service;

import com.soti.sotistory.comment.exception.CommentErrorCode;
import com.soti.sotistory.comment.exception.CommentException;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentSaveDto;
import com.soti.sotistory.comment.promotional.dto.PromotionalCommentUpdateDto;
import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import com.soti.sotistory.comment.promotional.repository.PromotionalCommentRepository;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.promotional.repository.PromotionalPostRepository;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PromotionalCommentServiceImpl implements PromotionalCommentService {

    private final PromotionalCommentRepository promotionalCommentRepository;
    private final MemberRepository memberRepository;
    private final PromotionalPostRepository postRepository;

    @Override
    public void save(Long postId, PromotionalCommentSaveDto promotionalCommentSaveDto) {
        PromotionalComment comment = promotionalCommentSaveDto.toEntity();

        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        promotionalCommentRepository.save(comment);
    }

    @Override
    public void saveReComment(Long postId, Long parentId, PromotionalCommentSaveDto promotionalCommentSaveDto) {
        PromotionalComment comment = promotionalCommentSaveDto.toEntity();

        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        comment.confirmParent(promotionalCommentRepository.findById(parentId).orElseThrow(() -> new CommentException(CommentErrorCode.NOT_POUND_COMMENT)));

        promotionalCommentRepository.save(comment);
    }

    @Override
    public void update(Long id, PromotionalCommentUpdateDto promotionalCommentUpdateDto) {
        PromotionalComment comment = promotionalCommentRepository.findById(id).orElseThrow(() -> new CommentException(CommentErrorCode.NOT_POUND_COMMENT));

        if(!comment.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())) {
            throw new CommentException(CommentErrorCode.NOT_AUTHORITY_UPDATE_COMMENT);
        }

        promotionalCommentUpdateDto.getContent().ifPresent(comment::updateContent);
    }

    @Override
    public void remove(Long id){
        PromotionalComment comment = promotionalCommentRepository.findById(id).orElseThrow(() -> new CommentException(CommentErrorCode.NOT_POUND_COMMENT));
        comment.remove(); //쿼리 수정
        List<PromotionalComment> removableCommentList = comment.findRemovableList();
        removableCommentList.forEach(removableComment -> promotionalCommentRepository.delete(removableComment)); //실제 삭제
    }
}
