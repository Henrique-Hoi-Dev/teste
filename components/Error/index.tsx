import React, { useState } from "react";
import { Button } from "@/components/Common/index";
import { useRouter } from "next/router";
import { LoadingIcon } from "@/icons/index";
import styles from "./styles.module.scss";

export function Error() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const reloadPage = () => {
    router.reload(window?.location?.pathname);

    setIsLoading(true);
  };

  return (
    <dialog open className={styles["modal__wrapper"]} aria-label="error-modal">
      <div className={styles["modal"]}>
        <header className={styles["modal__header"]}>
          Opa, detectamos um erro
        </header>
        <div className={styles["modal__body"]}>
          <p>Recarregue a página para voltar a visualizar o conteúdo.</p>
        </div>
        <div className={styles["modal__footer"]}>
          <Button onClick={reloadPage} buttonType="primary">
            Recarregar {isLoading && <LoadingIcon />}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
