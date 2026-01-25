import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string().min(4, "Password must be 8 chars"),
});
