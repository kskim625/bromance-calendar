import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';

const Main = ({ lightMode, date, matches }: pagesPropsType) => {
  const THIS_DATE = String(new Date().getMonth() + 1);
  const THIS_MATCHES = matches.filter((match) => {
    return match.month === THIS_DATE;
  });

  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} matches={THIS_MATCHES} monthInfo="current" />
    </div>
  );
};

export default Main;
