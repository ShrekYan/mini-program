import { v4 as uuidV4 } from "@lukeed/uuid";
import {PARAMS_CONFIG} from "./plugConfig";
// eslint-disable-next-line import/first


// import { v4 as uuidV4 } from "uuid";

interface IData {
  version: string;
  source: string;
  guid: string;
  userId: string;
  sessionId: string;
  busChannel: string;
  sysChannel: string;
  noUserId: Boolean;

  [props: string]: any;
}

export default ({data}: { data: IData }) => {
  //从缓存中获取用户信息
  // const user = userMiddle.getCacheUserInfo();
  // data.uuid = uuidV4().replace(/-/g, "");
  data.uuid = uuidV4().replace(/-/g, "");
  data.version = PARAMS_CONFIG.VERSION;
  data.source = PARAMS_CONFIG.SOURCE;
  // data.guid = purBasic.guid.getGuid();
  // if (user && !data.noUserId) {
  //   data.userId = data.userId ||  user.userId;
  //   data.sessionId = data.sessionId ||  user.sessionId;
  // }
};
