import { Client } from '@line/bot-sdk'

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '',
  channelSecret: process.env.LINE_CHANNEL_SECRET ?? undefined,
})

export default client
