export default defineCachedEventHandler(
  async (event) => {
    if (!event.context.user) {
      return sendError(
        event,
        createError({
          status: 401,
          statusMessage: "Unauthorised",
        })
      );
    }

    const { q } = getQuery(event);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json`,
        {
          signal: AbortSignal.timeout(5000),
          headers: {
            "User-Agent": "retrovisor",
          },
        }
      );

      if (!res.ok) {
        return sendError(
          event,
          createError({
            status: 504,
            statusMessage: "Unable to reach Search API",
          })
        );
      }

      return res.json();
    } catch (e) {
      return sendError(
        event,
        createError({
          status: 500,
          statusMessage: "Something went wrong",
        })
      );
    }
  },
  {
    maxAge: 60 * 60 * 24,
    name: "search-nominatim",
    getKey: (event) => {
      const { q } = getQuery(event);
      return q?.toString() || "";
    },
  }
);
