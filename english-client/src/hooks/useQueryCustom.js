import { useQuery } from "@tanstack/react-query";

function useQueryCustom(thunk, callbackApi, option = {}) {
  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
    [thunk],
    callbackApi,
    {
      cacheTime: Infinity,
      staleTime: 40000,
      ...option,
    }
  );
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    refetch: refetch,
  };
}

export default useQueryCustom;
