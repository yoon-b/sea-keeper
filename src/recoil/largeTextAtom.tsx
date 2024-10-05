import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const largeTextAtom = atom<boolean>({
  key: "isLargeTextMode",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
