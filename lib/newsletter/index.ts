import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});

export type NewsletterSubscriber = {
  email: string;
  subscribedAt: string;
};

export type NewsletterResponse = {
  success: boolean;
  message?: string;
  error?: string;
};
