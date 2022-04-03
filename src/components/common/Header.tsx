import React, { SetStateAction } from 'react';
import styles from '../../styles/Header.module.css';

interface propType {
  lightMode: boolean;
  setLightMode: React.Dispatch<SetStateAction<boolean>>;
}

const Header = ({ lightMode, setLightMode }: propType) => {
  const changeLightMode = () => {
    setLightMode(!lightMode);
  };

  return lightMode ? (
    <header className={styles.header}>
      📅 Bromance Calendars
      <div className={styles.mode} onClick={changeLightMode}>
        🌞
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      📅 Bromance Calendars
      <div className={styles.mode} onClick={changeLightMode}>
        🌙
      </div>
    </header>
  );
};

export default Header;
