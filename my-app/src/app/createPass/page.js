"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePass() {
  const router = useRouter();
  const backend_url = process.env.BACKEND_URL;

  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleNext = () => {
    if (!password) return setMessage("Enter a password");
    if (!confirmPassword) return setMessage("Confirm your password");
    if (password !== confirmPassword)
      return setMessage("Passwords don't match");
    setMessage("");
    setStep(2);
  };

  const handleResetPassword = async () => {
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
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {step === 1 && (
        <>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />{" "}
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show password{" "}
          </label>
          {message && <p className="text-red-500">{message}</p>}{" "}
          <button onClick={handleNext}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Confirm password reset</p>
          {message && <p className="text-red-500">{message}</p>}
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
}
