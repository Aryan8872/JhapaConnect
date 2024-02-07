package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.service.Fileservice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceimpl implements Fileservice {
    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        // get file name
        String name = file.getOriginalFilename();  //name of the uploaded file without any changes(original)


        //random name generate file
        String randomId = UUID.randomUUID().toString();
        String fileName1=randomId.concat(name.substring(name.lastIndexOf(".")));

        //create full path
        String filePath = path + File.separator + fileName1;


        //create images folder images if not

        File f = new File(path);  //path upto images folder
        if(!f.exists()){   //check if folder with the path exists
            f.mkdir();
        }
        //file copy

        Files.copy(file.getInputStream(), Paths.get(filePath));  //source,target


        return fileName1;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream strem = new FileInputStream(fullPath) ;
        return strem;
    }
}
