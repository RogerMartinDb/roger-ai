export async function onRequest() {
  const url = 'https://emotional-text-to-speech.p.rapidapi.com/synth'
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '85abbd6269msh9f3d939cce85e4ep13c0adjsn048b194c0546',
      'X-RapidAPI-Host': 'emotional-text-to-speech.p.rapidapi.com'
    },
    body: {
      format: 'ogg',
      data: [
        {
          type: 'text',
          lang: 'en',
          speaker: 'Elias',
          data: [
            {
              text: 'The tokamak is an experimental machine designed to harness the energy of fusion. Inside a tokamak, the energy produced through the fusion of atoms is absorbed as heat in the walls of the vessel.',
              emotion: [9],
              pauseAfter: 300,
              pauseBefore: 300
            }
          ]
        }
      ]
    }
  }

  try {
    console.log('calling...')
    const response = await fetch(url, options)
    const result = await response.text()
    console.log(result)

    return new Response(result)
  } catch (error) {
    console.error(error)
  }
}
