import { redis } from '../redis/client'

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: GetSubscriberInvitesCountParams) {
  const invites = await redis.zscore('referral:ranking', subscriberId)

  return invites ?? 0
}
