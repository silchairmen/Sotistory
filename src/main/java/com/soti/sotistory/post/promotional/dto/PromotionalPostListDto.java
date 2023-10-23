package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class PromotionalPostListDto {

    private List<PromotionalPostInfoDto> postInfoDtoList = new ArrayList<>();

    private Long totalPages;

    private Long totalCount;

    @Builder
    public PromotionalPostListDto(List<PromotionalPost> postList, Long totalPages, Long totalCount) {
        this.postInfoDtoList = postList.stream().map(PromotionalPostInfoDto::new).collect(Collectors.toList());
        this.totalPages = totalPages;
        this.totalCount = totalCount;
    }
}