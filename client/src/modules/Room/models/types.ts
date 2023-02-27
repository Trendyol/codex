import { ActionTypes } from "./enum";

export type Action = {
  key: ActionTypes;
  data: any;
};
