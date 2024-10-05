import { atom } from "recoil";
import { userAtom } from "./userAtom";

export const largeTextAtom = atom({
  key: "largeText",
  default: false,
  effects: [
    ({ setSelf, onSet, trigger, getPromise }) => {
      if (trigger === "get") {
        const savedValue = localStorage.getItem("largeText");
        if (savedValue !== null) {
          setSelf(savedValue === "true");
        } else {
          getPromise(userAtom).then((user) => {
            setSelf(user?.role !== "ADMIN");
          });
        }
      }

      onSet((newValue) => {
        localStorage.setItem("largeText", String(newValue));
      });
    },
  ],
});
