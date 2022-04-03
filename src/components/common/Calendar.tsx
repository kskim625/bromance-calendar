import React, { useEffect, useState } from 'react';
import { dataType } from '../../App';
import styles from '../../styles/Calendar.module.css';

type monthInfoType = 'previous' | 'current' | 'next';

interface calendarType {
  lightMode: boolean;
  date: Date;
  matches: dataType[];
  monthInfo: monthInfoType;
}

const CalendarHeader = ({ monthInfo }: { monthInfo: monthInfoType }) => {
  const monthOffset: number = monthInfo === 'previous' ? 0 : monthInfo === 'current' ? 1 : 2;
  const month: number = new Date().getMonth() + monthOffset;

  return (
    <div className={styles.dayType}>
      <div className={styles.dayTypeTop}>{`${month}월 매치 정보`}</div>
      <div className={styles.dayTypeBottom}>
        <div className={styles.dayTypeToday}>31</div>
        {'오늘'}
        <div className={styles.dayTypeMatchday}></div>
        {'풋살/축구 일정'}
      </div>
    </div>
  );
};

const Calendar = ({ lightMode, date, matches, monthInfo }: calendarType) => {
  const [thisCalendar, setThisCalendar] = useState<JSX.Element>(<></>);
  const [thisMatches, setThisMatches] = useState<dataType[]>([]);
  const [thisMatchDayModal, setThisMatchDayModal] = useState<JSX.Element>(<></>);
  const [selectedEvent, setSelectedEvent] = useState<React.MouseEvent | null>(null);
  const DAYS_IN_A_WEEK: number = 7;

  const decideMatchDay = (calEl: string) => {
    return (
      thisMatches.filter((match) => {
        return match.date === calEl;
      }).length > 0
    );
  };

  const removeModal = () => {
    setThisMatchDayModal(<></>);
    setSelectedEvent(null);
  };

  const displayMatchDayModal = (e: React.MouseEvent) => {
    setSelectedEvent(e);
    const date = (e.target as HTMLDivElement).textContent;
    const matches: dataType = thisMatches.filter((match) => {
      return match.date === date;
    })[0];

    const containerClass = lightMode ? styles.modalContainer : styles.darkModalContainer;
    const removeButtonClass = lightMode ? styles.removeModal : styles.darkRemoveModal;

    setThisMatchDayModal(
      <div className={styles.modalWrapper}>
        <div className={containerClass}>
          <div className={styles.modalContent}>
            <div className={styles.matchHeader}>{`${matches.iso} 일정`}</div>
            <div className={styles.matchDescription}>{`시간: ${matches.time}`}</div>
            <div className={styles.matchDescription}>{`장소: ${matches.location}`}</div>
          </div>
          <div className={removeButtonClass} onClick={removeModal}>
            닫기
          </div>
        </div>
      </div>
    );
  };

  const drawCalendarEl = (calEl: string, j: number) => {
    const monthOffset = monthInfo === 'previous' ? -1 : monthInfo === 'current' ? 0 : 1;
    const today: Date = new Date();
    const isToday: boolean =
      today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() + monthOffset && today.getDate() === Number(calEl);
    const isMatchDay: boolean = decideMatchDay(calEl);
    const contentStyle = lightMode ? styles.calendarContent : styles.darkCalendarContent;

    return isToday ? (
      <div className={`${contentStyle} ${styles.calendarToday}`} key={`calendarEl-${j}`}>
        {calEl}
      </div>
    ) : isMatchDay ? (
      <div className={`${contentStyle} ${styles.calendarMatchDay}`} onClick={displayMatchDayModal} key={`calendarEl-${j}`}>
        {calEl}
      </div>
    ) : (
      <div className={contentStyle} key={`calendarEl-${j}`}>
        {calEl}
      </div>
    );
  };

  const drawCalendarRow = (calendarRow: string[], i: number) => {
    const rowStyle = lightMode ? styles.calendarRow : styles.darkCalendarRow;
    return (
      <div className={rowStyle} key={`calendar-${i}`}>
        {calendarRow.map((calEl, j) => {
          return drawCalendarEl(calEl, j);
        })}
      </div>
    );
  };

  const drawCalendar = (calendarArray: string[][]) => {
    setThisCalendar(
      <>
        {calendarArray.map((calendarRow, i) => {
          return drawCalendarRow(calendarRow, i);
        })}
      </>
    );
  };

  const setCalendarRow = (year: number, month: number, date: number, lastDate: number) => {
    const firstDay: number = new Date(year, month, 1).getDay();
    const thisRow: string[] = date === 1 ? new Array(firstDay).fill('') : [];
    while (thisRow.length < DAYS_IN_A_WEEK && date <= lastDate) {
      thisRow.push(String(date));
      date += 1;
    }
    while (thisRow.length < DAYS_IN_A_WEEK) {
      thisRow.push('');
    }
    return thisRow;
  };

  const makeCalendar = (year: number, month: number) => {
    const lastDate = new Date(year, month + 1, 0).getDate();
    const calendarRows = [['일', '월', '화', '수', '목', '금', '토']];
    const firstRow = setCalendarRow(year, month, 1, lastDate);
    calendarRows.push(firstRow);
    let currentDate =
      DAYS_IN_A_WEEK -
      firstRow.filter((str) => {
        return str === '';
      }).length +
      1;
    while (currentDate < lastDate) {
      calendarRows.push(setCalendarRow(year, month, currentDate, lastDate));
      currentDate += DAYS_IN_A_WEEK;
    }
    return calendarRows;
  };

  const setCalendar = () => {
    const year = date.getFullYear();
    const month = monthInfo === 'previous' ? date.getMonth() - 1 : monthInfo === 'current' ? date.getMonth() : date.getMonth() + 1;
    drawCalendar(makeCalendar(year, month));
  };

  useEffect(() => {
    setThisMatches(matches);
  }, [matches]);

  useEffect(() => {
    setCalendar();
    if (selectedEvent) {
      displayMatchDayModal(selectedEvent);
    }
  }, [thisMatches, lightMode, selectedEvent]);

  return (
    <div className={styles.calendarWrapper}>
      <CalendarHeader monthInfo={monthInfo} />
      {thisCalendar}
      {thisMatchDayModal}
    </div>
  );
};

export default Calendar;
