package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.comment.promotional.dto.PromoationalCommentInfoDto;
import com.soti.sotistory.comment.promotional.entity.PromotionalComment;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class PromotionalPostDetailInfoDto {

    private Long postId; //POST의 ID
    private String title;//제목
    private String content;//내용
    private String filePath;//업로드 파일 경로
    private String writer;//작성자에 대한 정보
    private List<PromoationalCommentInfoDto> commentInfoDtoList;//댓글 정보들

    public PromotionalPostDetailInfoDto(PromotionalPost post) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.filePath = post.getFilePath();
        this.writer = post.getWriter().getNickname();

        /**
         * 댓글과 대댓글을 그룹짓기
         * post.getCommentList()는 댓글과 대댓글이 모두 조회된다.
         */

        Map<PromotionalComment, List<PromotionalComment>> commentListMap = post.getPromotionalCommentList().stream()
                .filter(comment -> comment.getParent() != null)
                .collect(Collectors.groupingBy(PromotionalComment::getParent));

        /**
         * 댓글과 대댓글을 통해 CommentInfoDto 생성
         */

        commentInfoDtoList = commentListMap.keySet().stream()
                .map(comment -> new PromoationalCommentInfoDto(comment, commentListMap.get(comment)))
                .toList();
    }

}
