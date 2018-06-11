import React from 'react'
import style from './Header.css';
import { Link } from 'react-router-dom';
import SideNav from './SideNav/SideNav';

import FontAwesome from 'react-fontawesome';

const Header = (props) => {
  const logo = () => {
    return (
      <Link to="/" className={style.logo}>
        <img alt="nba logo" src="/images/nba_logo.png" />
      </Link>
    );
  }

  const navBars = () => {
    return (
      <div className={style.bars}>
        <FontAwesome 
        onClick={props.onOpenNav}
        name="bars" 
        style={{
          color: '#dfdfdf',
          padding: '10px',
          cursor: 'pointer'
        }}
        /> 
      </div>
    );
  }

  return (
    <header className={style.header}>
      <SideNav
        {...props}
      />

      <div className={style.headerOpt}>
        {navBars()}
        {logo()}
      </div>
    </header>
  )
}

export default Header;
