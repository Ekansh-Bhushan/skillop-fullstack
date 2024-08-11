import React, { useEffect, useState } from 'react';
import {
  getHighestEarnerList,
  getNewUserList,
  getTopPosts,
} from '../../api/adminPanel';

const TopPosts = () => {
  const [pList, setPList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getTopPosts(10);
      setPList(data.data.result.topLikedPosts);
    };
    getData();
  }, []);

  return (
    <div className="border-[2px] border-black p-2 text-lg w-[40%]">
      <h2 className="p-7">Top Posts</h2>
      <p>[Ranked on the basis of Number of Likes]</p>
      {pList.length &&
        pList.map((item, idx) => {
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
                    src={item.authorPic ? item.authorPic : '/user.png'}
                    alt="profile"
                  />
                  <div className="text-left">
                    <b>{item.authorName}</b>
                    <div>
                      <p className="text-gray-600">Likes :{item.noOfLikes}</p>
                      <p className="text-gray-600">
                        Comments : {item.noOfComments}
                      </p>
                      <p className="text-gray-600">Post Text : {item.title}</p>
                      <p className="text-gray-600">
                        Post Media :{' '}
                        <img src={item.imageUrls[0]} alt="post img" />
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

export default TopPosts;
