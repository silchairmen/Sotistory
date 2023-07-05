package com.soti.sotistory.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/member")
public class MemberAuthController {

    //로그인 페이지 접근
    @GetMapping(value = "/login")
    public String memberLoginPage(Model model){

    }

    //로그인 시도
    @PostMapping("/login")
    public String memberLogin(){

    }

    //로그인 에러
    @GetMapping(value = "/login/error")
    public String memberLoginError(Model model){

    }


    //Join 페이지 접근
    @GetMapping(value = "/join")
    public String memberJoinPage(Model model){

    }

    //Join 시도
    @PostMapping(value = "/join")
    public String memberJoin(){

    }
}
