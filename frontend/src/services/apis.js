// const BASE_URL = process.env.BASE_URL
const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CREATENOTES_API: BASE_URL + "/notes/createnote",
  GETNOTES_API: BASE_URL + "/notes/getnotes",
};

export const favouriteEndpoints = {
  //favouriteRoute Endpoints
  REMOVEFAVOURITE_API: BASE_URL + "/favourite/remove",
  ADDFAVOURITE_API: BASE_URL + "/favourite/add",
  GETFAVOURITE_API: BASE_URL + "/favourite/fetchItems",
  GETFAVOURITESTATUS_API: BASE_URL + "/favourite/fetchStatus",
};

export const storyEndpoints = {
  //storyRoute Endpoints
  GETSTORY_API: BASE_URL + "/story/getStories",
  ADDSTORY_API: BASE_URL + "/story/addStory",
};

export const unseenEndpoints = {
  //unseenRoute Endpoints
  GETUNSEEN_API: BASE_URL + "/unseen/getUnseen",
  ADDUNSEEN_API: BASE_URL + "/unseen/addUnseen",
};
