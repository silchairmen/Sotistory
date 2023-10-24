package com.soti.sotistory.post.promotional.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Data
@AllArgsConstructor
public class PromotionalPostUpdateDto {
    private Optional<String> title;
    private Optional<String> content;
    private Optional<MultipartFile> uploadFile;
}
