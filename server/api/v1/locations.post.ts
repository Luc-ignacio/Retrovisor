import LocationRepository from "~/server/repo/location";
import { z } from "zod";
import { User } from "better-auth";

const locationRepo = new LocationRepository();

const locationSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(1000, {
      message: "Descriptions cannot be longer than 1000 characters",
    }),
  lat: z.number("Latitude is required").min(-90).max(90),
  long: z.number("Longitude is required").min(-180).max(180),
});

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

  const parsed = await readValidatedBody(event, locationSchema.safeParse);

  if (!parsed.success) {
    return sendError(
      event,
      createError({
        status: 422,
        statusMessage: "Invalid body on Add Location",
      })
    );
  }

  const user = event.context.user as User;

  const locationData = {
    ...parsed.data,
    slug: parsed.data.name.replaceAll(" ", "-").toLowerCase(),
    userId: user.id,
  };

  try {
    const res = await locationRepo.addLocation(locationData);

    return {
      statusMessage: "Successfully added location",
      data: res,
    };
  } catch (e) {
    const error = e as Error;

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        success: false,
        message: error.message || "Something went wrong",
      },
    });
  }
});
