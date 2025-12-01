"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const backend_url = process.env.BACKEND_URL;

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendLink = () => {
    if (!email) return setMessage("Please enter your email");
    setMessage("");
    setTimeout(() => setStep(2), 600);
  };

  const handleVerify = () => {
    if (!verifyCode) return setMessage("Enter verification code");
    if (verifyCode !== "8888") return setMessage("Invalid verification code");
    setMessage("");
    setTimeout(() => setStep(3), 1000);
  };

  const handleResetPassword = async () => {
    if (!password) return setMessage("Please enter a new password");

    const res = await fetch(`${backend_url}/users/resetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "dummy-token", password }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="bg-white flex justify-around h-screen w-full items-center">
      <div className="bg-white w-[416px] h-[520px] rounded-lg p-6 flex flex-col justify-between">
        <div>
          <button
            className="border border-gray-400 w-9 h-9 rounded-lg text-center text-black cursor-pointer"
            onClick={() => router.back()}
          >
            ◀︎
          </button>

          {step === 1 && (
            <div className="flex flex-col gap-6 pt-6">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-[#E4E4E7] w-full p-2 rounded text-black"
              />
              {message && <p className="text-red-500">{message}</p>}
              <button
                className="w-full h-9 rounded-lg bg-black text-white"
                onClick={handleSendLink}
              >
                Send Link
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 pt-6">
              <input
                type="text"
                maxLength={4}
                placeholder="8888"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="border border-[#E4E4E7] w-full p-2 rounded text-black text-center"
              />
              {message && <p className="text-red-500">{message}</p>}
              <button
                className="w-full h-9 rounded-lg bg-black text-white"
                onClick={handleVerify}
              >
                Verify
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 pt-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-[#E4E4E7] w-full p-2 rounded text-black"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-[#E4E4E7] w-full p-2 rounded text-black"
              />
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label>Show password</label>
              </div>
              {message && <p className="text-red-500">{message}</p>}
              <button
                className="w-full h-9 rounded-lg bg-black text-white"
                onClick={() => {
                  if (!password) return setMessage("Enter a password");
                  if (!confirmPassword)
                    return setMessage("Confirm your password");
                  if (password !== confirmPassword)
                    return setMessage("Passwords do not match");
                  handleResetPassword();
                }}
              >
                Create Password
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          src="/login.jpg"
          className="w-[1296px] h-[1074px] rounded-lg"
          alt="login"
        />
      </div>
    </div>
  );
}
