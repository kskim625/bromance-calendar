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
  const lastMonth = today.getMonth();
  const nextMonth = today.getMonth() + 2;

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
        {`${lastMonth < 1 ? lastMonth + 12 : lastMonth}월`}
      </button>
      <button className={lightMode ? styles.button : styles.darkButton} onClick={goToCurrent}>
        {`${today.getMonth() + 1}월`}
      </button>
      <button className={lightMode ? styles.button : styles.darkButton} onClick={goToNext}>
        {`${nextMonth > 12 ? nextMonth - 12 : nextMonth}월`}
      </button>
    </div>
  );
};

export default NavigationBar;
