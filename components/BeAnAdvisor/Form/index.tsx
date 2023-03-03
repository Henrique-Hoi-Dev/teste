import React, { useState } from "react";
import { Input } from "@/components/Common/Form/Input";
import { Button } from "@/components/Common/Button";
import { TextArea } from "@/components/Common/Form/TextArea";
import { Modal } from "@/components/Common/Modal";
import { creteBeAnAdvisorForm } from "@/endpoints/creteBeAnAdvisorForm";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  validateCpfData
} from "@/utils/formValidations";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Form } from "@/endpoints/fetchBeAnAdvisorData";

import styles from "./styles.module.scss";

export function BeAnAdvisorForm(props: Form) {
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    cpf: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitForm = async (ev: React.SyntheticEvent) => {
    try {
      ev.preventDefault();
      const isFormValid = validateForm(ev);

      const target = ev.target as typeof ev.target & {
        email: { value: string };
        phone: { value: string };
        name: { value: string };
        cpf: { value: string };
        companyName: { value: string };
        message: { value: string };
        experienceInAdvisor: HTMLInputElement[];
      };

      const experienceInAdvisorSelectedItems = [] as string[];

      target.experienceInAdvisor.forEach((item: HTMLInputElement) => {
        item.checked && experienceInAdvisorSelectedItems.push(item.value);
      });

      if (isFormValid) {
        await creteBeAnAdvisorForm({
          name: target.name.value,
          email: target.email.value,
          phone: target.phone.value,
          cpf: target.cpf.value,
          companyName: target.companyName.value,
          message: target.message.value,
          experienceInAdvisor: experienceInAdvisorSelectedItems.toString()
        });

        openModal();
      }
    } catch (err) {}
  };

  const validateForm = (ev: React.FormEvent) => {
    const inputs = ["name", "phone", "email", "cpf"];

    inputs.forEach((input) => validateInput(input, ev.target[input].value));

    return Object.keys(errors).every((key) => errors[key] === false);
  };

  const onBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(ev.target.name, ev.target.value);
  };

  const validateInput = (name: string, value: string) => {
    const validationFunction = fieldFunctionValidation[name];

    const isValidInput = validationFunction(value);

    setErrors((prevState) => {
      return {
        ...prevState,
        [name]: !isValidInput
      };
    });
  };

  const openModal = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const fieldFunctionValidation = {
    name: validateName,
    phone: validatePhoneNumber,
    email: validateEmail,
    cpf: validateCpfData
  };

  return (
    <section className={styles["be-an-advisor-form-container"]}>
      <form
        onSubmit={submitForm}
        className={styles["be-an-advisor-form-container__form"]}
      >
        <strong
          className={styles["be-an-advisor-form-container__form__subtitle"]}
        >
          {props.title.toUpperCase()}
        </strong>
        <Input
          name="name"
          label={props.labelFullName}
          errorMessage={props.errorMessageFullName}
          type="text"
          id="name"
          onBlur={onBlur}
          error={errors["name"]}
        />
        <Input
          name="email"
          type="email"
          id="email"
          onBlur={onBlur}
          error={errors["email"]}
          label={props.labelEmail}
          errorMessage={props.errorMessageEmail}
        />
        <div className={styles["be-an-advisor-form-container__form__inputs"]}>
          <Input
            name="cpf"
            mask="999.999.999-99"
            type="text"
            id="cpf"
            onBlur={onBlur}
            error={errors["cpf"]}
            label={props.labelCPF}
            errorMessage={props.errorMessageCPF}
            className={`${styles["inputCPF"]}`}
          />
          <Input
            name="phone"
            mask="(99) 99999-9999"
            label={props.labelPhone}
            type="tel"
            id="phone"
            onBlur={onBlur}
            errorMessage={props.errorMessagePhone}
            error={errors["phone"]}
            className={`${styles["inputPhone"]}`}
          />
        </div>
        <Input
          name="companyName"
          label={props.labelCompanyName}
          type="text"
          id="companyName"
        />
        <div
          className={
            styles["be-an-advisor-form-container__checkbox-outer-container"]
          }
        >
          <label className={styles["label-text"]}>
            {props.labelExperienceInAdvisor}
          </label>
          {props.select.map(({ id, label, value }) => {
            return (
              <div
                key={id}
                className={
                  styles[
                    "be-an-advisor-form-container__checkbox-inner-container"
                  ]
                }
              >
                <input
                  key={id}
                  id="experienceInAdvisor"
                  type="checkbox"
                  name={label}
                  value={value}
                />
                <label>{label}</label>
              </div>
            );
          })}
        </div>

        <TextArea name="message" label="Campo de mensagem (opcional)" />
        <Button buttonType="primary" type="submit" beAnAdvisorForm>
          {props.labelButton}
        </Button>
      </form>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        showCloseButton={false}
        bodyClassName={styles["success-message-modal"]}
        label="success-modal"
      >
        <StrapiImage
          src={props?.modal?.icon?.data?.attributes.url}
          alt={props?.modal?.icon?.data?.attributes.alternativeText}
        />
        <strong> {props.modal?.title} </strong>
        <span>{props.modal?.description}</span>
      </Modal>
    </section>
  );
}
