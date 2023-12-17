import { Ai } from '@cloudflare/ai'

const headers = {
  'content-type': 'text/event-stream',
  'Access-Control-Allow-Origin': '* ',
  'Access-Control-Allow-Methods': 'HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': 'content-type'
}

export async function onRequestOptions(context) {
  return new Response(null, { headers })
}

export async function onRequestPost(context) {
  const request = context.request
  const ai = new Ai(context.env.AI)
  const task = await request.json()
  const stream = await ai.run(task.modelId, {
    messages: [
      { role: 'system', content: `You are a helpful assistant.` },
      { role: 'user', content: task.question }
    ],
    stream: true
  })

  return new Response(stream, { headers })
}
