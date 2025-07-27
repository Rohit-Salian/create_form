import axios, { type AxiosRequestConfig, type Method } from "axios";

export type ApiClientParams<TRequest> = {
  url: string;
  method?: Method;
  data?: TRequest;
  headers?: Record<string, string>;
};

export type ApiClientResponse<TResponse> = {
  message?: string | null;
  data: TResponse | null;
  error: string | null;
};

const axiosClient = async <TRequest, TResponse>(
  params: ApiClientParams<TRequest>
): Promise<ApiClientResponse<TResponse>> => {
  const { url, method = "get", data, headers } = params;

  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    headers,
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  };

  try {
    const res = await axios<TResponse>(config);
    return { data: res.data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.message;

      return { data: null, error: message };
    }
    return { data: null, error: "Unexpected Error occurred" };
  }
};

export default axiosClient;
