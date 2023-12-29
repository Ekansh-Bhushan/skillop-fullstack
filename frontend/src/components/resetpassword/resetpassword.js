import React, { useState } from "react";
import "../passwordChange/changepassword.css";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/userRequest";
function ResetPasswordPage() {
    // utl will be like https://app.skillop.in/password/reset/f2300b89c030285152e88e3263e9fe64126ebaf3
    const resetPasswordToken = window.location.pathname.split("/")[3];
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.success("Password and conform password do not match");
            return;
        }

        const { data } = await resetPassword({
            password: newPassword,
            token: resetPasswordToken,
        });
        console.log(data, {
            password: newPassword,
            token: resetPasswordToken,
        });

        if (data.result) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div>
            <h1
                className="heading"
                style={{
                    paddingTop: "100px",
                }}
            >
                Reset Password
            </h1>
            <form className="form-making" onSubmit={handlePasswordChange}>
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
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="change-password-button-area" type="submit">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordPage;
