import DynamicForm from "../dynamicForm/DynamicForm";

const schema = {
  title: "Feedback",
  fields: [
    { type: "text", label: "Full Name", name: "fullName", required: true },
    { type: "email", label: "Email", name: "email", required: true },
    { type: "textarea", label: "Message", name: "message", required: false },
  ],
};

const DefaultForm = () => {
  return <DynamicForm schema={schema} />;
};

export default DefaultForm;
