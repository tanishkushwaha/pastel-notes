import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Notes from "@/components/Notes";

export default async function Trash() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  return <Notes noteCategory="trashed" session={session} />;
}
