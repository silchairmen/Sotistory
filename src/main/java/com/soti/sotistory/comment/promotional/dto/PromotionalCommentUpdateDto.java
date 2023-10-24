package com.soti.sotistory.comment.promotional.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class PromotionalCommentUpdateDto {

    private Optional<String> content;

}
