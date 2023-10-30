import React from "react";
import "./index.css";
import Header1 from "../Header";
import { useNavigate } from "react-router-dom";
import { updateIsMentor } from "../../api/userRequest";
import { useState } from "react";
import Pageloader from "../Pagesbar";
import { toast } from "react-hot-toast";
function Auth7Component({ setProgress }) {
    const navigate = useNavigate();
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [upiId, setUpiId] = useState("");
    const [linkedinId, setlinkedinId] = useState("");

    const finish = async () => {
        if (!whatsappNumber) {
            toast.error("Phone number is required!");
            return;
        }

        if (whatsappNumber.length !== 10) {
            toast.error("Phone number should contain 10 digits");
            return;
        }

        if(!upiId) {
            toast.error("UPI ID is required!");
            return;
        }
        setProgress(30);
        try {
            const { data } = await updateIsMentor({ whatsappNumber, upiId, linkedinId });
            if (data.result) {
                navigate("/homepage");
                toast.success("User registered!")
            }
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
        // console.log(data, "hello");
        setTimeout(() => {
            setProgress(100);
        }, 300);
    };
    return (
        <>
            <Header1 />
            <Pageloader
                givecolor1={false}
                givecolor2={false}
                givecolor3={false}
                givecolor4={false}
                givecolor5={false}
                givecolor6={true}
                isactive6={true} />
            <div className="main-7">

                <div className="head-7">
                    <h2>Alright One Last Step</h2>
                </div>
                <div className="details-wp">
                    <div>Contact Number</div>
                    <input
                        className="wp"
                        type="number"
                        onChange={(e) => setWhatsappNumber(e.target.value)
                        }
                    />
                    <div>UPI ID</div>
                    <input
                        className="Upi"
                        onChange={(e) => setUpiId(e.target.value)
                        }
                    />
                    <div>LinkedIn Profile link</div>
                    <input
                        className="Upi"
                        onChange={(e) => setlinkedinId(e.target.value)
                        }
                    />

                </div>
                <div className="finish">
                    <button className="finishbt" onClick={finish} >
                        Finish
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <button className="finishbt" type="button" form="myform2" onClick={() =>
                        navigate("/pic")}>
                        Back
                    </button> */}
                </div>

            </div>
        </>
    );
}

export default Auth7Component;