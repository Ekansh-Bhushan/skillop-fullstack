import React, { useEffect, useState } from 'react';
import { getDeadUserList, getNewUserList } from '../../api/adminPanel';

const DeadUserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDeadUserList();
      setUserList(data.data.result);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      <h2 className="p-7">Dead Users</h2>
      <p className="text-lg">No login in past 30+ days</p>
      <p>{`Total dead users : ${userList.length}`}</p>
      {userList.length &&
        userList.map((item, idx) => {
          return (
            <div
              className="border-t border-black p-4 hover:bg-slate-100 hover:cursor-pointer"
              key={item._id}
            >
              <div>
                <div className="flex items-center gap-5">
                  <span className="w-8">#{idx + 1}</span>
                  <img
                    className="w-16 h-16 rounded-[100%] border border-black"
                    src={item.profilePicUrl ? item.profilePicUrl : '/user.png'}
                    alt="profile"
                  />
                  <div className="text-left">
                    <b>
                      {item.firstname} {item.lastname}
                    </b>
                    <div>
                      <p className="text-gray-600">
                        Phone :{' '}
                        {item.whatsappnumber ? item.whatsappnumber : 'N/A'}
                      </p>
                      <p className="text-gray-600">
                        Email : {item.email ? item.email : 'N/A'}
                      </p>
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

export default DeadUserList;
