package com.soti.sotistory.post.promotional.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.promotional.entity.PromotionalPost;
import com.soti.sotistory.post.promotional.entity.QPromotionalPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.soti.sotistory.member.entity.QMember.member;
import static com.soti.sotistory.post.promotional.entity.QPromotionalPost.promotionalPost;


@Repository
public class PromotionalPostRepositoryCustom {

    private final JPAQueryFactory query;

    public PromotionalPostRepositoryCustom(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }


    public Page<PromotionalPost> getPostList(Pageable pageable, PostSearchCondition condition) {
        if(condition.getKeyword()!=null){
            QueryResults<PromotionalPost> results = query
                    .selectFrom(promotionalPost)
                    .where(promotionalPost.content.contains(condition.getKeyword())
                            .or(promotionalPost.title.contains(condition.getKeyword()))
                            .or(promotionalPost.writer.nickname.contains(condition.getKeyword())))
                    .leftJoin(promotionalPost.writer, member).fetchJoin()
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(promotionalPost.createDate.desc())
                    .fetchResults();

            List<PromotionalPost> content = results.getResults();
            Long total = results.getTotal();

            return new PageImpl<>(content, pageable, total);
        }
        else {
            QueryResults<PromotionalPost> results = query
                    .selectFrom(promotionalPost)
                    .leftJoin(promotionalPost.writer, member).fetchJoin()
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(promotionalPost.createDate.desc())
                    .fetchResults();

            List<PromotionalPost> content = results.getResults();
            Long total = results.getTotal();

            return new PageImpl<>(content, pageable, total);
        }
    }
}
