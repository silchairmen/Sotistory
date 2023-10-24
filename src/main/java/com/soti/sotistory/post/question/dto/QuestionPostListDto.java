package com.soti.sotistory.post.question.dto;

import com.soti.sotistory.post.promotional.dto.PromotionalPostInfoDto;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.post.question.entity.QuestionPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class QuestionPostListDto {

    private List<QuestionPostInfoDto> postInfoDtoList = new ArrayList<>();

    private Long totalPages;

    private Long totalCount;

    @Builder
    public QuestionPostListDto(List<QuestionPost> postList, Long totalPages, Long totalCount) {
        this.postInfoDtoList = postList.stream().map(QuestionPostInfoDto::new).collect(Collectors.toList());
        this.totalPages = totalPages;
        this.totalCount = totalCount;
    }
}
