import React, { useState } from "react";
import icon from "../../assets/icon.png";
import "./Auth.css";
import { resetPassword } from "../../api";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      alert("Please enter all the relevant details");
      return;
    }
    try {
      setLoading(true);
      const response = await resetPassword({ email, otp, newPassword });
      console.log(response.data.message);
      alert(response.data.message);
      navigate("/Auth");
    } catch (error) {
      console.error("Failed to reset Password:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="otp">
            <h4>OTP</h4>
            <input
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>New Password</h4>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            Submit
          </button>
        </form>
        {loading && <div className="simple-loader">Reseting Password...</div>}
      </div>
    </section>
  );
};

export default ResetPasswordForm;
