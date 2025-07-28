import { useMutation } from "@tanstack/react-query";
import axiosClient from "../apiUtils/axiosClient";
import { API_URL } from "../../common/constant";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type FormDataOptions = {
  formId: string;
  data: FormData;
};

type FormResponse = {
  message: string;
  id: string;
};

export const usePostForm = () => {
  return useMutation({
    mutationFn: (data: FormDataOptions) =>
      axiosClient<FormDataOptions, FormResponse>({
        url: API_URL.FORM_SUBMIT,
        method: "post",
        data,
      }).then((res) => {
        if (res.error) throw new Error(res.error);
        return res.data!;
      }),
  });
};
