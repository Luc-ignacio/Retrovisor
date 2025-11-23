import prisma from "~/server/lib/prisma";

export default class LocationRepository {
  async getLocations(userId: string) {
    return await prisma.location.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getLocationBySlug(userId: string, slug: string) {
    return await prisma.location.findFirst({
      where: {
        userId: userId,
        slug: slug,
      },
      include: {
        LocationLog: true,
      },
    });
  }

  async addLocation(locationData: {
    name: string;
    description: string;
    lat: number;
    long: number;
    slug: string;
    userId: string;
  }) {
    return await prisma.location.create({
      data: locationData,
    });
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
