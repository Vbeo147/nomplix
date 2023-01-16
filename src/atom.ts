import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "keyword",
  storage: localStorage,
});

export const keywordAtom = atom({
  key: "keyword",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
