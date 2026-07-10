import { z } from "zod"
import apiActions from "@/src/utils/validation/api-actions"

const UpdateUserSchema = z.object({
  email: z.string()
    .optional(),
  isSuperUser: z.boolean().optional(),
  isStaff: z.boolean().optional(),
  isActive: z.boolean().optional(),
  role: z.object({
    id: z.string().optional(),
    apiAction: z.enum(apiActions).optional(),
    role: z.object({
      id: z.string(),
    })
  }).optional(),
})

export default UpdateUserSchema

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>
