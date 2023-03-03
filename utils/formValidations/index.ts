import { validateCpf } from "./validateCpf";

export const isNotEmpty = (value: string): boolean => {
  return value !== "";
};

export const validateName = (name: string): boolean => {
  const regex = /(\w+\s)+/;

  return regex.test(name);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}/;

  return phoneRegex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  return emailRegex.test(email);
};

export const validateCpfData = (cpf: string): boolean => {
  const cpfRegex = cpf.replace(/\D/g, "");

  const rest = validateCpf(cpfRegex);

  return rest;
};
