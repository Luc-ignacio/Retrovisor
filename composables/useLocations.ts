export function useLocations() {
  const getLocations = async () => {
    const res = await $fetch(`/api/v1/locations`, {
      method: "GET",
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
    // fetchRoleById,
    // updateRoleById,
  };
}
