import { Ai } from '@cloudflare/ai'

const headers = {
  'content-type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '* ',
  'Access-Control-Allow-Methods': 'HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': 'content-type'
}

export async function onRequestOptions() {
  return new Response(null, { headers })
}

export async function onRequestPost(context) {
  const request = context.request
  const ai = new Ai(context.env.AI)
  const task = await request.json()
  const response = await ai.run('@cf/meta/m2m100-1.2b', {
    text: task.text,
    source_lang: task.from,
    target_lang: task.to
  })

  return new Response(JSON.stringify(response), { headers })
}
