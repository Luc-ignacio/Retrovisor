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

  try {
    const res = await locationRepo.getLocations();
    return {
      statusMessage: "Successfully retrieved locations",
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
