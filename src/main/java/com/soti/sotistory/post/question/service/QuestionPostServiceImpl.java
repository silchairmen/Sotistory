package com.soti.sotistory.post.question.service;

import com.soti.sotistory.member.repository.MemberRepository;
import com.soti.sotistory.post.PostType;
import com.soti.sotistory.post.question.dto.QuestionPostSaveDto;
import com.soti.sotistory.post.question.entity.QuestionPost;
import com.soti.sotistory.post.question.repository.QuestionPostRepository;
import com.soti.sotistory.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionPostServiceImpl implements QuestionPostService {

    private final MemberRepository memberRepository;
    private final QuestionPostRepository postRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void save(QuestionPostSaveDto postSaveDto) {

        QuestionPost post = postSaveDto.toEntity();

        post.confirmWriter(memberRepository.findByNickname(SecurityUtil.getLoginUserNickname()));

        if(postSaveDto.getPassword()!=null){
            post.setContentType(PostType.HIDDEN);
            post.setPassword(postSaveDto.getPassword());
        } else {
            post.setContentType(PostType.NORMAL);
        }

        postRepository.save(post);
    }
}
