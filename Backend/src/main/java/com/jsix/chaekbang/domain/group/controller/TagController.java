package com.jsix.chaekbang.domain.group.controller;

import com.jsix.chaekbang.domain.group.application.TagSearchUseCase;
import com.jsix.chaekbang.global.dto.HttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagSearchUseCase tagSearchUseCase;

    @GetMapping("/popular")
    public ResponseEntity<?> searchPopularTag() {
        return HttpResponse.okWithData(HttpStatus.OK, "인기 태그가 조회되었습니다.",
                tagSearchUseCase.searchPopularTag());
    }
}
