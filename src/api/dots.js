import { commonRequest } from "../utils/api/requestTypes";
import { get } from "../config/URLs/dots";

export const getDots = () => commonRequest(get);
