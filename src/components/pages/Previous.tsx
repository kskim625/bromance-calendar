import { useState, useEffect } from 'react';
import Header from '../common/Header';
import NavigationBar from '../common/NavigationBar';
import Calendar from '../common/Calendar';
import Footer from '../common/Footer';

const Main = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [lightMode, setLightMode] = useState<boolean>(true);
  const DARK_MODE_CLASS_NAME = 'darkMode';

  const toggleDarkMode = () => {
    document.body.classList.toggle(DARK_MODE_CLASS_NAME);
  };

  useEffect(() => {
    toggleDarkMode();
  }, []);

  useEffect(() => {
    toggleDarkMode();
  }, [lightMode]);

  return (
    <div id="main">
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <NavigationBar lightMode={lightMode} />
      <Calendar lightMode={lightMode} date={date} holidays={[]} monthInfo="previous" />
      <Footer />
    </div>
  );
};

export default Main;
