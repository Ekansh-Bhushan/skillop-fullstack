import React, { useEffect, useState } from 'react';
import { getHighestEarnerList, getNewUserList } from '../../api/adminPanel';

const HighestEarnerList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getHighestEarnerList();
      setUserList(data.data.result);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      <h2 className="p-7">Top Earners (Mentors)</h2>
      {userList.length &&
        userList.slice(0,10).map((item, idx) => {
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
                        Earned Amount : ₹
                        {item.fees * item.numberOfMeetingsAccepted}
                      </p>
                      <p className="text-gray-600">
                        Accepted Meeting : {item.numberOfMeetingsAccepted}
                      </p>
                      <p className="text-gray-600">
                        Total Meetings : {item.numberOfMeetings}
                      </p>
                      <p className="text-gray-600">
                        Total Slots : {item.numberOfSlots}
                      </p>
                      <p className="text-gray-600">
                        Session Fees (1 hr) : ₹{item.fees}
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

export default HighestEarnerList;
