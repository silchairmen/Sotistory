import { Fragment, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Input, Button } from "antd";

function Search() {
  const [search, setSearch] = useState("");
  const [findType, setFindType] = useState("title");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      console.log({ search });
    }
  };
  const onChangeType = (e) => {
    setFindType(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <SearchForm onSubmit={onSubmit}>
        <select value={findType} onChange={onChangeType}>
          <option value="title">제목</option>
          <option value="body">내용</option>
          <option value="userId">작성자</option>
        </select>
        <Input
          className="search"
          style={{ flex: 0.1 }}
          type="text"
          value={search}
          onChange={onChange}
          name="search"
        />
        <Button
          type="primary"
          onClick={() => {
            dispatch({ type: "SET_SERACH_KEYWORD", payload: search });
            dispatch({ type: "SEARCH_TYPE", payload: findType });
          }}
        >
          검색
        </Button>
      </SearchForm>
    </Fragment>
  );
}
const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default Search;