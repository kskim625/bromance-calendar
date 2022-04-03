import React, { useEffect, useState } from 'react';
import styles from '../../styles/Calendar.module.css';

interface datetimeType {
  year: number;
  month: number;
  day: number;
}

interface holidayType {
  country: { id: string; name: string };
  date: { datetime: datetimeType; iso: string };
  description: string;
  locations: string;
  name: string;
  states: string;
  type: string[];
}

type monthInfoType = 'previous' | 'current' | 'next';

interface calendarType {
  lightMode: boolean;
  date: Date;
  holidays: holidayType[] | [];
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
        {'매치 예정일'}
      </div>
    </div>
  );
};

const Calendar = ({ lightMode, date, holidays, monthInfo }: calendarType) => {
  const [thisCalendar, setThisCalendar] = useState<JSX.Element>(<></>);
  const [thisHolidays, setThisHolidays] = useState<holidayType[]>([]);
  const [thisHolidayModal, setThisHolidayModal] = useState<JSX.Element>(<></>);
  const [selectedEvent, setSelectedEvent] = useState<React.MouseEvent | null>(null);
  const DAYS_IN_A_WEEK: number = 7;

  const decideHoliday = (calEl: string) => {
    return (
      thisHolidays.filter((holiday) => {
        return holiday.date.datetime.day === Number(calEl);
      }).length > 0
    );
  };

  const removeModal = () => {
    setThisHolidayModal(<></>);
    setSelectedEvent(null);
  };

  const displayHolidayModal = (e: React.MouseEvent) => {
    setSelectedEvent(e);
    const date = Number((e.target as HTMLDivElement).textContent);
    const holidays: (holidayType | undefined)[] = thisHolidays.filter((thisHoliday) => {
      return thisHoliday.date.datetime.day === date;
    });

    const containerClass = lightMode ? styles.modalContainer : styles.darkModalContainer;
    const removeButtonClass = lightMode ? styles.removeModal : styles.darkRemoveModal;

    setThisHolidayModal(
      <div className={styles.modalWrapper}>
        <div className={containerClass}>
          {holidays.map((thisHoliday, idx) => {
            if (thisHoliday)
              return (
                <>
                  <div className={styles.holidayDescription}>{`holiday #${idx + 1}`}</div>
                  <div className={styles.holidayDescription}>{`Country: ${thisHoliday.country.name}`}</div>
                  <div className={styles.holidayDescription}>{`Date: ${thisHoliday.date.iso}`}</div>
                  <div className={styles.holidayDescription}>{`Holiday name: ${thisHoliday.name}`}</div>
                  <div className={styles.holidayDescription}>{`Holiday type: ${thisHoliday.type[0]}`}</div>
                  <div className={styles.holidayDescription}>{`description: ${thisHoliday.description}`}</div>
                  <br></br>
                </>
              );
          })}
          <div className={removeButtonClass} onClick={removeModal}>
            Remove Explanation
          </div>
        </div>
      </div>
    );
  };

  const drawCalendarEl = (calEl: string, j: number) => {
    const today: Date = new Date();
    const isToday: boolean = today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === Number(calEl);
    const isHoliday: boolean = decideHoliday(calEl);
    const contentStyle = lightMode ? styles.calendarContent : styles.darkCalendarContent;

    return isToday ? (
      <div className={`${contentStyle} ${styles.calendarToday}`} key={`calendarEl-${j}`}>
        {calEl}
      </div>
    ) : isHoliday ? (
      <div className={`${contentStyle} ${styles.calendarHoliday}`} onClick={displayHolidayModal} key={`calendarEl-${j}`}>
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
    const month = date.getMonth();
    drawCalendar(makeCalendar(year, month));
  };

  useEffect(() => {
    setThisHolidays(
      holidays.filter((holiday) => {
        return holiday.date.datetime.month === date.getMonth() + 1;
      })
    );
  }, []);

  useEffect(() => {
    setCalendar();
    if (selectedEvent) {
      displayHolidayModal(selectedEvent);
    }
  }, [thisHolidays, lightMode]);

  return (
    <div className={styles.calendarWrapper}>
      {holidays[0] ? `${date.getFullYear()}. ${date.getMonth() + 1}. ${holidays[0].country.name} holidays` : ''}
      <CalendarHeader monthInfo={monthInfo} />
      {thisCalendar}
      {thisHolidayModal}
    </div>
  );
};

export default Calendar;
