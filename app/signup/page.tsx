import SignupForm from "@/components/SignupForm";

export default function Signup() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center font-medium text-5xl">Sign up</h1>
        <SignupForm />
      </div>
    </div>
  )
}
