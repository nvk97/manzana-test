import { commonRequest } from "../utils/requestTypes";
import { get } from "../config/URLs/dots";

export const getDots = () => commonRequest(get);
