import { useFetchByFormId } from "../../api/fetchForms/fetchByFormId";

const ListSubmissionsById = () => {
  const formID = "feedback_form";
  const { data, isPending } = useFetchByFormId(formID);
  console.log(data);

  return (
    <div>
      {data?.data?.map((x) => (
        <div key={x._id}>{(x.formId, x.createdAt)}</div>
      ))}
    </div>
  );
};

export default ListSubmissionsById;
