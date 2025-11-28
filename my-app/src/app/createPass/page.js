"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreatePassword = async () => {
    setMessage("");

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    const hasMinLength = password.length >= 8;

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSymbol && hasMinLength;

    if (!passwordValid) {
      setMessage("Weak password. Use numbers and symbols.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Those password did’t match, Try again");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users/createPass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to set password");
      } else {
        setMessage(" Password created successfully!");
        setTimeout(() => router.push("/login"), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage("aldaa zaacla lalraa");
    }
  };
  console.log(email, "tvuhewjb ");

  return (
    <div className="bg-white flex justify-around h-screen w-full items-center">
      <div className="bg-white w-[416px] h-[480px] rounded-lg p-6 flex flex-col justify-between">
        <div>
          <button
            className="border border-gray-400 w-9 h-9 rounded-lg text-center text-black cursor-pointer"
            onClick={() => router.back()}
          >
            ◀︎
          </button>

          <div className="flex flex-col gap-1 pt-4">
            <p className="text-black text-[24px] font-semibold">
              Create a strong password
            </p>
            <p className="text-[#71717A] text-[16px] font-normal">
              Create a strong password with letters, numbers.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
            />
            {message && (
              <p className="text-red-500 text-[14px] font-medium mt-2">
                {message}
              </p>
            )}

            <label className="flex items-center gap-2 text-[14px] text-[#71717A] accent-black">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <button
              onClick={handleCreatePassword}
              className={`w-full h-9 rounded-lg cursor-pointer font-medium text-[14px] bg-black transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]`}
            >
              Let's Go
            </button>

            <div className="flex justify-center gap-5 pt-2">
              <p className="text-[16px] font-normal text-[#71717A]">
                Already have an account?
              </p>
              <p
                className="text-[16px] font-normal text-[#2563EB] hover:underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log in
              </p>
            </div>
          </div>
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
