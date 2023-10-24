package com.soti.sotistory.post.question.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.soti.sotistory.post.cond.PostSearchCondition;
import com.soti.sotistory.post.question.entity.QuestionPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.soti.sotistory.member.entity.QMember.member;
import static com.soti.sotistory.post.question.entity.QQuestionPost.questionPost;


@Repository
public class QuestionPostRepositoryCustom {

    private final JPAQueryFactory query;

    public QuestionPostRepositoryCustom(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }


    public Page<QuestionPost> getPostList(Pageable pageable, PostSearchCondition condition) {
        if(condition.getKeyword()!=null){
            QueryResults<QuestionPost> results = query
                    .selectFrom(questionPost)
                    //content search에서 제외
                    .where(questionPost.title.contains(condition.getKeyword())
                            .or(questionPost.writer.nickname.contains(condition.getKeyword())))
                    .leftJoin(questionPost.writer, member).fetchJoin()
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(questionPost.createDate.desc())
                    .fetchResults();

            List<QuestionPost> content = results.getResults();
            Long total = results.getTotal();

            return new PageImpl<>(content, pageable, total);
        }
        else {
            QueryResults<QuestionPost> results = query
                    .selectFrom(questionPost)
                    .leftJoin(questionPost.writer, member).fetchJoin()
                    .offset(pageable.getOffset())
                    .limit(pageable.getPageSize())
                    .orderBy(questionPost.createDate.desc())
                    .fetchResults();

            List<QuestionPost> content = results.getResults();
            Long total = results.getTotal();

            return new PageImpl<>(content, pageable, total);
        }
    }
}
