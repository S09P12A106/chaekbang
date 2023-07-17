package com.jsix.chaekbang;

import com.jsix.chaekbang.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SampleController {


    @GetMapping("/api/sample1")
    public ResponseEntity<?> getSample1(){

        return HttpResponse.ok(HttpStatus.OK, "sample1 요청 성공");
    }

    @GetMapping("/api/sample2")
    public ResponseEntity<?> getSample2(){
        List<String> sample = List.of("jin","jojo","jun");
        return HttpResponse.okWithData(HttpStatus.OK,"sample2 요청 성공", sample);
    }
}
