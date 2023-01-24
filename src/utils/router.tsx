import Router from "next/router";

export const routerPush = async (url: string, as?: string) => {
  Router.push(url, as);
};
