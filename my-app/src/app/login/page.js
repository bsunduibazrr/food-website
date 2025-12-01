"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef(null);
  const backend_url = process.env.BACKEND_URL;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setErrorMessage("");

    const apiLink = isLogin
      ? `${backend_url}/users/login`
      : `${backend_url}/users/signup`;

    try {
      const res = await fetch(apiLink, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("datacn end bna", data);

      if (!res.ok) return setErrorMessage(data.message);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);

        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        if (decoded.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        router.push(`/createPassword?email=${email}`);
      }
    } catch (err) {
      setErrorMessage("aldaa zaacla lalaraaa psdamn");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && isValidEmail;

  return (
    <div className="bg-white flex justify-around h-screen w-full items-center">
      <div className="bg-white w-[416px] rounded-lg p-6">
        <button
          onClick={() => router.back()}
          className="border border-gray-400 w-9 h-9 rounded-lg text-center text-black cursor-pointer"
        >
          ◀︎
        </button>

        <div className="flex flex-col gap-1 pt-4">
          <p className="text-black text-[24px] font-semibold">
            {isLogin ? "Log in" : "Create your account"}
          </p>
          <p className="text-[#71717A] text-[16px] font-normal">
            {isLogin
              ? "Log in to enjoy your favorite dishes."
              : "Sign up to start your journey."}
          </p>
        </div>

        <div className="flex flex-col gap-5 pt-6">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                passwordRef.current?.focus();
              }
            }}
            className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
          />
          {email && !isValidEmail && (
            <p className="text-red-500 text-[14px] font-medium -mt-4">
              Invalid email format.
            </p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isFormValid) {
                  handleSubmit();
                }
              }}
              className="border border-[#E4E4E7] w-full p-2 rounded text-black focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 text-sm cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {isLogin && (
            <p
              className="text-[14px] font-normal hover:underline text-black cursor-pointer"
              onClick={() => router.push("/resetPassword")}
            >
              Forgot password?
            </p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-[14px] font-medium">
              {errorMessage}
            </p>
          )}

          <button
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
            className={`w-full h-9 rounded-lg transition font-medium text-[14px] ${
              !isFormValid || loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black cursor-pointer transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
            }`}
          >
            {loading ? "Please wait..." : isLogin ? "Let's Go" : "Sign Up"}
          </button>

          <div className="flex justify-center gap-5">
            <p className="text-[16px] font-normal text-[#71717A]">
              Don’t have an account?
            </p>
            <p
              className="text-[16px] font-normal text-[#2563EB] hover:underline cursor-pointer"
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsValidEmail(false);
                setErrorMessage("");
                router.push("/signup");
              }}
            >
              Sign up
            </p>
          </div>
        </div>
      </div>

      <div>
        <img
          src="/login.jpg"
          className="w-[1296px] h-[1074px] rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
