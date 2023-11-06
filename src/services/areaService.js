const getDataDropdown = (queryParams) => ({
  method: "GET",
  url: "/area/getDataDropdown",
  queryParams,
});

export const areaService = {
  getDataDropdown,
};
