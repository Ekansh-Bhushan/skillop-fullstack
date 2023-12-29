import React, { useEffect, useState } from "react";
import index from "./index.css";
import Profileandevents from "../Landing/Profileandevents";
import { getActualAvail, postSlot } from "../../api/slotsRequest";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { getMentorAvaibility, getMentorData } from "../../api/mentorRequest";
import axios, { all } from "axios";
import { bookslot } from "../../api/slotsRequest";
import Mobilecommonhead from "../Mobilecommonhead";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import convertToNormalTime from "../../utils/timeConversion";

function Bookslot({ userData, setProgress, Mentor, isFetched, notifyList }) {
  const navigate = useNavigate();
  const mentorId = window.location.pathname.split("/")[2];

  // function that yield next date start from today
  const [slots, setSlots] = useState({});
  const [mentorData, setMentorData] = useState({});
  useEffect(() => {
    const getMentorDataa = async () => {
      try {
        const response = await getMentorData(mentorId);
        console.log(response.data.result, "Hello");
        setMentorData(response.data.result);
      } catch (error) {
        console.log(error, "Went wrong");
        toast("Something went wrong");
      }
    };
    getMentorDataa();
  }, []);

  const getNextDate = (date) => {
    const today = new Date(date);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const onClickingBook = (day, mentorid, s, e, userid, charge) => {
    navigate(
      "/confirm-booking" +
        "/" +
        mentorid +
        "?day=" +
        day +
        "&s=" +
        s +
        "&e=" +
        e +
        "&userid=" +
        userid +
        "&charge=" +
        charge
    );
  };

  // use effect to load the slots on site loads
  useEffect(() => {
    const getSlot = async () => {
      console.log("mentorId: ", mentorId);
      let ct = 0;
      let day = getNextDate(new Date()).toISOString().split("T")[0];
      while (ct < 7) {
        try {
          setProgress((ct / 7) * 100);
          const response = await getMentorAvaibility({ date: day }, mentorId);
          console.log(response.data.result, day, ct);
          if (response.data.result && response.data.result.length) {
            // console.log(response.data.result);
            // console.log(day);

            // console.log({ ...slots, [day]: response.data.result });
            const x = slots;
            x[day] = response.data.result;
            setSlots(x);
            // console.log("slots: ", slots);
            ct += response.data.result.length;
          } else if (!response.data.result) {
            toast(response.data.message);
            break;
          }
        } catch (error) {
          toast("Something went wrong");
          break;
        }
        // console.log(slots);
        day = getNextDate(day).toISOString().split("T")[0];
      }
      setProgress(100);
      console.log(slots);
    };
    getSlot();
  }, [mentorId, slots, setProgress]);

  return (
    <>
      {/* <SideNav
        setProgress={setProgress}
        Mentor={Mentor}
        isFetched={isFetched}
        notifyList={notifyList}
      /> */}
      {/* <Searchbar/> */}
      <Mobilecommonhead />
      {/* <Common setProgress={setProgress} /> */}

      <div className="flex items-center justify-center h-full w-[80%] ml-[7vw]">
        <div className="w-[70%] h-screen flex justify-center ">
          <div className="w-[90%] h-full flex flex-col border-r-2 pt-[15vh] md:border-0 md:w-[100%] md:pt-[13vh]">
            <div className="text-2xl font-semibold pl-10">Book a Slot for</div>
            <div className="text-3xl font-semibold pl-10"> 1:1 Session</div>
            {/* <div className="filter-options-booking">
              <div className="f-slot f-slot-1">All Slots</div>
            </div> */}
            <div className="slot-complete-list">
              <div className="headers-slot">
                <div>Day</div>
                <div>Time</div>
                <div>Amount</div>
              </div>
              <div className="flex items-center justify-center flex-col ">
                {Object.keys(slots).length > 0 ? (
                  Object.keys(slots).map((day) => {
                    return (
                      <div className="slot-1-book">
                        {slots[day].map((slot) => {
                          return (
                            <>
                              <div className="list-1">
                                <div className="day-name">
                                  {new Date(day).toString().slice(0, 15)}
                                </div>
                                <div className="slot-scheduled-time">
                                  {convertToNormalTime(slot.s)} -{" "}
                                  {convertToNormalTime(slot.e)}
                                </div>
                                <div className="amount-slot">
                                  ₹{Math.round(slot.charge)}
                                </div>
                                <button
                                  onClick={() =>
                                    onClickingBook(
                                      day,
                                      mentorId,
                                      slot.s,
                                      slot.e,
                                      userData._id,
                                      slot.charge
                                    )
                                  }
                                >
                                  Book{" "}
                                </button>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <h3 style={{ textAlign: "center", margin: "5vw" }}>
                    No slot added by user
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>

        <Profileandevents userData={mentorData} useUserData={true} />
      </div>
    </>
  );
}

export default Bookslot;
