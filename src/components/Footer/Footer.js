import React from 'react';
import { Link } from 'react-router-dom';
import style from  './Footer.css';

import { CURRENT_YEAR } from '../../config';

const Footer = () => {
  return (
    <div className={style.footer}>
      <Link to="/" className={style.logo}>
        <img alt="nba logo" src="/images/nba_logo.png" />
      </Link>
      <div className={style.right}>
        @NBA {CURRENT_YEAR} All rights reserved.
      </div>
    </div>
  )
}

export default Footer;
