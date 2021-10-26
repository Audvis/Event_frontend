import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../actions/actions';

function FollowButton() {
    const [followStatus, setFollowStatus] = useState(false);
    const [buttonStatus, setButtonStatus] = useState('Seguir');
    const promoterUser = useSelector(state => state.promoterUser);
    const userInfo = useSelector(state => state.userState);
    const followJSON = {
        id_promoter: promoterUser.eventPromotor.id,
        id_user: userInfo.id
    };
    // console.log('IDS (followJSON): ', followJSON);

    useEffect(() => {
        const follow = async () => {
            if (followStatus) {
                try {
                await axios.put(`${API}follow`, followJSON);
            } catch(error) {
                console.log('FOLLOW ERROR: ', error);
            }
        } else {
                try {
                const getFollowInfo = await axios.get(`${API}user/${userInfo.id}`);
                if (getFollowInfo?.following?.includes(promoterUser.eventPromotor.id)) {
                    await axios.delete(`${API}follow`, promoterUser.eventPromotor.id);
                    console.log('Unfollow successful.');
                } else return;
            } catch(error) {
                console.log('UNFOLLOW ERROR: ', error);
            }
        }
    };
    follow();
}, [followStatus]);

const handleFollow = (e) => {
    e.preventDefault();
    followStatus ? setButtonStatus('Seguir') : setButtonStatus('Dejar de seguir');
    setFollowStatus(!followStatus);
};


    return (
        <button className="regularBtn" onClick={handleFollow} value={buttonStatus}>{buttonStatus}</button>
    )
}

export default FollowButton;
