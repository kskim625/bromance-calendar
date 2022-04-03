import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import NavigationBar from './components/common/NavigationBar';
import Footer from './components/common/Footer';
import Main from './components/pages/Main';
import Previous from './components/pages/Previous';
import Next from './components/pages/Next';
import './styles/index.css';

export interface pagesPropsType {
  lightMode: boolean;
  date: Date;
}

const App = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [lightMode, setLightMode] = useState<boolean>(true);
  const [matches, setMathces] = useState();
  const DARK_MODE_CLASS_NAME = 'darkMode';

  const toggleDarkMode = () => {
    document.body.classList.toggle(DARK_MODE_CLASS_NAME);
  };

  const getMatchData = async () => {
    const data = await fetch('data/matches');
    console.log(await data.json());
  };

  useEffect(() => {
    toggleDarkMode();
    getMatchData();
  }, []);

  useEffect(() => {
    toggleDarkMode();
  }, [lightMode]);

  return (
    <BrowserRouter>
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <NavigationBar lightMode={lightMode} />
      <Routes>
        <Route path="/" element={<Main lightMode={lightMode} date={date} />}></Route>
        <Route path="/previous" element={<Previous lightMode={lightMode} date={date} />}></Route>
        <Route path="/next" element={<Next lightMode={lightMode} date={date} />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
