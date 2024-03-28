import React, { useEffect, useState } from 'react';
import { getMostFollowedUsers } from '../../api/adminPanel';
import './Admin_Users.css';
const MostFollowedUsers_Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMostFollowedUsers(10);
      setUserList(data.data.result);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      
      {userList.map((item, idx) => {
        return (
          <div
            className="border-t border-black  hover:bg-slate-100 hover:cursor-pointer"
            key={item._id}
          >
            <div>
              <div className="reviewers">
                <span className="w-8">#{idx + 1}</span>
                <img
                  className="w-16 h-16 rounded-[100%] border border-black"
                  src={item.profilePicUrl ? item.profilePicUrl : '/user.png'}
                  alt="profile"
                />
                <div>
                  <b>{item.firstname}{" "}{item.lastname}</b>
                  <div>
                    <span className="text-gray-600">
                      {item.followers.length} Followers
                    </span>
                    {' & '}
                    <span className="text-gray-600">
                      {item.followings.length} Followings
                    </span>
                    
                  </div>
                </div>
                <div>
                    <button className="View_profile">
                        View Profile
                    </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MostFollowedUsers_Admin;