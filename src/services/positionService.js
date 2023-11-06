const byWorkLocationId = (queryParams) => ({
  method: "GET",
  url: "/position/byWorkLocationId",
  queryParams,
});

export const positionService = {
  byWorkLocationId,
};
