import { Ai } from "@cloudflare/ai";


export async function onRequest(context) {
  const ai = new Ai(context.env.AI);

  const query = new URL(context.request.url).searchParams.get("query");
  const question = query || "What is the square root of 9?";

  const systemPrompt = `You are a helpful assistant.`;
  const stream = await ai.run(
    "@cf/meta/llama-2-7b-chat-int8",
    {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      stream: true,
    },
  );

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "Access-Control-Allow-Origin": "* "
    },
  });}
