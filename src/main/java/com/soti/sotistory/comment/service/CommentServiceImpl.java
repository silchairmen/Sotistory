package com.soti.sotistory.comment.service;

import com.soti.sotistory.comment.dto.CommentSaveDto;
import com.soti.sotistory.comment.dto.CommentUpdateDto;
import com.soti.sotistory.comment.entity.Comment;
import com.soti.sotistory.comment.repository.CommentRepository;
import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.promotional.repository.PromotionalPostRepository;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PromotionalPostRepository postRepository;

    @Override
    public void save(Long postId, CommentSaveDto commentSaveDto) {
        Comment comment = commentSaveDto.toEntity();

        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        commentRepository.save(comment);
    }

    @Override
    public void saveReComment(Long postId, Long parentId, CommentSaveDto commentSaveDto) {
        Comment comment = commentSaveDto.toEntity();

        comment.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        comment.confirmPost(postRepository.findById(postId).orElseThrow(() -> new PostException(PostErrorCode.POST_NOT_FOUND)));

        comment.confirmParent(commentRepository.findById(parentId).orElseThrow(() -> new CommentException(CommentExceptionType.NOT_POUND_COMMENT)));

        commentRepository.save(comment);
    }

    @Override
    public void update(Long id, CommentUpdateDto commentUpdateDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CommentException(CommentExceptionType.NOT_POUND_COMMENT));

        if(!comment.getWriter().getNickname().equals(SecurityUtil.getLoginUserNickname())) {
            throw new CommentException(CommentExceptionType.NOT_AUTHORITY_UPDATE_COMMENT);
        }

        commentUpdateDto.getContent().ifPresent(comment::updateContent);
    }

    @Override
    public void remove(Long id){
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CommentException(CommentExceptionType.NOT_POUND_COMMENT));
        comment.remove(); //쿼리 수정
        List<Comment> removableCommentList = comment.findRemovableList();
        removableCommentList.forEach(removableComment -> commentRepository.delete(removableComment)); //실제 삭제
    }
}
