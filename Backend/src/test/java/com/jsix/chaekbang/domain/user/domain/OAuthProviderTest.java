package com.jsix.chaekbang.domain.user.domain;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class OAuthProviderTest {


    @Test
    void test(){
        String name = "KAKAO2";
        OAuthProvider of = OAuthProvider.valueOf(name);

        System.out.println(of);
    }
}