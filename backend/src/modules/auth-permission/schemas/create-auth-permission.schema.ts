import { z } from "zod";

const CreateAuthPermissionSchema = z.object({
  resource: z.string().min(1, "Resource is required"),
  action: z.string().min(1),
  roles: z
    .array(
      z.object({
        id: z.string().min(1, "Role ID is required"),
      })
    )
    .optional(),
});

export default CreateAuthPermissionSchema;

export type CreateAuthPermissionSchemaType = z.infer<
  typeof CreateAuthPermissionSchema
>;
