package com.soti.sotistory.post.promotional.dto;

import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Data
@AllArgsConstructor
public class PromotionalPostSaveDto {

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    private Optional<MultipartFile> uploadFile;

    public PromotionalPost toEntity() {
        return PromotionalPost.builder().title(title).content(content).build();
    }
}
