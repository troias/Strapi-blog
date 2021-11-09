export const formatImgUrl = (url) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}` + url;
};

export const capatalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
