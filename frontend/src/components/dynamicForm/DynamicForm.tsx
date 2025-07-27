import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Box } from "@mui/material";
import { getZodSchema } from "../defaultForm/defaultFormSchema";
import {
  usePostForm,
  type FormDataOptions,
} from "../../api/postForm/postFormApiHook";
import type { JSX } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "textarea";
  required: boolean;
};

type Schema = {
  title: string;
  fields: Field[];
};

type DynamicFormProps = {
  schema: Schema;
};

const DynamicForm = ({ schema }: DynamicFormProps): JSX.Element => {
  const zodSchema = getZodSchema(schema.fields);

  const { mutate, isPending, isSuccess, data } = usePostForm();
  console.log(data);
  console.log(isSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // console.log("Submitted:", data);
    const options: FormDataOptions = {
      formId: schema.title.trim().toLowerCase(),
      data,
    };
    mutate(options);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 500, mx: "auto", mt: 4 }}
      // for netlify
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <Typography variant="h4" gutterBottom>
        {`${schema.title} Form`}
      </Typography>

      {schema.fields.map((field) => (
        <Box key={field.name} mb={2}>
          <TextField
            fullWidth
            multiline={field.type === "textarea"}
            rows={field.type === "textarea" ? 4 : 1}
            label={field.label}
            {...register(field.name)}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
          />
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        loading={isPending}
      >
        Submit
      </Button>
    </Box>
  );
};

export default DynamicForm;
