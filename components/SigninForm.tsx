'use client';

import { getSession, redirectTo } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import { authSignIn } from "@/lib/actions";

export default function SigninForm() {
  const [authenticated, setAuthenticated] = useState({ pending: true, value: false, redirect: false });

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setAuthenticated({ pending: false, value: true, redirect: true });
      } else {
        setAuthenticated({ pending: false, value: false, redirect: false });
      }
    });
  }, []);

  useEffect(() => {
    if (authenticated.redirect) {
      redirectTo("/");
    }
  }, [authenticated.redirect]);

  if (authenticated.pending || authenticated.redirect) {
    return (
      <div className="flex justify-center mt-8">
        <BarLoader />
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <form action={authSignIn}>
        <FormContent />
      </form>
    </>
  )
}

function FormContent() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="flex justify-center mt-8">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="mt-8 w-96 grid grid-cols-[auto_1fr] grid-rows-2 gap-4">
      <label className="col-start-1 row-start-1 justify-self-start self-center text-2xl">email:</label>
      <input type="email" name="email" required className="col-start-2 row-start-1 p-2 border-2 border-black rounded-lg text-xl" />
      <label className="col-start-1 row-start-2 justify-self-end self-center text-2xl">password:</label>
      <input type="password" name="password" required className="col-start-2 row-start-2 p-2 border-2 border-black rounded-lg text-xl" />
      <button type="submit" className="block w-full p-2 bg-black border-2 border-black text-white rounded-lg mt-4 text-xl col-span-2 active:bg-white active:text-black transition-colors">
        Sign in
      </button>
    </div>
  );
}
