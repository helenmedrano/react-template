import buildStore from "core/builders/store";

import { reducers } from "./partitions";
import initState from "./initState";

export default function initStore() {
  const store = buildStore({ reducer: reducers });
  initState(store.dispatch);
  return store;
}
