"use client";
import { useState, useContext, useEffect } from "react";
import { API_URL } from "../../constants";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/modules/auth_provider";
import SubmitButton from "../../components/SubmitButton";
import InputBox from "../../components/InputBox";
import Link from "next/link";
import Head from "next/head";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      router.push("/");
      return;
    }
  }, [authenticated]);

  const router = useRouter();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      if (res.ok) {
        router.push("/login");
        window.alert("Successfully registered! Now login");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <form
          className="flex flex-col md:w-1/5"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="text-4xl font-bold text-center">
            <span>Welcome!</span>
          </div>
          <InputBox
            placeholder="Username"
            value={username}
            label="Username"
            onChange={setUsername}
          />
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
            href="/login"
          >
            Already have account?
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
