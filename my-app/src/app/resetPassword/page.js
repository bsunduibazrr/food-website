"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [step, setStep] = useState(token ? 3 : 1);

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Step 1 shu llra
  const handleSendLink = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return setMessage("Please enter your email");
    if (!emailRegex.test(email))
      return setMessage(
        "Please enter a valid email format (example@gmail.com)"
      );

    setMessage("");

    setTimeout(() => {
      setStep(2);
    }, 600);
  };

  // Step 2 shu llra
  const handleVerify = () => {
    if (!verifyCode) return setMessage("Enter verification code");
    if (verifyCode !== "8888") return setMessage("Invalid verification code");

    setMessage("");

    setTimeout(() => {
      router.push("/resetPassword?token=test123");
    }, 1000);
  };

  // Step 3 shu llra
  const handleResetPassword = async () => {
    if (!password) {
      setMessage("Please enter a new password");
      return;
    }

    const res = await fetch("http://localhost:8000/users/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => router.push("/login"), 1500);
    }
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

          {/*// Step 1 shu llra */}
          {step === 1 && (
            <>
              <div className="flex flex-col gap-1 pt-4">
                <p className="text-black text-[24px] font-semibold">
                  Reset your password
                </p>
                <p className="text-[#71717A] text-[16px] font-normal">
                  Enter your email to receive a reset link.
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-6">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
                />

                {message && (
                  <p className="text-red-500 text-[14px] font-medium">
                    {message}
                  </p>
                )}

                <button
                  className="w-full h-9 rounded-lg bg-black text-white cursor-pointer font-medium text-[14px] transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
                  onClick={handleSendLink}
                >
                  Send Link
                </button>
                <div className="flex justify-center gap-3">
                  <p className="text-[16px] font-normal text-[#71717A]">
                    Don’t have an account?{" "}
                  </p>
                  <p
                    className="text-[16px] font-normal text-[#2563EB] hover:underline cursor-pointer"
                    onClick={() => router.push("/signup")}
                  >
                    Sign up
                  </p>
                </div>
              </div>
            </>
          )}

          {/*// Step 2 shu llra */}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-1 pt-4">
                <p className="text-black text-[24px] font-semibold">
                  Please verify Your Email
                </p>
                <p className="text-[#71717A] text-[16px] font-normal text-center">
                  We just sent an email to {email} Click the link in the email
                  to verify your account.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="8888"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="border border-[#E4E4E7] w-full p-2 rounded text-black text-center text-[20px] tracking-[10px] focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
                />

                {message && (
                  <p className="text-red-500 text-[14px] font-medium">
                    {message}
                  </p>
                )}

                <button
                  className="w-full h-9 rounded-lg bg-black text-white cursor-pointer font-medium text-[14px]  transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>
            </>
          )}

          {/*// Step 3 shu llra */}
          {step === 3 && token && (
            <>
              <div className="flex flex-col gap-1 pt-4">
                <p className="text-black text-[24px] font-semibold">
                  Create new password
                </p>
                <p className="text-[#71717A] text-[16px] font-normal">
                  Set a new password with a combination of letters and numbers
                  for better security.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
                />

                <div className="flex items-center gap-2 mt-1.5">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 cursor-pointer accent-[#EF4444]"
                  />
                  <label className="text-[14px] text-[#71717A] cursor-pointer">
                    Show password
                  </label>
                </div>

                {message && (
                  <p
                    className={`text-[14px] font-medium ${
                      message.includes("success")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <button
                  className="w-full h-9 rounded-lg bg-black text-white cursor-pointer font-medium text-[14px] transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
                  onClick={() => {
                    if (!password) return setMessage("Please enter a password");
                    if (!confirmPassword)
                      return setMessage("Please confirm your password");
                    if (password.length < 6)
                      return setMessage(
                        "Password must be at least 6 characters"
                      );
                    if (password !== confirmPassword)
                      return setMessage("Passwords do not match");

                    handleResetPassword();
                  }}
                >
                  Create Password
                </button>
              </div>
            </>
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
