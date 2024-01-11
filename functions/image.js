export function onRequestPost(context) {
  return new Response("Hello, world!")
}
/*
export async function onRequestPost(context) {
  const request = context.request
  const task = await request.json()

  const apiCall = await fetch(
    'https://api.cloudflare.com/client/v4/accounts/09084f948abbe98e17fc7e0f9597a761/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0',
    {
      headers: {
        authorization: `Bearer FJsyjFC2NpWpyTXXmgv6AAR_CpYLMMt2sBDYcFrZ`, /*${context.env.WORKER_AI_TOKEN}`,
        accept: '*---/*'
      },
      body: `{ 'prompt': ${task.prompt}`,
      method: 'POST'
    }
  )

  return new Response(apiCall.body, apiCall)
}
*/