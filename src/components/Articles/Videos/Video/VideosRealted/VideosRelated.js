import React from 'react';
import style from '../../../../widgets/VideosList/VideosList.css';
import VideosTemplate from '../../../../widgets/VideosList/VideosTemplate';

const VideosRelated = (props) => {
  return (
    <div className={style.related_wrapper}>
      <VideosTemplate
      data={props.data}
      teams={props.teams}
       />
    </div>
  )
}
export default VideosRelated;
