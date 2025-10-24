export function useSearch() {
  const searchLocations = async (query: Record<string, string>) => {
    const res = await $fetch(`/api/v1/search`, {
      method: "GET",
      query,
    });
    return res;
  };

  return {
    searchLocations,
  };
}
