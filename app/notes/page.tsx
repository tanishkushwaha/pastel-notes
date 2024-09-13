import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Notes from "@/components/Notes";

export default async function MyNotes() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  return <Notes noteCategory="normal" session={session} />;
}
