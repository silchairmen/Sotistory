import Home from '../Home/Home';
import { useState ,useEffect} from 'react';
import VideoPlayer from '../../components/viewvideos';

const Index = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  useEffect(() => {

    
    const erase = setTimeout(() => {
      hideLoader();
    }, 2000);
    const timer = setTimeout(() => {
      handleButtonClick();
    }, 2000);

    return () => (clearTimeout(timer) ,clearTimeout(erase));
  }, []);

  const handleButtonClick = () => {
    setIsIntroVisible(false);
  };

  const hideLoader = () => {
    let loaderTexts = document.getElementsByClassName('loader__text');
  
    for (let i = 0; i < loaderTexts.length; i++) {
      loaderTexts[i].textContent = '';
    }
  };
  

  return (
    <div>
      {isIntroVisible ? (
        <section id='loader' className="loader">
          <VideoPlayer />
        </section>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Index;