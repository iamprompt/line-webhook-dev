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

    if (event.type === 'message' && event.message.type === 'text') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text,
      })
    } else if (event.type === 'postback') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.postback.data,
      })
    } else if (event.type === 'follow') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'follow',
      })
    } else if (event.type === 'join') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'join',
      })
    } else if (event.type === 'memberJoined') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'memberJoined',
      })
    } else if (event.type === 'beacon') {
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: `[Beacon] ${event.beacon.type} ${event.beacon.hwid}`,
      })
    }
  }

  res.send({ message: 'OK!' })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
