import prisma from "~/server/lib/prisma";

export default class LocationRepository {
  async getLocations() {
    return await prisma.location.findMany();
  }

  // async queryById(roleId: string | undefined) {
  //   return await prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //     },
  //     include: {
  //       RolePage: {
  //         include: {
  //           Page: true,
  //         },
  //         orderBy: {
  //           Page: {
  //             id: "asc",
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // async updateRole(roleId: string | undefined, updatedRole: object) {
  //   return await prisma.role.update({
  //     where: {
  //       id: roleId,
  //     },
  //     data: {
  //       title: updatedRole.title,
  //     },
  //   });
  // }
}
