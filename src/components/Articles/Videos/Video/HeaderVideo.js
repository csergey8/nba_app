import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';

const HeaderVideo = (props) => {
  console.log(props);
  const teamInfo = (team) => {
    return team ? (
      <TeamInfo team={team} />
    ) : null;
  }

  return (
    <div>
      {teamInfo(props.teamData)}
    </div>
  )
}

export default HeaderVideo;
