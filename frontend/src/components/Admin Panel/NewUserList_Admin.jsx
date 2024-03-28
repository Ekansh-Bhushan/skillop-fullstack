import React, { useEffect, useState } from 'react';
import { getNewUserList } from '../../api/adminPanel';

const NewUserList_Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getNewUserList();
      setUserList(data.data.result);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[100%]">
      
      <p className="text-lg p-2">
        [New Users added since{' '}
        {new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()}]
      </p>
      <p className="text-lg p-2">{`Users added in last 24hrs : ${userList.length}`}</p>
      {userList.length && userList.map((item, idx) => {
        return (
          <div
            className="border-t border-black hover:bg-slate-100 hover:cursor-pointer"
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
                <div className='text-left'>
                  <b>
                    {item.firstname} {item.lastname}
                  </b>
                  <div>
                    <p className="text-gray-600">
                     Phone : {item.whatsappnumber?item.whatsappnumber:"N/A"}
                    </p>
                    <p className="text-gray-600">
                     Email : {item.email?item.email:'N/A'}
                    </p>
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

export default NewUserList_Admin;
