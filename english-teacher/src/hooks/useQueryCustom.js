import { useQuery } from "@tanstack/react-query";

export const useQueryCustom = (thunk, callbackApi) => {
  const { isLoading, isError, isSuccess, status, data, error, refetch } = useQuery(
    [thunk],
    callbackApi,
    {
      cacheTime: Infinity,
      staleTime: 40000,
    }
  );
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    status,
    error,
    refetch: refetch
  };
}