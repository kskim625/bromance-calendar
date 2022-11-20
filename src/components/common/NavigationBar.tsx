import { useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/NavigationBar.module.css';

interface NavigationBarProps {
  lightMode: boolean;
  monthInfo: string;
  setMonthInfo: Dispatch<SetStateAction<string>>;
}

const NavigationBar = ({ lightMode, monthInfo, setMonthInfo }: NavigationBarProps) => {
  const navigate = useNavigate();
  const today = new Date();

  const goToPrevious = () => {
    setMonthInfo('previous');
  };

  const goToCurrent = () => {
    setMonthInfo('current');
  };

  const goToNext = () => {
    setMonthInfo('next');
  };

  useEffect(() => {
    navigate(`main?month=${monthInfo}`);
  }, [monthInfo, navigate]);

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
