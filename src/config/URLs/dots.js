import getUrl from "../../utils/api/getUrl";

const get = {
  url: getUrl("input.json"),
  options: {
    method: "GET",
  },
};
export { get };
