import { NextRequest } from "next/server";
import { runAgent, validate } from "@/lib/agent";

export const runtime = "nodejs"; // allow node fetch features
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { messages } = validate(json);
    const reply = await runAgent(messages);
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message ?? "Bad Request" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
}
