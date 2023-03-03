import React, { useEffect } from "react";
import { CloseIcon } from "@/icons/CloseIcon";
import { Button } from "../Button";
import styles from "./styles.module.scss";
import { ClickOutsideContainer } from "@/components/ClickOutsideContainer";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  bottomCloseButtonLabel?: string;
  label: string;
  className?: string;
  bodyClassName?: string;
  showCloseButton?: boolean;
  autoClose?: boolean;
}

const FADE_IN_DURATION = 300;

export function Modal({
  onClose,
  isOpen,
  bottomCloseButtonLabel,
  label,
  title,
  children,
  className,
  bodyClassName,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const fadeAnimation = (initialOpacity: number, finalOpacity: number) => {
    let keyframe = [{ opacity: initialOpacity }, { opacity: finalOpacity }];

    if (typeof modalRef?.current?.animate === "function")
      modalRef.current.animate(keyframe, {
        duration: FADE_IN_DURATION,
      });
  };

  const onModalClose = () => {
    fadeAnimation(1, 0);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (modalRef.current) {
      fadeAnimation(0, 1);
    }
  }, [isOpen]);

  return isOpen ? (
    <dialog
      open
      className={styles["modal__wrapper"]}
      aria-label={label}
      ref={modalRef}
    >
      <ClickOutsideContainer
        onClickOutside={onModalClose}
        className={`${styles["modal"]} ${className}`}
      >
        <header className={styles["modal__header"]}>
          {title}
          {showCloseButton && (
            <button
              className={styles["modal__close-button"]}
              onClick={onModalClose}
              aria-label="close-button"
            >
              <CloseIcon />
            </button>
          )}
        </header>
        <div className={`${styles["modal__body"]} ${bodyClassName}`}>
          {children}
        </div>
        <div className={styles["modal__footer"]}>
          {bottomCloseButtonLabel && (
            <Button onClick={onModalClose} buttonType="primary">
              {bottomCloseButtonLabel}
            </Button>
          )}
        </div>
      </ClickOutsideContainer>
    </dialog>
  ) : (
    <> </>
  );
}
