import classNames from 'classnames';

import { IDotsProps } from '../types';
import styles from '../Slider.module.scss';

const Dots = ({ activeIndex, onclick, data }: IDotsProps): JSX.Element => {
  return (
    <div className={styles.slider_indicator}>
      {data.map((_item, idx) => (
        <div
          key={idx}
          className={classNames(styles.slider_indicator_item, {
            [styles.slider_indicator_item__active]: activeIndex === idx,
          })}
          onClick={() => onclick(idx)}
        >
          &#x2022;
        </div>
      ))}
    </div>
  );
};

export default Dots;
