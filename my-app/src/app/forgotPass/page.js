"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const backend_url = process.env.BACKEND_URL;

  const handleCreatePassword = async () => {
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/users/requestReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "Something went wrong");
    } catch (err) {
      console.error(err);
      setMessage("Server error occurred.");
    }
  };

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
              Reset your password
            </p>
            <p className="text-[#71717A] text-[16px] font-normal">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#E4E4E7] w-full p-2 rounded text-black"
            />

            <button
              onClick={handleCreatePassword}
              className="w-full h-9 rounded-lg cursor-pointer font-medium text-[14px] bg-black  transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
            >
              Send link
            </button>

            <p className="text-center text-[14px] text-red-500">{message}</p>

            <div className="flex justify-center gap-5 pt-2">
              <p className="text-[16px] font-normal text-[#71717A]">
                Don't have an account?
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

      <img
        src="/login.jpg"
        className="w-[1296px] h-[1074px] rounded-lg"
        alt="login"
      />
    </div>
  );
}
