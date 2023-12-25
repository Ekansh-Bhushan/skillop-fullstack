import React, { useEffect, useState } from 'react';
import { getNewUserList, getSiteMetrics } from '../../api/adminPanel';

const SiteMetrics = () => {
  const [siteData, setSiteData] = useState({});
  const [NewUsrList, setNewUsrList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getSiteMetrics();
      setSiteData(data.data.result);
      const newUsrs = await getNewUserList();
      setNewUsrList(newUsrs.data.result);
    };
    getData();
  }, []);

  return (
    <>
      <h1 className="text-center">Site Metrics</h1>
      <div className="flex justify-evenly mt-10 mb-10">
        <div className="border-none rounded-xl bg-orange-400 p-20 text-5xl text-center">
          {siteData.users}
          <p className="text-2xl">Users</p>
          <p className="flex text-lg gap-2"><img src="/increase.png" width={30} alt="" />+{NewUsrList.length}</p>
        </div>
        <div className="border-none rounded-xl bg-green-500 p-20 text-5xl text-center">
          {siteData.mentors}
          <p className="text-2xl">Mentors</p>
        </div>
        <div className="border-none rounded-xl bg-yellow-400 p-20 text-5xl text-center">
          {siteData.posts}
          <p className="text-2xl">Posts</p>
        </div>
        <div className="border-none rounded-xl bg-red-500 p-20 text-5xl text-center">
          {siteData.meets}
          <p className="text-2xl">Meets</p>
        </div>
      </div>
    </>
  );
};

export default SiteMetrics;
