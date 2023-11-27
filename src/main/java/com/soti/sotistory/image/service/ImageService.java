package com.soti.sotistory.image.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    @Value("${file.dir}") // application.properties에 설정된 저장 경로
    private String uploadPath;

    public void saveImage(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        Path path = Paths.get(uploadPath + file.getOriginalFilename());
        Files.write(path, bytes);
    }
}
