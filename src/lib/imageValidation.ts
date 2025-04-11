import { z } from "zod";

/**
 * Creates a Zod schema for validating image files
 * @param fieldName The name of the field for error messages
 * @returns A Zod schema that validates if a file is an image
 */
export const createImageSchema = (fieldName: string) => {
  return z.instanceof(File).refine(
    (file) => file.type.startsWith('image/'),
    { message: `${fieldName} must be an image file` }
  );
};

/**
 * Creates a Zod schema for validating multiple image files
 * @param fieldName The name of the field for error messages
 * @returns A Zod schema that validates if all files are images
 */
export const createMultipleImagesSchema = (fieldName: string) => {
  return z.array(z.instanceof(File)).refine(
    (files) => files.every(file => file.type.startsWith('image/')),
    { message: `All ${fieldName} must be image files` }
  );
};

/**
 * HTML attributes for file inputs that accept only images
 */
export const imageInputProps = {
  accept: "image/*",
}; 