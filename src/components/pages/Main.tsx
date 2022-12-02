import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';
import { dataType } from '../../App';

const Main = ({ lightMode, date, matches, monthInfo }: pagesPropsType) => {
  const MONTH_OFFSET: number = monthInfo === 'previous' ? 0 : monthInfo === 'current' ? 1 : 2;
  const THIS_DATE: number = new Date().getMonth() + MONTH_OFFSET;
  const COMP_DATE: string = String(THIS_DATE > 12 ? THIS_DATE - 12 : THIS_DATE < 1 ? THIS_DATE + 12 : THIS_DATE);
  const THIS_MATCHES: dataType[] = matches.filter((match) => {
    return match.month === COMP_DATE;
  });

  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} matches={THIS_MATCHES} monthInfo={monthInfo} />
    </div>
  );
};

export default Main;
