import React from "react";
import { CloseIcon } from "@/icons/index";
import { BsFilter } from "react-icons/bs";
import { Button } from "@/components/Common";
import styles from "./styles.module.scss";

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderFilterButtons: () => React.ReactNode;
  renderActiveFilterOptions: () => React.ReactNode;
  renderInvestorTypeOptions: () => React.ReactNode;
}

export function FiltersMobile({
  isMenuOpen,
  setIsMenuOpen,
  renderFilterButtons,
  renderActiveFilterOptions,
  renderInvestorTypeOptions,
}: Props) {
  const closeMenuMobile = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {!isMenuOpen && <BsFilter onClick={() => setIsMenuOpen(true)} />}
      <div className={styles["filters-mobile"]} aria-hidden={!isMenuOpen}>
        <header>
          <strong>Filtros</strong>
          <CloseIcon
            className={styles["filters-mobile__close"]}
            onClick={closeMenuMobile}
          />
        </header>
        <section className={styles["filters-mobile__body"]}>
          <strong>Filtrar por :</strong>
          {renderFilterButtons()}
          {renderActiveFilterOptions()}
          {renderInvestorTypeOptions()}
        </section>
        <footer>
          <Button onClick={closeMenuMobile} buttonType="primary">
            Salvar
          </Button>
        </footer>
      </div>
    </>
  );
}
