import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';

const Previous = ({ lightMode, date, matches }: pagesPropsType) => {
  const THIS_DATE = String(new Date().getMonth());
  const THIS_MATCHES = matches.filter((match) => {
    return match.month === THIS_DATE;
  });

  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} matches={THIS_MATCHES} monthInfo="previous" />
    </div>
  );
};

export default Previous;
