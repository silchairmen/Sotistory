package com.soti.sotistory.post.file.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{

    @Value("${file.dir}")
    private String fileDir;

    @Override
    public String save(MultipartFile multipartFile) throws Exception {
        String filePath = fileDir + UUID.randomUUID();

        multipartFile.transferTo(new File(filePath)); //exception 추가 save 실패

        return filePath;
    }

    @Override
    public void delete(String filePath) {
        File file = new File(filePath);

        if(!file.exists()) return;

//        if(!file.delete()) throw new Exception(() -> );
    }
}
