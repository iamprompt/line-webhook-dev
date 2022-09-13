import { WebhookRequestBody } from '@line/bot-sdk'
import express from 'express'
import { client } from './utils'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  console.log('Hello World')
  res.json({ message: 'Hello World' })
})

app.post('/webhook', (req, res) => {
  const { body } = req as { body: WebhookRequestBody }

  for (const event of body.events) {
    if (
      event.type === 'unsend' ||
      event.type === 'unfollow' ||
      event.type === 'leave' ||
      event.type === 'memberLeft'
    ) {
      continue
    }

    client.replyMessage(event.replyToken, {
      type: 'text',
      text: JSON.stringify(event, null, 2),
    })
  }

  res.send({ message: 'OK!' })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
