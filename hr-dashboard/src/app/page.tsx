/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import Image from "next/image";
import api from "@/lib/axiosInstance";
import { addUser } from "@/utils/store/user";
import { setSideBar } from "@/utils/store/sidebar";

const Home = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }
    const payload = { email, password };
    try {
      setError("");
      const res = await api.post(
        "/login",
        payload,
        { withCredentials: true }
      );
      if(res.status === 200) {
        alert("User logged in successfully");
        dispatch(addUser(res.data.data));
        setTimeout(() => {
          router.push("/candidates");
        }, 500); 
        dispatch(setSideBar(true)); 
        console.log(res.data.data);
      }
    } catch (error : any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }
    try {
      setError("");
      const res = await api.post(
        "/signup",
        { name, email, password },
        { withCredentials: true }
      );
      console.log("res.data.data", res.data.data);
      if(res.status === 200) {
        alert("User created successfully");
      }
      dispatch(addUser(res.data.data));
      router.push("/candidates");
    } catch (error : any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((value) => !value);
    setError("");
  };

  return (
    <section className="auth-container">
      <div className="logo-container" style={{ position: "relative" }}>
        <Image className="logo" src="/images/Logo.png" width={100} height={30} alt="logo" />
      </div>

      <div className="secondary-container">
        <div className="left-container">
          <div
            style={{
              position: "relative",
              height: "200px",
              width: "400px"
            }}
          >
            <Image src="/images/auth-left.png" fill alt="logo" />
          </div>

          <div className="left-text">
            <h3 className="left-heading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </h3>
            <p>
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="right-container">
          <h1>Welcome to Dashboard</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {!isLoginForm && (
              <fieldset>
                <label>
                  Full Name<span>*</span>
                </label>
                <input
                  suppressHydrationWarning 
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
              </fieldset>
            )}

            <fieldset>
              <label>
                Email Address<span>*</span>
              </label>
              <input
              suppressHydrationWarning 
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
            </fieldset>

            <fieldset>
              <label>
                Password<span>*</span>
              </label>
              <input
                suppressHydrationWarning 
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </fieldset>

            {!isLoginForm && (
              <fieldset>
                <label>
                  Confirm Password<span>*</span>
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </fieldset>
            )}
            {error && <p className="auth-error">{error}</p>}
            <button
              type="submit"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Register"}
            </button>
          </form>
          <p className="form-toggle" onClick={toggleForm}>
            {!isLoginForm ? (
              <>
                Already have an account?
                <span> Login</span>
              </>
            ) : (
              <>
                Register if not have account?
                <span> Register </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
