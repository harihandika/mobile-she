const uploadImage = (formData) => ({
  method: "POST",
  url: "/greenCard/uploadImage",
  headers: { "Content-Type": "multipart/form-data" },
  payload: formData,
});

const createData = (payload) => ({
  method: "POST",
  url: "/greenCard",
  payload,
});

const getSubmitted = () => ({
  method: "GET",
  url: "/greenCard/getSubmitted",
});

const getOnProcess = () => ({
  method: "GET",
  url: "/greenCard/getOnProcess",
});

const getPicAssignment = () => ({
  method: "GET",
  url: "/greenCard/getPicAssignment",
});

const getDetail = (queryParams) => ({
  method: "GET",
  url: "/greenCard/getDetail",
  queryParams,
});

const updatePicReceive = (queryParams) => ({
  method: "PUT",
  url: "/greenCard/updatePicReceive",
  queryParams,
});

const picUpdateProgress = (queryParams, payload) => ({
  method: "PUT",
  url: "/greenCard/picUpdateProgress",
  queryParams,
  payload,
});

const getClosed = () => ({
  method: "GET",
  url: "/greenCard/getClosed",
});

const getRejectedMobile = () => ({
  method: "GET",
  url: "/greenCard/getRejectedMobile",
});

export const greenCardService = {
  uploadImage,
  createData,
  getSubmitted,
  getOnProcess,
  getPicAssignment,
  getDetail,
  updatePicReceive,
  picUpdateProgress,
  getClosed,
  getRejectedMobile,
};
