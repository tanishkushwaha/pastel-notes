import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <h1 className='text-center font-medium text-5xl'>Sign up</h1>
        <SignupForm />
        <a href='/signin' className='text-right block mt-4 text-black'>
          Already have an account?
        </a>
      </div>
    </div>
  );
}
