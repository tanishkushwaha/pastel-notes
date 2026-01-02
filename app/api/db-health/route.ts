import prisma from "@/lib/db";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ db: "connected" });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ db: "disconnected" }), {
      status: 500,
    });
  }
}
