export interface TodoItem {
  // computed
  stKey: number;
  etKey: number;
  //   gen
  id: string;
  key: string;
  diff: number;
  top: number;
  //   join
  day: string;
  stime: string;
  etime: string;
  site: string;
  //   custom
  color: string;
  area: string;
  category: string;
  // origin
  oCate: string[];
  oDay: string[];
  oSite: string[];
  oSt: string[];
  oEt: string[];
}

export interface Todo {
  id: string;
  text: string;
  wk: string;
  list: TodoItem[];
}

export interface TodoForm {
  category: string[];
  site: string[];
  day: string[];
  startTime: string[];
  endTime: string[];
}
