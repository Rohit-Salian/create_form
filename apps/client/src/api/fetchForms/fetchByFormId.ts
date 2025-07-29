import { useQuery } from "@tanstack/react-query";
import axiosClient from "../apiUtils/axiosClient";
import { API_URL } from "../../common/constant";

export const useFetchByFormId = (formId: string) => {
  return useQuery({
    queryKey: ["form-submission", formId],
    queryFn: () =>
      axiosClient({
        url: `${API_URL.FORM_SUBMIT}/${formId}`,
        method: "get",
      }).then((res) => {
        if (res.error) throw new Error(res.error);
        return res.data!;
      }),
    enabled: !!formId,
  });
};
