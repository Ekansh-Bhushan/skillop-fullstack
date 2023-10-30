import React from 'react';
import './follow.css';
import { useState } from 'react';
import { getFollowers } from '../../../api/userRequest';
import { useEffect } from 'react';
import spinner from '../../images/spinner.gif';
import { useNavigate } from 'react-router-dom';

const Followers = ({ userid, onClose }) => {

    const [followers, setFollowers] = useState([]);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();

    const fetchFollowers = async () => {
        try {
            setFetching(true);
            const res = await getFollowers(userid);
            setFollowers(res.data.result);
        }
        catch (err) {
            console.log("Unable to fetch followings", err);
        }
        setFetching(false);
    }

    useEffect(() => {
        fetchFollowers();
    }, [])

    return (
        <div className='bg-follow'>
            <div className="follow-container">
                <span style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: "3rem", margintop: "1rem" }}>
                    <h2>Followers ({followers.length})</h2>
                    <img id="close-follow" src="/close.png" onClick={onClose} height={27} width={27} alt="close" />
                </span>
                {fetching && <p style={{ textAlign: "center" }}><img src={spinner} width={70} alt='spinner' /></p>}
                {!fetching && (followers.length > 0 ? followers.map((item) => {
                    return <div onClick={() => navigate(`/public-profile/${item._id}`)} style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
                        <img height={35} width={35} src={item.profilePicUrl} alt="userpic" />
                        <span>{item.firstname} {item.lastname}</span>
                    </div>
                }): <h2>No Followers</h2>)}
            </div>
        </div>
    )
}

export default Followers;