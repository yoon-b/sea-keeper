import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pageAtom = atom<string>({
  key: "page",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
