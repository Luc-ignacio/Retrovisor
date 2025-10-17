import LocationRepository from "~/server/repo/location";
import { z } from "zod";
import { User } from "better-auth";
import slugify from "slug";
import { customAlphabet } from "nanoid";

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

  const nanoId = customAlphabet("123456789acbdefghijklmnopqrstuvwxyz", 5);

  const user = event.context.user as User;

  // Create unique slug
  let slug = slugify(parsed.data.name);

  let existing = !!(await locationRepo.getLocationBySlug(slug));

  while (existing) {
    const generatedId = nanoId();
    const modifiedSlug = `${slug}-${generatedId}`;

    existing = !!(await locationRepo.getLocationBySlug(modifiedSlug));

    if (!existing) {
      slug = modifiedSlug;
    }
  }

  const locationData = {
    ...parsed.data,
    slug: slug,
    userId: user.id,
  };

  try {
    const res = await locationRepo.addLocation(locationData);

    return {
      statusMessage: "Successfully added locations",
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
