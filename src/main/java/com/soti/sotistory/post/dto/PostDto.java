package com.soti.sotistory.post.dto;

import com.soti.sotistory.member.entity.Member;
import com.soti.sotistory.post.constant.PostType;
import com.soti.sotistory.post.entity.Category;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter @Setter
public class PostDto {
    private Long authorId;

    @NotBlank(message = "제목은 필수 입력 사항입니다.")
    private String title;

    @NotEmpty(message = "내용을 입력해 주세요")
    private String content;

    @NotNull(message = "작성자 정보를 전달해 주세요")
    private String author;

    private String categoryName;

    @NotNull(message = "게시글 타입이 올바르지 않습니다. 일반, 비밀 게시물로만 설정 가능합니다.")
    private PostType postType;

    //Length 어노테이션은 null값을 테스트 하지 않기 때문에 무조건 필요한 것은 아니다.
    @Length(min = 4, max = 20, message = "비밀번호는 4글자 이상 20글자 이하로 설정해 주세요")
    private String postPassword;
}
