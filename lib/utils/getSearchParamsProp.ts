import PageProps from "../types/PageProps";

export const getSearchParamsProp = (
  searchParams: PageProps["searchParams"],
  key: string,
) => {
  const pair = searchParams[key];
  return Array.isArray(pair) ? pair[0] : pair;
};
