import VideoViewer from 'components/shared/VideoViewer';
import { VideoClickEventType } from 'components/shared/VideoViewer/types';
import ImageViewer from 'components/shared/ImageViewer';

import { ISlide } from '../types';
import styles from '../Slider.module.scss';

const SliderContent = ({ urls, title, format }: ISlide) => {
  return (
    <div className={styles.slider_item}>
      {format === 'image' ? (
        <ImageViewer urls={urls} alt={title} />
      ) : (
        <VideoViewer
          withMuteButton
          controlClassName={styles.slider_list__mute}
          onVideoClickEventType={VideoClickEventType['mute/unmute']}
          videoSrc={urls}
        />
      )}
    </div>
  );
};

export default SliderContent;
