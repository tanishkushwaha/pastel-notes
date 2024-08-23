"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";
import { authSignIn } from "@/lib/actions";

export default function SigninForm() {
  const [formState, formAction] = useFormState(authSignIn, {
    error: false,
  });

  useEffect(() => {
    if (formState && formState.error) {
      toast.error("Invalid credentials");
    }
  }, [formState]);

  return (
    <>
      <Toaster />
      <form action={formAction}>
        <FormContent />
      </form>
    </>
  );
}

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <div className='mt-8 w-96 grid grid-cols-[auto_1fr] grid-rows-2 gap-4'>
      <label className='col-start-1 row-start-1 justify-self-start self-center text-2xl'>
        email:
      </label>
      <input
        type='email'
        name='email'
        required
        className='col-start-2 row-start-1 p-2 border-2 border-black rounded-lg text-xl'
      />
      <label className='col-start-1 row-start-2 justify-self-end self-center text-2xl'>
        password:
      </label>
      <input
        type='password'
        name='password'
        required
        className='col-start-2 row-start-2 p-2 border-2 border-black rounded-lg text-xl'
      />
      {pending ? (
        <div className='flex justify-center col-span-2 w-full pt-4 pb-4'>
          <BarLoader />
        </div>
      ) : (
        <button
          type='submit'
          className='block w-full p-2 bg-black border-2 border-black text-white rounded-lg mt-4 text-xl col-span-2 active:bg-white active:text-black transition-colors'
        >
          Sign in
        </button>
      )}
    </div>
  );
}
