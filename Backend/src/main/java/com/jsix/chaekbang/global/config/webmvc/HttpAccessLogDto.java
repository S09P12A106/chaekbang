package com.jsix.chaekbang.global.config.webmvc;

import lombok.Builder;
import lombok.Getter;

@Getter
public class HttpAccessLogDto {

    private String method;

    private String url;

    private String ip;


    @Builder
    public HttpAccessLogDto(String method, String url, String ip) {
        this.method = method;
        this.url = url;
        this.ip = ip;
    }

    @Override
    public String toString() {
        return "[METHOD]=\"" + method + "\" [URL]=\"" + url + "\" [IP]=\"" + ip + "\"";
    }
}
