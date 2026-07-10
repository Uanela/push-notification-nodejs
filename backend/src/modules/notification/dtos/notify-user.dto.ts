import { z } from "zod";

export const NotifyUserDto = z.object({
  user: z.object({ id: z.string() }),
  title: z.string(),
  body: z.string(),
  data: z.record(z.unknown()),
});

export type NotifyUserDto = z.infer<typeof NotifyUserDto>;
