class SimpleMessageEvent {
  public data: string

  constructor(data: string) {
    this.data = data
  }
}

export class EventSourcePost {
  public url: string
  public onmessage: (ev: SimpleMessageEvent) => any = () => {}
  public onerror: (error: any) => any = () => {}

  reader: ReadableStreamDefaultReader<string> | undefined

  constructor(url: string) {
    this.url = url
  }

  async post(body: any) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/event-stream'
        },
        body: JSON.stringify(body)
      })

      if (!response.body) {
        throw `no response body from ${this.url}`
      }

      this.reader = response.body.pipeThrough(new TextDecoderStream()).getReader()

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await this.reader.read()
        if (done) {
          break
        }

        const lines = value
          .toString()
          .split('\n')
          .filter((line) => line.trim() !== '')

        for (const line of lines) {
          const message = line.replace(/^data: /, '')
          this.onmessage(new SimpleMessageEvent(message))
        }
      }
    } catch (error) {
      this.onerror(error)
    }
  }

  close() {
    this.reader?.cancel()
  }
}
