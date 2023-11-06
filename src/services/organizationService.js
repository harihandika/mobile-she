const byWorkLocationId = (queryParams) => ({
  method: "GET",
  url: "/organization/byWorkLocationId",
  queryParams,
});

export const organizationService = {
  byWorkLocationId,
};
