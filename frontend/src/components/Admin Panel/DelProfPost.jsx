import { useState } from 'react';
import toast from 'react-hot-toast';
import { getUserFromUsername } from '../../api/userRequest';
import { delPostByPostId, delUserByUserId, fetchUserByUsername } from '../../api/adminPanel';

const DelProfPost = () => {
  const [username, setUsername] = useState('');
  const [postlink, setPostlink] = useState('');
  const delProfile = async () => {
    try {
      const data = await fetchUserByUsername(username);
      const reqUsr = data.data.result.filter(
        (item) => item.username === username
      );
      console.log('req usr', reqUsr);
      await delUserByUserId(reqUsr[0]._id);
      toast.success('Profile deleted!');
      setUsername('');
    } catch (err) {
      console.log('Unable to del profile', err);
      toast.error(err.response.data.message);
    }
  };
  const delPost = async () => {
    console.log("postid",postlink.split('/')[4]);
    try {
      await delPostByPostId(postlink.split('/')[4]);
      toast.success('Post deleted!');
      setPostlink('');
    } catch (err) {
      console.log('Unable to del post', err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="border p-6">
      <div className='my-3'>
        <h2>Delete Profile/Post</h2>
        <input
          className="p-1 border text-lg mr-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button
          onClick={delProfile}
          className="bg-red-600 hover:bg-red-500 text-white rounded-lg p-2 border-none"
        >
          Delete
        </button>
      </div>
      <div>
        <input
          className="p-1 border text-lg mr-2"
          type="text"
          value={postlink}
          onChange={(e) => setPostlink(e.target.value)}
          placeholder="Enter post link"
        />
        <button
          onClick={delPost}
          className="bg-red-600 hover:bg-red-500 text-white rounded-lg p-2 border-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DelProfPost;
