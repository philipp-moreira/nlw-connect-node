import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (!rank) {
    return { position: null }
  }

  const position = rank + 1

  return { position }
}
