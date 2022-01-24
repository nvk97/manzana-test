import getUrl from "../../utils/getUrl";

const get = {
  url: getUrl("input.json"),
  options: {
    method: "GET",
  },
};
export { get };
