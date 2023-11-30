package com.soti.sotistory.image.service;

import com.soti.sotistory.post.exception.PostErrorCode;
import com.soti.sotistory.post.exception.PostException;
import com.soti.sotistory.post.file.exception.FileErrorCode;
import com.soti.sotistory.post.file.exception.FileException;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${file.dir}") // application.properties에 설정된 저장 경로
    private String uploadPath;

    public String saveImage(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            String fileType = StringUtils.getFilenameExtension(file.getOriginalFilename());

            if (!isValidImageType(fileType)) {
                throw new FileException(FileErrorCode.FILE_CAN_NOT_SAVE);
            }

            String returnUrl = UUID.randomUUID() + "." + fileType;

            Path path = Paths.get(uploadPath + returnUrl);
            Files.write(path, bytes);

            return returnUrl;
        } catch (IOException ex) {
            throw new FileException(FileErrorCode.FILE_CAN_NOT_SAVE);
        }
    }

    private boolean isValidImageType(String fileType) {
        return "jpg".equalsIgnoreCase(fileType) || "png".equalsIgnoreCase(fileType);
    }

}
