import { useContext } from "react";
import { Filters } from "@/endpoints/fetchInvestmentFundPageData";
import { BsPlusCircle } from "react-icons/bs";
import { Stars } from "@/icons/index";
import { TableColumn } from "../TableColumn";
import { Loader } from "@/components/Common/Loader";
import { InvestmentFundContext } from "@/contexts/InvestmentFundContext";
import { getCurrentYear } from "@/utils/date/getCurrentYear";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import styles from "./styles.module.scss";
interface Props {
  filters: Filters;
  resultsLength: number;
}

export function Table({ filters, resultsLength }: Props) {
  const screenType = GetScreenType();

  const {
    onFetchNextPage,
    loadingNextPage,
    loading,
    fundsListing,
    hasMoreResultsToShow,
  } = useContext(InvestmentFundContext);

  const renderNextPageLoader = () => (loadingNextPage ? <Loader /> : <> </>);

  const renderShowMoreFundsButton = () =>
    !loading && !loadingNextPage && hasMoreResultsToShow ? (
      <BsPlusCircle onClick={onFetchNextPage} />
    ) : (
      <> </>
    );

  return (
    <table className={styles["public-offers-table"]}>
      {screenType === "desktop" && (
        <thead>
          <tr>
            <th rowSpan={2} className={styles["public-offers-table__row"]}>
              <h4>
                Fundos <Stars />
              </h4>
              <strong>{resultsLength || 0} resultados</strong>
            </th>
            <th rowSpan={2}>Aplicação mínima</th>
            <th rowSpan={2}>Taxa adm. (info sobre)</th>
            <th
              align="center"
              colSpan={4}
              className={styles["public-offers-table__row2"]}
            >
              Rentabilidade (%)
            </th>
            <th rowSpan={2}></th>
          </tr>
          <tr>
            <th>CDI 2021</th>
            <th align="center">Ano {getCurrentYear() - 1} </th>
            <th align="center">Mês</th>
            <th rowSpan={2}>12 meses</th>
          </tr>
        </thead>
      )}

      <tbody>
        {loading ? (
          <tr className={styles["loader-container"]}>
            <th colSpan={8}>
              <div>
                <Loader />
              </div>
            </th>
          </tr>
        ) : (
          fundsListing.map((item, index) => (
            <TableColumn key={item.fundCod + 1} {...item} filters={filters} />
          ))
        )}
        {screenType === "desktop" ? (
          <tr>
            <th colSpan={8} align="center">
              <div className={styles["public-offers-table__row2__plus"]}>
                {renderNextPageLoader()}
                {renderShowMoreFundsButton()}
              </div>
            </th>
          </tr>
        ) : (
          <div className={styles["public-offers-table__row2__plus"]}>
            {renderNextPageLoader()}
            {renderShowMoreFundsButton()}
          </div>
        )}
      </tbody>
    </table>
  );
}
