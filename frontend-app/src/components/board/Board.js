import { useEffect, useState } from "react";
import axios from "axios";
import BoardList from "./BoardList";
import Paginate from "../Paginate";
import { useSelector} from "react-redux";
import Search from "../Search";
import Loading from "../../img/loading.gif"; // Import the Loading component
import styled from "styled-components";


const Table = styled.table`
  width: 70vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 50px ;
  background-color: whitesmoke;
  text-align: center;
  margin: 0 auto;
  border-radius: 10px;
  border : 1px solid #444444;
`;
const ContainerFragment = styled.div`
  background-color:whitesmoke;
`

const Board = () => {
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const loaddata=useSelector(state => state.search.keyword);
  const loadtype=useSelector(state => state.search.type);
  
  useEffect(() => {
    getBoard();
  }, []);

  const getBoard = async () => {
    try {
      const resp = await axios.get("https://jsonplaceholder.typicode.com/posts/");
      setBoardData(resp.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching board data:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };
  
  const offset = (page - 1) * limit;
  const paginatedData = boardData.slice(offset, offset + limit);

  return (
    <ContainerFragment>
      {loading ? ( // Display Loading component if loading is true
        <img src={Loading} alt="Loading"h/>
      ) : (
        <ContainerFragment>
          <select value={limit} onChange={handleLimitChange}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
          <div>
            <Table>
              <thead>
                <tr>
                  <th width="50">번호</th>
                  <th width="1700">제목</th>
                  <th width="100">ID</th>
                </tr>
              </thead>
              {paginatedData.map((boardDetail) => {
                if (loadtype === "" || (boardDetail[loadtype].includes(loaddata))) {
                  return (
                    <BoardList
                      key={boardDetail.id}
                      userId={boardDetail.userId}
                      id={boardDetail.id}
                      title={boardDetail.title}
                      body={boardDetail.body}
                    />
                  );
                }
              })}
            </Table>
          </div>
          <footer>
            <Paginate page={page} limit={limit} total={boardData.length} setPage={setPage} />
            <Search/>
          </footer>
        </ContainerFragment>
      )}
    </ContainerFragment>
  );
};

export default Board;