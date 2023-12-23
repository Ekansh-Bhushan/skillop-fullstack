import React, { useEffect, useState } from 'react';
import { getMentorList } from '../../api/adminPanel';

const MentorList = () => {
  const [Mentors, setMentors] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getMentorList();
      setMentors(data.data.result);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      <h2>Mentors of Skillop</h2>
      <p className="p-7">(Sorted by session fees)</p>
    {Mentors.sort((a, b) => b.fees - a.fees).map((item, idx) => {
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
                <div>
                  <b>
                    {item.firstname} {item.lastname}
                  </b>
                  <div>
                    <p className="text-gray-600">
                      Total meeting : {item.numberOfMeetings}
                    </p>
                    <p className="text-gray-600">
                      Accepted meetings : {item.numberOfMeetingsAccepted}
                    </p>
                    <p className="text-gray-600">
                      Session fees (1hr) : ₹{item.fees}
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

export default MentorList;
