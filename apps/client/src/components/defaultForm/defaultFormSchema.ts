export const formSchema = {
  title: "Contact Form",
  fields: [
    { type: "text", label: "Full Name", name: "fullName", required: true },
    { type: "email", label: "Email", name: "email", required: true },
    { type: "textarea", label: "Message", name: "message", required: false },
  ],
};
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getZodSchema = (fields: any[]) =>
  z.object(
    fields.reduce((acc, field) => {
      const base =
        field.type === "email" ? z.string().email("Invalid email") : z.string();
      acc[field.name] = field.required
        ? base.min(1, "Required")
        : base.optional();
      return acc;
    }, {})
  );

// for later
export type AllFormSchema = ReturnType<typeof getZodSchema>;
