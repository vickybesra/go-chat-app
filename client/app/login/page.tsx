"use client";
import { useState, useContext, useEffect } from "react";
import { API_URL } from "../../constants";
import { useRouter } from "next/navigation";
import { UserInfo, AuthContext } from "@/modules/auth_provider";
import SubmitButton from "../../components/SubmitButton";
import InputBox from "../../components/InputBox";
import Link from "next/link";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/");
      return;
    }
  }, [authenticated]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        window.alert("Incorrect Credentials!");
        return;
      }
      if (res.ok) {
        const user: UserInfo = {
          id: data.id,
          username: data.username,
        };
        localStorage.setItem("user_info", JSON.stringify(user));
        router.push("/");
        window.alert("Logged In Successfully!");
        return;
      }
    } catch (err) {
      console.log(err);
      window.alert("Something went wrong! Check server");
    }
  };
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen">
      <form
        className="flex flex-col md:w-1/5"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="text-4xl font-bold text-center">
          <span>Welcome!</span>
        </div>
        <InputBox
          placeholder="Email"
          type="email"
          value={email}
          label="Email"
          onChange={setEmail}
        />
        <InputBox
          placeholder="Password"
          type="password"
          value={password}
          label="Password"
          onChange={setPassword}
        />
        <SubmitButton label="Submit" />
        <Link
          className="mt-2 flex flex-col justify-center items-center hover:underline"
          href="/signup"
        >
          Create new account
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
