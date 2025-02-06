import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { EmailAlreadyExists } from '../functions/errors/email-already-exists'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['subscriptions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({ subscriberId: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      try {
        const { subscriberId } = await subscribeToEvent({
          name,
          email,
          invitedBySubscriberId: referrer || null,
        })

        return reply.status(201).send({ subscriberId })
      } catch (err) {
        if (err instanceof EmailAlreadyExists) {
          return reply.status(409).send({ message: err.message })
        }

        throw err
      }
    }
  )
}
