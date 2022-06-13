import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { dataType } from '../../App';
import styles from '../../styles/CalendarModal.module.css';

interface modalProps {
  lightMode: boolean;
  matches: dataType[];
  thisDate: string | null;
  displayModal: boolean;
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  setSelectedEvent: Dispatch<SetStateAction<React.MouseEvent | null>>;
}

const CalendarModal = ({ lightMode, matches, thisDate, displayModal, setDisplayModal, setSelectedEvent }: modalProps) => {
  const [thisMatches, setThisMatches] = useState<dataType>({ ...matches[0] });
  const wrapperClass = lightMode ? styles.modalWrapper : styles.darkModalWrapper;
  const containerClass = lightMode ? styles.modalContainer : styles.darkModalContainer;
  const removeButtonClass = lightMode ? styles.removeModal : styles.darkRemoveModal;

  const removeModal = () => {
    setDisplayModal(false);
    setSelectedEvent(null);
  };

  const handleTouchModal = (e: React.MouseEvent) => {
    const styledClassname = (e.target as HTMLElement).className.split('_')[1];
    if (styledClassname === 'modalWrapper' || styledClassname === 'darkModalWrapper') {
      removeModal();
    }
  };

  useEffect(() => {
    const match: dataType = matches.filter((match) => {
      return match.date === thisDate;
    })[0];
    setThisMatches(match);
  }, [matches, thisDate]);

  return displayModal ? (
    <div className={wrapperClass} onClick={handleTouchModal}>
      <div className={containerClass}>
        <div className={styles.modalContent}>
          <div className={styles.matchHeader}>{`${thisMatches ? thisMatches.iso : ''} 일정`}</div>
          <div className={styles.matchDescription}>{`시간: ${thisMatches ? thisMatches.time : ''}`}</div>
          <div className={styles.matchDescription}>{`장소: ${thisMatches ? thisMatches.location : ''}`}</div>
          <div className={styles.matchDescription}>{`상태: ${thisMatches ? thisMatches.status : ''}`}</div>
        </div>
        <div className={removeButtonClass} onClick={removeModal}>
          닫기
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CalendarModal;
