import React, { useState } from "react";
import "../passwordChange/changepassword.css";
import { changePassword } from "../../api/userRequest";
import toast from "react-hot-toast";
function ResetPasswordEmail() {
    const [email, setEmail] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const { data } = await changePassword({
            email: email,
        });
        if (data.result) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div>
        <h1 className="heading"
          style={{
          paddingTop:"100px"
        }}
        >Reset Password</h1>
            <form className="form-making" onSubmit={handlePasswordChange}>
                <div className="input-area-second">
                    <label
                        className="newpassword-label-area"
                        htmlFor="newPassword"
                    >
                        Enter Your Email :
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <button className="change-password-button-area" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordEmail;
