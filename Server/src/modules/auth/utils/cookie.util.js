import env from "../../../config/env.js";

export const setCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: maxAge,
});
