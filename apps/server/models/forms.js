import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  // TODO something could be incorrect

  formId: { type: String, required: true, index: true },
  title: String,
  description: String,
  fields: Array,
});

const Form = mongoose.model("Form", formSchema);

export default Form;
