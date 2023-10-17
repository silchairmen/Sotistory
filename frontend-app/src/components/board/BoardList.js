import { Link } from "react-router-dom";
import styled from "styled-components";

const Td=styled.td`
  border-bottom :1px solid #444444;
  color : black;
  text-align:left;
`
const FontColor=styled.p`
  color:black;
  font-weight:bold;
`
function BoardList({ author, postId, title }) {
  return (
      <tbody>
        <tr>
          <Td>No.{postId}</Td>  
          <Td>
            <Link to={`/FreeBoard/${postId}`}><FontColor>{title}</FontColor></Link>
          </Td>
          <td style={{textAlign:"center"}}>{author}</td>
        </tr>
      </tbody>
  );
}

export default BoardList;