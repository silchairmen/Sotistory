import MenuExampleSizeLarge from './components/Menu'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
const Header= () => {
  const dispatch= useDispatch();
  useEffect(()=>{
    async function session(){
      try{
        const response = await axios.get('http://localhost:80/api/member/validate', {withCredentials: true});
        if(response.data.status === "200"){
          dispatch({type:"SESSION_TOKEN",session:false});
        }else{
          dispatch({type:"SESSION_TOKEN",session:true});
        }
      }catch(error){
        alert("오류");
      }
      
    }
    session();

  })
  return(
    <MenuExampleSizeLarge />
  )
}



export default Header;