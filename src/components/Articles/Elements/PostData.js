import React from 'react';
import style from '../Articles.css';
import moment from 'moment';

export default (props) => {
  const formatDate = (date) => {
    return moment(date).format(' MM-DD-YYYY');
  }

  return (
    <div className={style.articlePostData}>
        <div>
          Date:
          <span>{formatDate(props.date)}</span>
        </div>
        <div>
          Author:
          <span>{props.author}</span>
        </div>
    </div>
  )
}
