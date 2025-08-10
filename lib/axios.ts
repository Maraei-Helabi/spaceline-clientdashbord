import axios from "axios";
import { getSession } from "next-auth/react";
import { getLocale } from "next-intl/server";
import qs from "qs";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: (params) => {
    if (params?.search) params.search = encodeURIComponent(params.search);
    return qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    });
  },
});

http.interceptors.request.use(async (request) => {
  let locale: string = "ar";
  
  const session = await getSession()

  if (typeof window !== "undefined") {
    const cookieLocale =
      document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1] ?? "ar";

    locale = cookieLocale;
  } else {
    locale = await getLocale();
  }

  request.headers["locale"] = locale;
  if (session?.user.refreshToken)
    request.headers["authorization"] = `Bearer ${session.user.token}`;

  return request;
});

export { http };
