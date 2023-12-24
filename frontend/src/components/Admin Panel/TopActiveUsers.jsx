import React, { useEffect, useState } from 'react';
import { getMostActiveUsers } from '../../api/adminPanel';

const TopActiveUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log('use eff - most active');
      const data = await getMostActiveUsers();
      setUserList(data.data.result);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      <h2 className='p-7'>Most Active Users</h2>
      {userList.map((item, idx) => {
        return (
          <div className="border-t border-black p-4 hover:bg-slate-100 hover:cursor-pointer" key={item._id}>
            <div>
              <div className="flex items-center gap-5">
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopActiveUsers;
