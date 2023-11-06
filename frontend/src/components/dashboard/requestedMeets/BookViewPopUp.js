import React, { useState } from 'react';
import './BookViewPopUp.css';
import toast from 'react-hot-toast';
import { acceptMeet } from '../../../api/mentorRequest';
import convertToNormalTime from '../../../utils/timeConversion';
import { useNavigate } from 'react-router-dom';

const BookViewPopUp = ({ bookingData, onClose, type }) => {

    const navigate = useNavigate();

    //   const acceptBookings = async (meetId) => {

    //     try {
    //       const { data } = await acceptMeet(meetId);
    //       if (!data.result) toast.error(data.message);
    //       toast.success(data.message);
    //       // console.log(data);
    //     } catch (error) {
    //       if (error.response)
    //         toast.error(error.response.data.message)
    //       console.log(error)
    //     }
    //   };

    return (
        <div className="book-view-bg">
            <div className="book-view-container">
                <div className="book-view-header">
                    <h2>Meeting Info</h2>
                    <img
                        onClick={onClose}
                        src="/close.png"
                        height={20}
                        width={20}
                        alt="close"
                    />
                </div>
                <div>
                    <span>{type} Name : </span>
                    <span>
                        {bookingData[1].mentor.firstname}{" "}
                        {bookingData[1].mentor.lastname}
                    </span>
                </div>
                <div>
                    <span>Session Date : </span>
                    {bookingData && (
                        <span>
                            {new Date(bookingData[1].date)
                                .toString()
                                .slice(0, 15)}
                        </span>
                    )}
                </div>
                <div>
                    <span>Time slot : </span>
                    {bookingData && (
                        <span>
                            {convertToNormalTime(bookingData[1].s)} - {convertToNormalTime(bookingData[1].e)}
                        </span>
                    )}
                </div>
                <div>
                    <span>Status : </span>
                    {bookingData && <span>{bookingData[1].status}</span>}
                </div>
                <div>
                    <span>Meet link : </span>
                    {bookingData && bookingData[1].meetLink && <a href={bookingData[1].meetLink}>{bookingData[1].meetLink}</a>}
                </div>
                <div>
                    <span>Payment proof : </span>
                    {bookingData && (
                        <a
                            id="proof-link"
                            target="_blank"
                            rel="noreferrer"
                            href={bookingData[1].paymentPic}
                        >
                            View payment proof
                        </a>
                    )}
                </div>
                {bookingData && (
                    <img
                        style={{ borderRadius: "14px", display: "block" }}
                        src={bookingData[1].paymentPic}
                        height={170}
                        width={170}
                        alt="pay-proof"
                    />
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button id="book-view-prof" onClick={() => navigate(`/public-profile/${bookingData[1].mentor._id}`)}>View profile</button>
                </div>
            </div>
        </div>
    );
}

export default BookViewPopUp;