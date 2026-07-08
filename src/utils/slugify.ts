import slugify from "slugify";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  5
);

export const generateSlug = (
  text: string
) => {

  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${slug}-${nanoid()}`;
};