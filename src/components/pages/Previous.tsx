import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';

const Previous = ({ lightMode, date }: pagesPropsType) => {
  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} holidays={[]} monthInfo="previous" />
    </div>
  );
};

export default Previous;
