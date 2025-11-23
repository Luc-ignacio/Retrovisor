import type { Location } from "@prisma/client";

export function useLocations() {
  const getLocations = async () => {
    const res = await $fetch(`/api/v1/locations`, {
      method: "GET",
    });
    return res;
  };

  const addLocation = async (locationData: Partial<Location>) => {
    const res = await $fetch(`/api/v1/locations`, {
      method: "POST",
      body: locationData,
    });
    return res;
  };

  const getLocationBySlug = async (slug: string) => {
    const res = await $fetch(`/api/v1/location/${slug}`, {
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
    addLocation,
    getLocationBySlug,
    // fetchRoleById,
    // updateRoleById,
  };
}
