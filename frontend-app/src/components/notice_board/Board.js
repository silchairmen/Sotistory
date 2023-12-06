import React, { useState, useEffect } from 'react';
import ProjectItem from './project-item';
import axios from 'axios';
import '../../css/index.css'
import LoadingView from '../LoadingView';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const SpecificPage = () => {
  const [promoData, setPromoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionValid, setSessionValid] = useState(false); // 세션 유효 여부 추가

  useEffect(() => {
    const loadTextData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get('/api/promotional/', { withCredentials: true });
        if (resp.status === 200) {
          setPromoData(resp.data.postInfoDtoList);
        } 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const verifySession = async () => { // 세션 검증을 위한 함수
      try {
        const sessionResp = await axios.get('/api/auth/validate', { withCredentials: true });
        if (sessionResp.data.status === 200) {
          setSessionValid(true); // 세션이 유효한 경우 상태 변경
        } else {
          setSessionValid(false); // 세션이 유효하지 않은 경우 상태 변경
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        setSessionValid(false); // 에러 발생 시 세션 유효하지 않은 것으로 처리
      }
    };

    loadTextData();
    verifySession(); // 페이지 로드 시 세션 검증 수행
  }, []);

  // 클릭 이벤트 핸들러: 세션이 유효한 경우에만 글 작성 페이지로 이동
  const handleWriteButtonClick = (event) => {
    event.preventDefault();

    if (sessionValid) {
      window.location.href = '/Post/edit/post'; // 세션이 유효한 경우 글 작성 페이지로 이동
    } else {
      toast.warn("로그인이 필요합니다!"); // 세션이 유효하지 않은 경우 알림
    }
  };

  console.log(promoData)

  return (
    <>
      {loading ? (
        <LoadingView/>
      ) : (
        <div className="flex min-h-screen flex-col items-center body-font bg-gradient-to-t from-gray-600 to-slate-900">
          <div className="p-8"></div>
          <div className="md:grid xl:grid-cols-7 md:grid-cols-3 sm:flex-col sm:flex">
            <h1 className="text-5xl md:text-6xl font-bold text-white xl:col-start-4 md:col-start-2 text-center">
              Posts
            </h1>
            <div className="col-start-7 items-center max-w-md mx-auto p-4 pt-6">
            <a
                onClick={handleWriteButtonClick}
                href="#"
                className="relative inline-flex items-center justify-center px-3 py-1 text-lg font-bold text-white transition-all duration-200 bg-gray-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                글 작성
              </a>
              <ToastContainer
                position="top-right"
                limit={4}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 py-10 m-6 gap-x-12 gap-y-16 border-t-2 border-gray-500">
            {promoData.map((boardDetail) => (
              <ProjectItem key={boardDetail.id} writer={boardDetail.writer} title={boardDetail.title} idx={boardDetail.postId}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpecificPage;
