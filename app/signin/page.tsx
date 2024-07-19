import SigninForm from "@/components/SigninForm";
import { login } from "@/lib/actions";


export default function Signin() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center font-medium text-5xl">Sign in</h1>
        <SigninForm />
      </div>
    </div>
  )
}
