const getDataToday = (queryParams) => ({
  method: "GET",
  url: "/fatigue/getDataToday",
  queryParams,
});

const submitData = (queryParams, payload) => ({
  method: "PUT",
  url: "/fatigue/submitData",
  queryParams,
  payload,
});

const getDataApproval = (queryParams) => ({
  method: "GET",
  url: "/fatigue/getDataApproval",
  queryParams,
});

const getApprovalDetail = (queryParams) => ({
  method: "GET",
  url: "/fatigue/getApprovalDetail",
  queryParams,
});

const approval = (queryParams, payload) => ({
  method: "PUT",
  url: "/fatigue/approval",
  queryParams,
  payload,
});

const getDataAllowed = () => ({
  method: "GET",
  url: "/fatigue/getDataAllowed",
});

const getSelfData = () => ({
  method: "GET",
  url: "/fatigue/getSelfData",
});

export const fatigueService = {
  getDataToday,
  submitData,
  getDataApproval,
  getApprovalDetail,
  approval,
  getDataAllowed,
  getSelfData,
};
