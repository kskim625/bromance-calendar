import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/NavigationBar.module.css';

const NavigationBar = ({ lightMode }: { lightMode: boolean }) => {
  const navigate = useNavigate();
  const [today] = useState<Date>(new Date());

  const goToPrevious = () => {
    navigate('/previous');
  };

  const goToCurrent = () => {
    navigate('/');
  };

  const goToNext = () => {
    navigate('/next');
  };

  return (
    <div className={lightMode ? styles.navigationBar : styles.darkNavigationBar}>
      <button className={lightMode ? styles.button : styles.darkButton} onClick={goToPrevious}>
        {`${today.getMonth()}월`}
      </button>
      <button className={lightMode ? styles.button : styles.darkButton} onClick={goToCurrent}>
        {`${today.getMonth() + 1}월`}
      </button>
      <button className={lightMode ? styles.button : styles.darkButton} onClick={goToNext}>
        {`${today.getMonth() + 2}월`}
      </button>
    </div>
  );
};

export default NavigationBar;
