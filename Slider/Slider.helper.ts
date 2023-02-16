import React, { RefObject } from 'react';

export const getRefValue = <C>(ref: RefObject<C>) => {
  return ref.current as C;
};

export const getTouchEventData = (
  e: TouchEvent | MouseEvent | React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
) => {
  return 'changedTouches' in e ? e.changedTouches[0] : e;
};
