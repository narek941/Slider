import { ReactNode } from 'react';

export interface ISlide {
  urls: string;
  title: string;
  description: string;
  id: number;
  format: 'video' | 'image';
}

export interface IDotsProps {
  activeIndex: number;
  onclick: (index: number) => void;
  data: ISlide[];
  dotsContent?: ReactNode | string;
}

export interface ISliderProps {
  data: ISlide[];
  dots: boolean;
  dotsContent?: ReactNode | string;
}
