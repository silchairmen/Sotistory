import React, { useState, useEffect } from 'react';
import ProjectItem from './project-item';
import axios from 'axios';
import '../../css/index.css'
import LoadingView from '../LoadingView';
import styled from 'styled-components';

const div1 = styled.div`
display: flex; 
flex-direction: column; 
align-items: center; 
min-height: 100vh; 
background-image: linear-gradient(to top, gray,white); 
background-color: #6B7280; 
`
const SpecificPage = () => {
  const [promoData, setPromoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('bg-gogo');
    }
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
    };;

    loadTextData();
  }, []);


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
                href="post/edit/post/"
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-3 py-1 text-lg font-bold text-white transition-all duration-200 bg-gray-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                글 작성
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 py-10 m-6 gap-x-12 gap-y-16 border-t-2 border-gray-500">
            {promoData.map((boardDetail) => (
              <ProjectItem writer={boardDetail.writer} title={boardDetail.title} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpecificPage;
