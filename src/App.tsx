import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import NavigationBar from './components/common/NavigationBar';
import Footer from './components/common/Footer';
import Main from './components/pages/Main';
import data from './data/data.js';
import './styles/index.css';

export interface pagesPropsType {
  lightMode: boolean;
  date: Date;
  matches: dataType[];
  monthInfo: string;
}

export interface dataType {
  year: string;
  month: string;
  date: string;
  iso: string;
  location: string;
  time: string;
  status: string;
}

const App = () => {
  const [monthInfo, setMonthInfo] = useState<string>('current');
  const [lightMode, setLightMode] = useState<boolean>(true);
  const [matches, setMatches] = useState<dataType[]>([]);
  const date = new Date();
  const DARK_MODE_CLASS_NAME = 'darkMode';

  const toggleDarkMode = () => {
    document.body.classList.toggle(DARK_MODE_CLASS_NAME);
  };

  const getMatchData = async () => {
    setMatches(data);
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
      <NavigationBar lightMode={lightMode} monthInfo={monthInfo} setMonthInfo={setMonthInfo} />
      <Routes>
        <Route path="/main" element={<Main lightMode={lightMode} date={date} matches={matches} monthInfo={monthInfo} />}></Route>
        <Route path="/" element={<Navigate to="/main?month=current" />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
