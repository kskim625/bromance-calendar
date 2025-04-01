import React, { useEffect, useState } from 'react';
import { dataType } from '../../App';
import styles from '../../styles/Calendar.module.css';
import CalendarModal from './CalendarModal';

interface calendarType {
  lightMode: boolean;
  date: Date;
  matches: dataType[];
  monthInfo: string;
}

const CalendarHeader = ({ monthInfo }: { monthInfo: string }) => {
  const MONTH_OFFSET: number = monthInfo === 'previous' ? 0 : monthInfo === 'current' ? 1 : 2;
  const MONTH: number = new Date().getMonth() + MONTH_OFFSET;

  return (
    <div className={styles.dayType}>
      <div className={styles.dayTypeTop}>{`${MONTH < 0 ? MONTH + 12 : MONTH > 12 ? MONTH - 12 : MONTH}월 매치 정보`}</div>
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
  const [thisDate, setThisDate] = useState<string | null>('');
  const [thisCalendar, setThisCalendar] = useState<JSX.Element>(<></>);
  const [thisMatches, setThisMatches] = useState<dataType[]>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<React.MouseEvent | null>(null);
  const DAYS_IN_A_WEEK: number = 7;

  const decideMatchDay = (calEl: string) => thisMatches.filter((match) => match.date === calEl).length > 0;

  const displayMatchDayModal = (e: React.MouseEvent) => {
    setSelectedEvent(e);
    setThisDate((e.target as HTMLDivElement).textContent);
    setDisplayModal(true);
  };

  const drawCalendarEl = (calEl: string, j: number) => {
    const monthOffset = monthInfo === 'previous' ? -1 : monthInfo === 'current' ? 0 : 1;
    const today: Date = new Date();
    const isToday: boolean =
      today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() + monthOffset && today.getDate() === Number(calEl);
    const isMatchDay: boolean = decideMatchDay(calEl);
    const contentStyle = lightMode ? styles.calendarContent : styles.darkCalendarContent;

    return isToday && isMatchDay ? (
      <div className={`${contentStyle} ${styles.calendarToday} ${styles.calendarMatchDay}`} onClick={displayMatchDayModal} key={`calendarEl-${j}`}>
        {calEl}
      </div>
    ) : isToday ? (
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
        {calendarRow.map((calEl, j) => drawCalendarEl(calEl, j))}
      </div>
    );
  };

  const drawCalendar = (calendarArray: string[][]) => {
    setThisCalendar(<>{calendarArray.map((calendarRow, i) => drawCalendarRow(calendarRow, i))}</>);
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
    let currentDate = DAYS_IN_A_WEEK - firstRow.filter((str) => str === '').length + 1;
    while (currentDate <= lastDate) {
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
    // INFO: 달력을 그릴 때는 올해 데이터만 고려합니다.
    setThisMatches(matches.filter(({ year }) => year === String(new Date().getFullYear())));
  }, [matches]);

  useEffect(() => {
    setCalendar();
    if (selectedEvent) {
      displayMatchDayModal(selectedEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisMatches, selectedEvent, lightMode]);

  return (
    <div className={styles.calendarWrapper}>
      <CalendarHeader monthInfo={monthInfo} />
      {thisCalendar}
      <CalendarModal
        lightMode={lightMode}
        matches={thisMatches}
        thisDate={thisDate}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};

export default Calendar;
