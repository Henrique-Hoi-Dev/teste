import { onlyNumbers } from "./onlyNumbers";

export const createTelephoneHref = (input: string) => {
  return `tel:+55${onlyNumbers(input)}`;
};
