"use client";

import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { BarLoader } from "react-spinners";

export default function SignupForm() {
  const router = useRouter();
  const [formState, formAction] = useFormState(register, null);

  useEffect(() => {
    if (!formState) return;

    if (!formState.success) {
      toast.error(formState.message);
    }

    if (formState.success) {
      toast.success(formState.message);
      router.replace("/signin");
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

  if (pending) {
    return (
      <div className='flex justify-center mt-8'>
        <BarLoader />
      </div>
    );
  }

  return (
    <>
      <div className='mt-8 grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] grid-rows-4 gap-4'>
        <label className='col-start-1 row-start-1 self-center text-2xl'>
          first name:
        </label>
        <input
          type='text'
          name='firstName'
          required
          className='col-start-2 row-start-1 p-2 border-2 border-black rounded-lg text-xl'
        />
        <label className='col-start-1 row-start-2 self-center text-2xl'>
          last name:
        </label>
        <input
          type='text'
          name='lastName'
          required
          className='col-start-2 row-start-2 p-2 border-2 border-black rounded-lg text-xl'
        />
        <label className='col-start-1 row-start-3 self-center text-2xl'>
          email:
        </label>
        <input
          type='email'
          name='email'
          required
          className='col-start-2 row-start-3 p-2 border-2 border-black rounded-lg text-xl'
        />
        <label className='col-start-1 row-start-4 self-center text-2xl'>
          password:
        </label>
        <input
          type='password'
          name='password'
          required
          className='col-start-2 row-start-4 p-2 border-2 border-black rounded-lg text-xl'
        />
        {pending ? (
          <div className='flex justify-center col-span-2 w-full pt-4 pb-4'>
            <BarLoader />
          </div>
        ) : (
          <button
            type='submit'
            className='block w-full p-2 bg-black border-2 border-black text-white rounded-lg mt-4 text-2xl col-span-2 active:bg-white active:text-black transition-colors'
          >
            Sign up
          </button>
        )}
      </div>
    </>
  );
}
