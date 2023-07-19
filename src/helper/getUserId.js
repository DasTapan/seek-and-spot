import { v4 as uuidv4 } from "uuid";

function setCookie(userID) {
  document.cookie = `userID=${userID}; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([\\.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const doesCookieExist = (name) => getCookie(name);

export default function getUserId() {
  const userID = doesCookieExist("userID");
  if (!userID) {
    const newUserID = uuidv4();
    console.log("not exist, new created", newUserID);
    setCookie(newUserID);
    return newUserID;
  } else {
    console.log("already exist");
    return userID;
  }
}
