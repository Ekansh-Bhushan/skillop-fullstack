import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaderBoard.css';
import first from './img/kingforml.jpeg';
import line from './img/line.png';

const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const LeaderBoard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://skillop.in/api/mlevent/leaderboard');
        setTeams(response.data.teams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const winningTeams = teams.slice(0, 3);

  return (
    <div className='leader-board'>
      <div className='cryptic-heading'>
        Cryptic Hunt on ML Leaderboard
      </div>
      <div className='top-teams'>
        Top Teams
      </div>

      <div className='winners'>
  {winningTeams.map((team, index) => (
    <div className="container" key={team.teamLeaderEmail}>
      <div className="position-image-container">
        <img src={first} className='position-image' alt="Position" />
      </div>
      
      <div className="team-info">
        <div className="team-leader-name">{team.teamName}</div>
        <div className="team-result">
          <div className="team-pts-heading">Team pts. </div>
          <div className="team-pts-num">{team.teamPoints}</div>
        </div>
      </div>
    </div>
  ))}
</div>


      <div className='line-image-container'>
        <img src={line} className='line-image' alt="Line" />
      </div>

      <div className='complete-leader-board'>
        <div className='complete-leader-board-heading'>
          <div className='rank'>Rank</div>
          <div className='team-name'>Team Name</div>
          <div className='points'>Points</div>
          {/* <div className='finish-time'>Finish Time</div> */}
        </div>
        {teams.map((team, index) => (
          <div className='complete-leader-board-elements' key={team.teamLeaderEmail}>
            <div className='rank-element'>{index + 1}</div>
            <div className='team-element'>
              {/* <div className='team-image-element'>
                <img src="/skillop-logo.png" className='user-2' alt="User" />
              </div> */}
              <div className='team-name-element'>{team.teamName}</div>
            </div>
            <div className='points-element'>{team.teamPoints}</div>
            {/* <div className='finish-time-element'>{formatTime(team.teamFinishTime)}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
