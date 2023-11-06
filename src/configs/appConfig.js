const apiUrl = process.env.API_URL || "";
const jwtSecretKey = process.env.JWT_SECRET_KEY || "";
const xAccessToken = process.env.X_ACCESS_TOKEN || "";

export const config =
  process.env.NODE_ENV === "development"
    ? {
        nodeEnv: "development",
        apiUrl,
        jwtSecretKey,
        xAccessToken,
        appPlatform: "Mobile",
      }
    : {
        nodeEnv: "production",
        apiUrl,
        jwtSecretKey,
        xAccessToken,
        appPlatform: "Mobile",
      };
