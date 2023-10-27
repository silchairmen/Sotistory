import React from "react";
import { Pagination } from 'antd';
import styled from "styled-components";
const PageStyle=styled(Pagination)`
  padding:15px;
`
function Paginate({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);  
  
  return (
    <>
      <PageStyle
        current={page}  //현재 페이지
        total={total} //전체 페이지 개수
        pageSize={limit}  //페이지 최대 개수
        onChange={setPage} //변경될 페이지 값
        showLessItems 
        showSizeChanger={false}
        disabled={numPages === 0} //페이지값이랑 같은 <, > 아이콘 비활성화
        prevIcon="&lt;"
        nextIcon="&gt;"
      />
    </>
  );
}

export default Paginate;
