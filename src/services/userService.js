const login = (payload) => ({
  method: "POST",
  url: "/user/login",
  payload,
});

const checkEmailExist = (queryParams) => ({
  method: "GET",
  url: "/user/checkEmailExist",
  queryParams,
});

const getDataDropdown = () => ({
  method: "GET",
  url: "/user/getDataDropdown",
});

const selfUpdateData = (queryParams, payload) => ({
  method: "PUT",
  url: "/user/selfUpdateData",
  queryParams,
  payload,
});

const changePassword = (queryParams, payload) => ({
  method: "PUT",
  url: "/user/changePassword",
  queryParams,
  payload,
});

export const userService = {
  login,
  checkEmailExist,
  getDataDropdown,
  selfUpdateData,
  changePassword,
};
