export async function onRequest(context) {
  const request = context.request

  const { searchParams } = new URL(request.url)
  const task = { prompt: searchParams.get('prompt') }

  const params = {
    headers: {
      authorization: `Bearer ${context.env.WORKER_AI_TOKEN}`,
      accept: '*/*'
    },
    body: JSON.stringify(task),
    method: 'POST'
  }

  const apiCall = await fetch(
    'https://api.cloudflare.com/client/v4/accounts/09084f948abbe98e17fc7e0f9597a761/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0',
    params
  )

  const response = new Response(apiCall.body, apiCall)
  response.headers.append('Cache-Control', 'max-age=3600')

  return response
}
