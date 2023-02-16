type TSpeedItem = { label: string; value: number };

export enum VideoClickEventType {
  'play/pause' = 'play/pause',
  'mute/unmute' = 'mute/unmute',
}

export type IVideoViewer = {
  videoSrc: string;
  className?: string;
  withProgress?: boolean;
  videoClassName?: string;
  onBlur?: (e: any) => void;
  speedList?: TSpeedItem[];
  withMuteButton?: boolean;
  onFocus?: (e: any) => void;
  controlClassName?: string;
  alwaysShowController?: boolean;
  onDoubleClick?: (e: any) => void;
  withPlayPauseInProgress?: boolean;
  onSlideToRight?: (
    e: any,
    togglePlay: (bool?: boolean) => void,
    toggleMute: (bool?: boolean) => void,
  ) => void;
  onSlideToLeft?: (
    e: any,
    togglePlay: (bool?: boolean) => void,
    toggleMute: (bool?: boolean) => void,
  ) => void;
  onSlide?: (
    e: any,
    togglePlay?: (bool?: boolean) => void,
    toggleMute?: (bool?: boolean) => void,
  ) => void;
  onVideoClickEventType?: VideoClickEventType;
};
