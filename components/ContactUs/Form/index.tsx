import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/Common/Form/Input";
import { Button } from "@/components/Common/Button";
import { TextArea } from "@/components/Common/Form/TextArea";
import { Modal } from "@/components/Common/Modal";
import { createContactUsForm } from "@/endpoints/creteContactUsForm";
import {
  isNotEmpty,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "@/utils/formValidations";
import styles from "./styles.module.scss";
import { StrapiImage as StrapiImageProps } from "@/interfaces/StrapiImage";
import { StrapiImage } from "@/components/Common/StrapiImage";

interface ContactUsFormProps {
  sectionTitle: string;
  title: string;
  labelNameInput: string;
  nameInputErrorMessage: string;
  emailLabel: string;
  emailErrorMessage: string;
  telephoneLabel: string;
  telephoneErrorMessage: string;
  messageLabel: string;
  labelSubmitButton: string;
  modal: {
    image: StrapiImageProps;
    title: string;
    description: string;
  };
}

export function ContactUsForm(props: ContactUsFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    message: false,
  });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitForm = async (ev: React.SyntheticEvent) => {
    try {
      ev.preventDefault();
      const isFormValid = validateForm(ev);

      const target = ev.target as typeof ev.target & {
        email: { value: string };
        phoneNumber: { value: string };
        name: { value: string };
        message: { value: string };
      };

      if (isFormValid) {
        await createContactUsForm({
          name: target.name.value,
          email: target.email.value,
          telephone: target.phoneNumber.value,
          message: target.message.value,
        });

        openModal();
      }
    } catch (err) {}
  };

  const validateForm = (ev: React.FormEvent) => {
    const inputs = ["name", "phoneNumber", "email", "message"];

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
        [name]: !isValidInput,
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
    phoneNumber: validatePhoneNumber,
    email: validateEmail,
    message: isNotEmpty,
  };

  useEffect(() => {
    const { email, name, phoneNumber } = errors;

    if (formRef.current) {
      const { current } = formRef;

      const inputValues = [
        current?.name?.value,
        current?.email?.value,
        current?.telephone?.value,
        current?.message?.value,
      ];

      if (inputValues.some((value) => value == "")) {
        setIsSubmitButtonDisabled(true);
      } else {
        setIsSubmitButtonDisabled(email || name || phoneNumber);
      }
    }
  }, [errors]);

  return (
    <section className={styles["contact-us-form-container"]}>
      <h2 className={styles["title"]}> {props.sectionTitle} </h2>
      <div className={styles["contact-us-form-container__divider"]}></div>
      <form
        ref={formRef}
        onSubmit={submitForm}
        className={styles["contact-us-form-container__form"]}
      >
        <strong className={styles["contact-us-form-container__form__subtitle"]}>
          {props.title}
        </strong>
        <Input
          name="name"
          label={props.labelNameInput}
          errorMessage={props.nameInputErrorMessage}
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
          label={props.emailLabel}
          errorMessage={props.emailErrorMessage}
        />
        <Input
          name="phoneNumber"
          mask="(99) 99999-9999"
          label={props.telephoneLabel}
          type="tel"
          id="phone"
          onBlur={onBlur}
          errorMessage={props.telephoneErrorMessage}
          error={errors["phoneNumber"]}
        />
        <TextArea
          name="message"
          label={props.messageLabel}
          onBlur={onBlur}
          error={errors["message"]}
          errorMessage={"Campo obrigatório"}
        />

        <Button
          buttonType="primary"
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          {props.labelSubmitButton}
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
          src={props?.modal?.image?.data?.attributes.url}
          alt={props?.modal?.image?.data?.attributes.alternativeText}
        />
        <strong> {props.modal?.title} </strong>
        <span>{props.modal?.description}</span>
      </Modal>
    </section>
  );
}
