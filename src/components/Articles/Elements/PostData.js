import React from 'react';
import style from '../Articles.css';

export default (props) => {
  return (
    <div className={style.articlePostData}>
        <div>
          Date:
          <span>{props.date}</span>
        </div>
        <div>
          Author:
          <span>{props.a}</span>
        </div>
    </div>
  )
}
