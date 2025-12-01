"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState("");
  const backend_url = process.env.BACKEND_URL;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleSignup = async () => {
    setMessage("");

    try {
      const res = await fetch(`${backend_url}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Sign up failed");
      } else {
        setMessage("🥳 Successfully registered!");
        setTimeout(() => router.push(`/createPass?email=${email}`), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Network error");
    }
  };

  return (
    <div className="bg-white flex justify-around h-screen w-full items-center">
      <div className="bg-white w-[416px] h-[500px] rounded-lg p-6 flex flex-col justify-between">
        <div>
          <button
            className="border border-gray-400 w-9 h-9 rounded-lg text-center text-black cursor-pointer"
            onClick={() => router.back()}
          >
            ◀︎
          </button>

          <div className="flex flex-col gap-1 pt-4">
            <p className="text-black text-[24px] font-semibold">
              Create your account
            </p>
            <p className="text-[#71717A] text-[16px] font-normal">
              Sign up to explore your favorite dishes.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
            />
            {!isValidEmail && email && (
              <p className="text-red-500 text-[14px] font-medium -mt-2">
                Invalid email. Use a format like example@email.com
              </p>
            )}

            <button
              disabled={!isValidEmail}
              onClick={handleSignup}
              className={`w-full h-9 rounded-lg transition font-medium text-[14px] ${
                !isValidEmail
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444] cursor-pointer"
              }`}
            >
              Let's Go
            </button>

            {message && (
              <p className="text-red-500 text-[14px] font-medium mt-2">
                {message}
              </p>
            )}

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
