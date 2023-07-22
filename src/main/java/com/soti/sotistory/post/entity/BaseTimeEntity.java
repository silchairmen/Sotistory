package com.soti.sotistory.post.entity;


import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

/**
 * 생성시각과 수정 시각을 기록하는 로직
 *
 * 생성 시각과 수정 시각이 필요한 클래스에서 사용하면 된다.
 * 사용하고자 하는 클래스에 확장하면 자동으로 DB에 컬럼이 생김
 * */

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass // 부모 클래스를 상속받는 자식 클래스에 매핑 정보만 저장함
public class BaseTimeEntity {

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regTime; //작성 시간

    @LastModifiedDate
    private LocalDateTime updateTime;
}
