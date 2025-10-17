export function useLocations() {
  const getLocations = async () => {
    const res = await $fetch(`/api/v1/locations`, {
      method: "GET",
    });
    return res;
  };

  const addLocation = async (locationData) => {
    const res = await $fetch(`/api/v1/locations`, {
      method: "POST",
      body: locationData,
    });
    return res;
  };

  // const fetchRoleById = async (roleId: string) => {
  //   const res = await $fetch(`/api/v1/roles/${roleId}`, {
  //     method: "GET",
  //   });

  //   return res;
  // };

  // const updateRoleById = async (roleId: string, updatedRole: object) => {
  //   const res = await $fetch(`/api/v1/roles/${roleId}`, {
  //     method: "PUT",
  //     body: updatedRole,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   return res;
  // };

  return {
    getLocations,
    addLocation,
    // fetchRoleById,
    // updateRoleById,
  };
}
