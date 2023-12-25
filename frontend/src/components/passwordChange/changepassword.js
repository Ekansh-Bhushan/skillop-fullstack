import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./changepassword.css";
import Mobilecommonhead from "../Mobilecommonhead";
import Profileandevents from "../Landing/Profileandevents";
import { actualChangePassword } from "../../api/userRequest";
import toast from "react-hot-toast";

function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password don't match.");
            return;
        }

        try {
            const { data } = await actualChangePassword(
                newPassword,
                currentPassword
            );

            toast(data.message);
            navigate("/myaccount");
        } catch (error) {
            toast(error.response.data.message);
        }
    };

    return (
        <>
            <Mobilecommonhead />

            <div className="dash-main">
                <div className="dash-right dash-right-2">
                    <div className="pt-[10vh] h-[100vh] border-r-2 md:border-0 md:pt-[6vh]">
                        <h1 className="heading">Change Password</h1>
                        <form
                            className="form-making"
                            onSubmit={handlePasswordChange}
                        >
                            <div className="input-area">
                                <label
                                    className="label-area"
                                    htmlFor="currentPassword"
                                >
                                    Current Password:
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    className="changepasswordarea"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="input-area-second">
                                <label
                                    className="newpassword-label-area"
                                    htmlFor="newPassword"
                                >
                                    New Password:
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="newpassword-area"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="confirmPassword-area">
                                <label htmlFor="confirmPassword">
                                    Confirm New Password:
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="confirmpassword-input-area"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="change-password-button-area"
                                type="submit"
                                onClick={handlePasswordChange}
                            >
                                Change Password
                            </button>
                        </form>
                        <Profileandevents />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePasswordPage;
