import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';

const Main = ({ lightMode, date }: pagesPropsType) => {
  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} holidays={[]} monthInfo="current" />
    </div>
  );
};

export default Main;
