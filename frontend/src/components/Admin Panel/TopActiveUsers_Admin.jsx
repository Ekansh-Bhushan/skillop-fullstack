import React, { useEffect, useState } from 'react';
import { getMostActiveUsers } from '../../api/adminPanel';

const TopActiveUsers_Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMostActiveUsers(3);
      setUserList(data.data.result);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      
      {userList.map((item, idx) => {
        return (
          <div className="border-t border-black hover:bg-slate-100 hover:cursor-pointer" key={item._id}>
            <div>
              <div className="reviewers">
                <span className='w-8'>#{idx + 1}</span>
                <img
                  className="w-16 h-16 rounded-[100%] border border-black"
                  src={item.profilePicUrl ? item.profilePicUrl : '/user.png'}
                  alt="profile"
                />
                <div>
                  <b>{item.username}</b>
                  <div>
                    <span className="text-gray-600">
                      {item.__totalPosts} Posts
                    </span>
                    {" & "}
                    <span className="text-gray-600">
                      {item.__totalComments} Comments
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

export default TopActiveUsers_Admin;
