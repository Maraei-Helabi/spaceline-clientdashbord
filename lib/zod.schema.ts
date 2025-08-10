import { z } from "zod/mini";

export const fileInput = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.string(),
  preview: z.string(),
  origin_file: z.union([z.instanceof(File), z.null()]),
  file: z.union([z.string(), z.instanceof(ArrayBuffer), z.null()]),
});
