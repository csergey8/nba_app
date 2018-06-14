import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';
import PostData from '../../Elements/PostData';

const HeaderArticle = (props) => {
  const teamInfo = (team) => {
    
    return team ? (
      <TeamInfo team={team} />
    ) : null
  }

  const postData = (date, author) => {
    return <PostData date={date} author={author} />
  }

  return (
    <div>
      {teamInfo(props.teamData)}
      {postData(props.date, props.author)}
    </div>
  )
}

export default HeaderArticle;
