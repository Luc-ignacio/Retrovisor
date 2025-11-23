import { User } from "better-auth";
import LocationRepository from "~/server/repo/location";

const locationRepo = new LocationRepository();

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(
      event,
      createError({
        status: 401,
        statusMessage: "Unauthorised",
      })
    );
  }

  const user = event.context.user as User;

  const slug = getRouterParam(event, "slug");

  try {
    const res = await locationRepo.getLocationBySlug(user.id, slug);

    if (!res) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Location not found",
        })
      );
    }

    return {
      statusMessage: "Successfully retrieved location",
      data: res,
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { success: false, message: e.message || "Something went wrong" },
    });
  }
});
