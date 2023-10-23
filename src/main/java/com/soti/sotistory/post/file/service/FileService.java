package com.soti.sotistory.post.file.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String save(MultipartFile multipartFile) throws Exception;

    void delete(String filePath);
}
