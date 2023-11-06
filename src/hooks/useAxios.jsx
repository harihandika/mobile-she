import { useState, useEffect } from "react";
import { useToast } from "native-base";
import { axiosInstance } from "../apis";
import { config } from "../configs";
import { SuccessToast, ErrorToast } from "../components";

const useAxios = (showMessage = false) => {
  const toast = useToast();
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObject) => {
    const {
      method,
      url,
      queryParams = {},
      payload = {},
      headers = {},
    } = configObject;

    try {
      setLoading(true);
      setIsSuccess(false);
      setIsError(false);
      const ctrl = new AbortController();
      setController(ctrl);

      const axios = await axiosInstance(queryParams, headers);
      const res = await axios[method.toLowerCase()](url, payload);

      const resData = await res?.data[0];
      const resMessage = await res?.data[0]?.message;

      setResponse(resData);
      setIsSuccess(true);
      setIsError(false);
      setError({});

      if (showMessage)
        toast.show({
          placement: "top",
          render: () => <SuccessToast message={resMessage} />,
        });
      if (config.nodeEnv === "development")
        console.log(`[Response ${method.toUpperCase()}] =>`, resData);
    } catch (err) {
      const errData = await err?.response?.data[0];
      const errMessage = await err?.response?.data[0]?.message;
      setResponse({});
      setIsSuccess(false);
      setIsError(true);
      setError(errData);

      if (showMessage)
        if (showMessage)
          toast.show({
            placement: "top",
            render: () => <ErrorToast message={errMessage} />,
          });
      if (config.nodeEnv === "development")
        console.error(`[Error ${method.toUpperCase()}] =>`, errData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return {
    axiosFetch,
    loading,
    response,
    isSuccess,
    error,
    isError,
    controller,
  };
};

export default useAxios;
