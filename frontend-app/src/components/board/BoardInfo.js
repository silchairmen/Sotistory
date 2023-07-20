import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const Board=styled.div`
  background-color:black;
  padding:15px;
`
const Header=styled.div`
  padding:15px;
  background-color:gray;
  align-items:center;
  background-position: center;
  height : 10vh;
  width : 100%;
  border-radius: 5px;
`
const Body=styled.div`
  padding:15px;
  background-color:white;
  align-items:center;
  background-position:center;
  border-radius: 5px;
`
const Footer=styled.div`
  padding:15px;
  background-color:white;
  align-items:center;
  background-position:center;
  height:10%;
  outline:auto;
  text-align:left;
`
const UserId=styled.div`
  align-items:center;
`
function Boardinfo() {
  const [boardInfo, setBoardInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await resp.json();
        setBoardInfo(data);
      } catch (error) {
        console.error("Error fetching board info:", error);
      }
    };

    getInfo();
  }, [id]);

  return (
    <Board>
    <Header>
      <h1>
        제목: {boardInfo.title}   작성자 : {id}
        </h1>
        <br />
      <hr />
      </Header>
      <Body>
      <h3>{boardInfo.body}</h3>
      </Body>
      <Footer>
        <UserId>
          <h3>유저 이름 </h3>
        </UserId>
        <h3>댓글 입력란</h3>
      </Footer>
      </Board>
  );
}

export default Boardinfo;
