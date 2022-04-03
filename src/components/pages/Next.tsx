import Calendar from '../common/Calendar';
import { pagesPropsType } from '../../App';

const Next = ({ lightMode, date }: pagesPropsType) => {
  return (
    <div id="main">
      <Calendar lightMode={lightMode} date={date} holidays={[]} monthInfo="next" />
    </div>
  );
};

export default Next;
