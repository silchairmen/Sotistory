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


@Service
@RequiredArgsConstructor
@Transactional
public class PromotionalCommentService {

    private final PromotionalCommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PromotionalPostRepository postRepository;

    public void save(Long postId, PromotionalCommentSaveDto commentSaveDto) {
        PromotionalComment comment = commentSaveDto.toEntity();

        //writer 지정
        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        //post 지정
        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        //저장
        commentRepository.save(comment);
    }

    public void update(Long commentId, PromotionalCommentUpdateDto commentUpdateDto) {
        PromotionalComment comment = commentRepository.findById(commentId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        if(!comment.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())) {
            throw new CommentException(CommentErrorCode.NOT_AUTHORITY_UPDATE_COMMENT);
        }

        commentUpdateDto.getContent().ifPresent(comment::updateContent);
    }

    public void remove(Long commentId) {
        PromotionalComment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentException(CommentErrorCode.NOT_POUND_COMMENT));

        commentRepository.delete(comment);
    }
}
