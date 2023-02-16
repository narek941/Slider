import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import sidebarNavigation from 'constants/sidebar';

import Icon from '../Icon';
import { IconName } from '../Icon/types';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const burgerClasses = classNames(styles.wrapper__burger, {
    [styles.wrapper__burger_open]: open,
  });

  const wrapperClasses = classNames(styles.wrapper, { [styles.wrapper__active]: open });

  const listIconClasses = classNames(styles.list__icon, {
    [styles.list__icon__open]: open,
  });

  const listText = classNames(styles.list__text, {
    [styles.list__text__open]: open,
  });

  const renderList = sidebarNavigation.map(({ id, text, icon, linkTo }) => {
    return (
      <Link key={id} to={linkTo} className={styles.list}>
        <div
          className={classNames(styles.list__item, {
            [styles.list__open]: open,
            [styles.list__selected]: location.pathname === linkTo,
          })}
        >
          <div className={listIconClasses}>
            <Icon name={icon} />
          </div>
          <div className={listText}>{text}</div>
        </div>
      </Link>
    );
  });

  return (
    <div className={wrapperClasses}>
      <div className={burgerClasses}>
        <Icon name={IconName.logo} />
      </div>
      <div className={styles.list__wrapper}>{renderList}</div>
    </div>
  );
};
export default Sidebar;
