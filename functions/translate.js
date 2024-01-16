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

  if (task.detect) {
    //const detected = await detectLanguage(ai, task.text)
    const detected = await detectLanguageOpenAi(task.text, context)

    if (detected === task.to) {
      // swap task.from and task.to
      const temp = task.from
      task.from = task.to
      task.to = temp
    }

    task.from = detected
  }

  const response = await ai.run('@cf/meta/m2m100-1.2b', {
    text: task.text,
    source_lang: task.from,
    target_lang: task.to
  })

  return new Response(JSON.stringify(response), { headers })
}

async function detectLanguage(ai, text) {
  try {
    const res = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', {
      messages: [
        {
          role: 'system',
          content: 'detect the language of the user prompt. Output only a single word'
        },
        { role: 'user', content: text }
      ]
    })

    const language = res.response
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]|_/g, '')

    console.log(`detected language: "${language}"`)

    if (language === '') {
      throw new Error('could not detect language')
    }

    return language
  } catch (e) {
    console.log(e)
    console.log('defaulting to english')
    return 'english'
  }
}

async function detectLanguageOpenAi(text, context) {
  try {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'detect the language of the user prompt. Output only a single word in lowercase. Output "unknown" if unknown.'
        },
        {
          role: 'user',
          content: text
        }
      ]
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    console.log(result)
    const language = result['choices'][0]['message']['content']
    console.log(`detected language: "${language}"`)

    if (language === 'unknown') {
      throw new Error('could not detect language')
    }

    return language
  } catch (error) {
    console.log(error)
    console.log('defaulting to english')
    return 'english'
  }
}
