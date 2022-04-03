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
  matches: dataType[];
}

export interface dataType {
  year: string;
  month: string;
  date: string;
  iso: string;
  location: string;
  time: string;
}

const App = () => {
  const [date] = useState<Date>(new Date());
  const [lightMode, setLightMode] = useState<boolean>(true);
  const [matches, setMatches] = useState<dataType[]>([]);
  const DARK_MODE_CLASS_NAME = 'darkMode';

  const toggleDarkMode = () => {
    document.body.classList.toggle(DARK_MODE_CLASS_NAME);
  };

  const getMatchData = async () => {
    const response = await fetch('data/matches');
    setMatches(await response.json());
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
        <Route path="/" element={<Main lightMode={lightMode} date={date} matches={matches} />}></Route>
        <Route path="/previous" element={<Previous lightMode={lightMode} date={date} matches={matches} />}></Route>
        <Route path="/next" element={<Next lightMode={lightMode} date={date} matches={matches} />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
