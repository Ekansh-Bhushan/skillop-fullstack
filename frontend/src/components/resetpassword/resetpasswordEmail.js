import React, { useState } from "react";
import "../passwordChange/changepassword.css";
import { changePassword } from "../../api/userRequest";
function ResetPasswordEmail() {
  const [email, setEmail] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // if (newPassword !== confirmPassword) {
    //   alert("New password and confirm password don't match.");
    //   return;
    // }

    // You can implement your password change logic here.
    // You may want to send an API request to your server to update the password.

    // Reset the form after a successful password change.
    // setCurrentPassword('');
    // setNewPassword('');
    // setConfirmPassword('');
    const { data } = await changePassword({
      email: email,
    });
    console.log(data);
  };

  return (
    <div>
      <h1 className="heading">Reset Password</h1>
      <form className="form-making" onSubmit={handlePasswordChange}>
        <div className="input-area-second">
          <label className="newpassword-label-area" htmlFor="newPassword">
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
