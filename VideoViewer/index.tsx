import { useRef, useState } from 'react';
import classNames from 'classnames';

import useVideoPlayer from 'hooks/useVideoPlayer';

import Icon from '../Icon';
import { IconName } from '../Icon/types';

import styles from './VideoViewer.module.scss';
import { IVideoViewer, VideoClickEventType } from './types';

const VideoViewer = ({
  onBlur,
  onSlide,
  onFocus,
  videoSrc,
  className,
  speedList,
  withProgress,
  onSlideToLeft,
  onDoubleClick,
  onSlideToRight,
  videoClassName,
  withMuteButton,
  controlClassName,
  alwaysShowController,
  withPlayPauseInProgress,
  onVideoClickEventType = VideoClickEventType['play/pause'],
}: IVideoViewer) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [touchPosition, setTouchPosition] = useState(null);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  } = useVideoPlayer(videoElement);

  const controlClass: string = classNames(styles.videoViewer__controls, {
    [styles.videoViewer__controls_alwaysOn]: alwaysShowController,
    [controlClassName as string]: !!controlClassName,
  });
  const videoClass: string = classNames(styles.videoViewer__video, videoClassName);
  const wrapperClass: string = classNames(styles.videoViewer, className);
  const playInnerClass: string = classNames({
    [styles.videoViewer__play_hide]: playerState?.isPlaying,
  });
  const handleVideoClick: () => void = () => {
    if (onVideoClickEventType === VideoClickEventType['play/pause']) {
      togglePlay();
    } else {
      toggleMute();
    }
  };

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      (e: any) => onSlideToLeft && onSlideToLeft(e, togglePlay, toggleMute);
      (e: any) => onSlide && onSlide(e, togglePlay, toggleMute);
    }

    if (diff < -5) {
      (e: any) => onSlideToRight && onSlideToRight(e, togglePlay, toggleMute);
      (e: any) => onSlide && onSlide(e, togglePlay, toggleMute);
    }

    setTouchPosition(null);
  };

  return (
    <div className={wrapperClass}>
      <video
        className={videoClass}
        src={videoSrc}
        ref={videoElement}
        onClick={handleVideoClick}
        onTimeUpdate={handleOnTimeUpdate}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      />
      <div className={controlClass}>
        {withPlayPauseInProgress && (
          <div className={styles.videoViewer__controls__actions}>
            <button onClick={() => togglePlay}>
              {!playerState.isPlaying ? (
                <Icon name={IconName.save} />
              ) : (
                <Icon name={IconName.like} />
              )}
            </button>
          </div>
        )}
        {withProgress && (
          <input
            className={styles.videoViewer__controls__progress}
            type='range'
            min='0'
            max='100'
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
        )}
        {speedList && (
          <select
            className={styles.videoViewer__controls__velocity}
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            {speedList.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
        {withMuteButton && (
          <button className={styles.videoViewer__controls__mute} onClick={() => toggleMute}>
            {!playerState.isMuted ? (
              <Icon name={IconName.eyeHideIcon} />
            ) : (
              <Icon name={IconName.eyeShowIcon} />
            )}
          </button>
        )}
      </div>
      <div onClick={() => togglePlay} className={styles.videoViewer__play}>
        <div className={playInnerClass}>
          {!playerState.isPlaying ? <Icon name={IconName.save} /> : <Icon name={IconName.like} />}
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
