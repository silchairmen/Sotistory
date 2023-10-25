package com.soti.sotistory.comment.question.service;

import com.soti.sotistory.comment.exception.CommentErrorCode;
import com.soti.sotistory.comment.exception.CommentException;
import com.soti.sotistory.comment.question.dto.QuestionCommentSaveDto;
import com.soti.sotistory.comment.question.dto.QuestionCommentUpdateDto;
import com.soti.sotistory.comment.question.entity.QuestionComment;
import com.soti.sotistory.comment.question.repository.QuestionCommentRepository;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.question.repository.QuestionPostRepository;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class QuestionCommentService {

    private final QuestionCommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final QuestionPostRepository postRepository;

    public void save(Long postId, QuestionCommentSaveDto commentSaveDto) {
        QuestionComment comment = commentSaveDto.toEntity();

        //writer 지정
        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        //post 지정
        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        //저장
        commentRepository.save(comment);

        log.info("NickName : "+comment.getWriter().getNickname()+" -> Question Comment 작성");
    }

    public void update(Long commentId, QuestionCommentUpdateDto commentUpdateDto) {
        QuestionComment comment = commentRepository.findById(commentId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND));

        if(!comment.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())) {
            throw new CommentException(CommentErrorCode.NOT_AUTHORITY_UPDATE_COMMENT);
        }

        commentUpdateDto.getContent().ifPresent(comment::updateContent);

        log.info("NickName : "+comment.getWriter().getNickname()+" -> Question Comment 수정");
    }

    public void remove(Long commentId) {
        QuestionComment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentException(CommentErrorCode.NOT_POUND_COMMENT));

        commentRepository.delete(comment);

        log.info("NickName : "+comment.getWriter().getNickname()+" -> Question Comment 삭제");
    }
}
