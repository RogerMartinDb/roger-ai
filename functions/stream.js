import { Ai } from '@cloudflare/ai'

export async function onRequestPost(context) {
  const request = context.request
  const ai = new Ai(context.env.AI)

  const task = await request.json()

  const question = task.question

  const systemPrompt = `You are a helpful assistant.`
  const stream = await ai.run(task.modelId, {
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ],
    stream: true
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream',
      'Access-Control-Allow-Origin': '* '
    }
  })
}
