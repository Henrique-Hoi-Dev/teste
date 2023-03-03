import { useState, useContext } from "react";
import { Filters } from "@/endpoints/fetchInvestmentFundPageData";
import { IoIosClose } from "react-icons/io";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { InvestmentFundContext } from "@/contexts/InvestmentFundContext";
import { Checkbox } from "@/components/Common/Checkbox";
import { FiltersMobile } from "./Mobile";
import styles from "./styles.module.scss";
interface Props {
  searchFilters: Array<Filters>;
}

type activeFilter = "category" | "innitalAplication" | "liquidation";

export function Filters({ searchFilters }: Props) {
  const { onFilterChange, filters } = useContext(InvestmentFundContext);

  const screenType = GetScreenType();
  const [activeFilter, setActiveFilter] = useState<string>("category");
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);

  const getFilterOptionsByCategory = () => {
    let options = {};

    searchFilters.forEach((filter) => {
      options = {
        ...options,
        [filter.key]: filter.options,
      };
    });

    return options;
  };

  const filtersOptionByCategory: { [key: string]: Filters["options"] } =
    getFilterOptionsByCategory();

  const onInvestorTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    code: number
  ) => {
    if (event.target.checked) onFilterChange("investorType", code);
    else onFilterChange("investorType", "");
  };

  const renderFilterButtons = () => (
    <div className={styles["filters__buttons"]}>
      {searchFilters.map((filter) => {
        if (filter.key === "investorTypes") return <> </>;

        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.key)}
            aria-pressed={activeFilter == filter.key}
          >
            {filter.title}
          </button>
        );
      })}
    </div>
  );

  const renderActiveFilterOptions = () => (
    <div className={styles["filters__column"]}>
      {filtersOptionByCategory[activeFilter]?.map((category) => {
        const isPressed = category.code === filters[activeFilter];

        return (
          <div key={category.code}>
            <button
              aria-pressed={isPressed}
              onClick={() => onFilterChange(activeFilter, category.code)}
            >
              {category.label}
            </button>
            {isPressed && (
              <IoIosClose onClick={() => onFilterChange(activeFilter, "")} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderInvestorTypeOptions = () => (
    <div className={styles["filters__investor-type"]}>
      <h5>Tipo de investidor</h5>
      {filtersOptionByCategory["investorTypes"]?.map((value, index) => (
        <Checkbox
          key={value.code}
          label={value.label}
          color={`${styles[`filters__investor-type__color-check${index + 1}`]}`}
          onChange={(event) => onInvestorTypeChange(event, value.code)}
          checked={value.code === filters["investorType"]}
        />
      ))}
    </div>
  );

  const renderDesktopFilters = () => (
    <div>
      {renderFilterButtons()}
      {renderActiveFilterOptions()}
      {renderInvestorTypeOptions()}
    </div>
  );

  return screenType !== "desktop" ? (
    <FiltersMobile
      isMenuOpen={isMenuMobileOpen}
      setIsMenuOpen={setIsMenuMobileOpen}
      renderActiveFilterOptions={renderActiveFilterOptions}
      renderFilterButtons={renderFilterButtons}
      renderInvestorTypeOptions={renderInvestorTypeOptions}
    />
  ) : (
    <div className={styles.filters}>{renderDesktopFilters()}</div>
  );
}
