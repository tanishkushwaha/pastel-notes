import SigninForm from "@/components/SigninForm";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h1 className='text-center font-medium text-5xl'>Sign in</h1>
        <SigninForm />
        <a href='/signup' className='text-right block mt-4 text-black'>
          Or create an account
        </a>
      </div>
    </div>
  );
}
