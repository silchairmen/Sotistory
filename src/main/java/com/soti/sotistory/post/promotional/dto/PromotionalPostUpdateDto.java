package com.soti.sotistory.post.promotional.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Data
public class PromotionalPostUpdateDto {
    private Optional<String> title;
    private Optional<String> content;
    private Optional<MultipartFile> uploadFile;

    public PromotionalPostUpdateDto(Optional<String> title, Optional<String> content, Optional<MultipartFile> uploadFile) {
        this.title = title;
        this.content = content;
        this.uploadFile = uploadFile;
    }

    public Optional<String> getTitle() {
        return title;
    }

    public void setTitle(Optional<String> title) {
        this.title = title;
    }

    public Optional<String> getContent() {
        return content;
    }

    public void setContent(Optional<String> content) {
        this.content = content;
    }

    public Optional<MultipartFile> getUploadFile() {
        return uploadFile;
    }

    public void setUploadFile(Optional<MultipartFile> uploadFile) {
        this.uploadFile = uploadFile;
    }
}
