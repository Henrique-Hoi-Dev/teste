import React, { useState } from "react";
import { NavArrowDown } from "@/icons/NavArrowDown";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Button } from "@/components/Common/Button";
import { Filters } from "@/endpoints/fetchInvestmentFundPageData";
import { fund } from "@/interfaces/Fund";
import { FundRiskIndicator } from "./FundRiskIndicator";
import { FundTypeIndicator } from "./FundTypeIndicator";
import { formatDate } from "@/utils/date/formatDate";
import { formatCnpj } from "@/utils/formatCnpj";
import { Link } from "@/components/Common";
import { getCurrentYear } from "@/utils/date/getCurrentYear";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import styles from "./styles.module.scss";

interface TableColumnProps extends fund {
  filters: Filters;
}

export function TableColumn({
  name,
  anbimaRatingDescription,
  suitability,
  investmentFundValues,
  investmentFundFees,
  fundRentability,
  investmentFundProfile,
  investmentFundConfig,
  document,
  lastQuota,
  visibleFiles,
}: TableColumnProps) {
  const [isShown, setIsShown] = useState(false);

  const screenType = GetScreenType();

  function handleToggleIsShown() {
    setIsShown((oldState) => !oldState);
  }

  const fundRentabilityMonth = fundRentability?.currentMonthRentability
    ? `${fundRentability.currentMonthRentability.toFixed(2)}%`
    : "-";
  const fundRentabilityYear = fundRentability?.yearRentability
    ? `${fundRentability.yearRentability.toFixed(2)}%`
    : "-";
  const fundTwelveMonthRentability = fundRentability?.twelveMonthRentability
    ? `${fundRentability.twelveMonthRentability.toFixed(2)}%`
    : "-";

  const materialsUrl = visibleFiles.map((file) => {
    return (
      {
        id: file.fileId,
        label: file.fileTypeDescription,
        documentUrl:
          file.fileType === 1
            ? `https://corretora.miraeasset.com.br/documentos/fundos/Novos%20arquivos/Regulamento/Regulamento_${file.document}.pdf`
            : `https://corretora.miraeasset.com.br/documentos/fundos/Novos%20arquivos/Divulgacao/Divulgacao_${file.document}.pdf`,
      } || []
    );
  });

  const renderDescription = () => (
    <tr className={styles["funds-table-row__row"]}>
      {screenType !== "desktop" ? (
        renderDescriptionContent()
      ) : (
        <th colSpan={8}> {renderDescriptionContent()} </th>
      )}
    </tr>
  );

  const renderDescriptionContent = () => (
    <>
      <div className={styles["funds-table-row__row__column"]}>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>CNPJ</h4>
          <h5> {formatCnpj(String(document))} </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Data da Cota</h4>
          <h5>
            {lastQuota?.updatedAt ? formatDate(lastQuota?.updatedAt) : "-"}{" "}
          </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Patrimônio Líquido</h4>
          <h5>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(lastQuota?.netWorth)}
          </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Resgate - Liquidação financeira</h4>
          <h5>
            D+{investmentFundConfig.redemptionSettlementDays} (
            {investmentFundConfig.deadlineRedemptionPaymentDescription}) após
            cotização
          </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Classificação CVM</h4>
          <h5>{investmentFundProfile?.cvmClassDescription} </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Perfil</h4>
          <h5> {investmentFundProfile?.suitabilityDescription}</h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Cota</h4>
          <h5> {lastQuota?.quotaValue || "-"} </h5>
        </div>
        <div className={styles["funds-table-row__row__column__item"]}>
          <h4>Taxa de Perf. (%)</h4>
          <h5>
            {!investmentFundFees?.chargePerformanceFee
              ? "-"
              : `${investmentFundFees.performanceFeeValue}%`}
          </h5>
        </div>
      </div>
      <div className={styles["funds-table-row__row__column__documents"]}>
        <div
          className={
            styles["funds-table-row__row__column__documents__download-buttons"]
          }
        >
          {materialsUrl.length > 0 &&
            materialsUrl.map((file) => (
              <a
                key={file.id}
                href={file?.documentUrl}
                target="_blank"
                rel="noreferrer"
              >
                {file?.label}

                <AiOutlineCloudDownload />
              </a>
            ))}
        </div>

        <Link
          variant="contained"
          href="https://corretora.miraeasset.com.br/Home/Login"
          target="_blank"
        >
          Investir
        </Link>
      </div>
      {screenType !== "desktop" && (
        <div className={styles["funds-table-row__row2__title__button"]}>
          <NavArrowDown
            aria-pressed={isShown}
            onClick={handleToggleIsShown}
            className={styles["icon-wrapper"]}
          />
        </div>
      )}
    </>
  );

  return (
    <>
      {screenType !== "desktop" ? (
        <tr className={styles["funds-table-row__row2__mobile"]}>
          <FundRiskIndicator
            suitability={suitability}
            mobile={screenType == "mobile"}
          >
            <div
              className={styles["funds-table-row__row2__title__description"]}
            >
              <h4>{name}</h4>
              <strong>{anbimaRatingDescription}</strong>
              <FundTypeIndicator
                fundOpen={true || investmentFundConfig?.openCapture}
                fundOpeningDate={investmentFundConfig?.openingCapture}
                qualifiedInvestor={investmentFundProfile?.qualifiedInvestor}
              />
            </div>
          </FundRiskIndicator>
          <div className={styles["funds-table-row__row2__title__grid"]}>
            <div>
              <h5>Aplicação mínima</h5>
              <strong>{investmentFundValues?.minApplication || "-"}</strong>
            </div>
            <div>
              <h5>Taxa adm (%a.a)</h5>
              <strong>{investmentFundFees.administrationFeeValue}%</strong>
            </div>
            <div>
              <h5>CDI 2021</h5>
              <strong>13,65%</strong>
            </div>
            <div>
              <h5>Rent. ano {getCurrentYear() - 1}</h5>
              <strong> {fundRentabilityYear} </strong>
            </div>
            <div>
              <h5>Rent. mês</h5>
              <strong>{fundRentabilityMonth}</strong>
            </div>
            <div>
              <h5>Rent. 12 meses</h5>
              <strong>{fundTwelveMonthRentability}</strong>
            </div>
          </div>
          {!isShown && (
            <td className={styles["funds-table-row__row2__title__button"]}>
              <NavArrowDown
                aria-pressed={isShown}
                onClick={handleToggleIsShown}
                className={styles["icon-wrapper"]}
              />
            </td>
          )}
        </tr>
      ) : (
        <tr className={styles["funds-table-row__row2"]}>
          <FundRiskIndicator suitability={suitability} mobile={true}>
            <div>
              <h4>{name}</h4>
              <strong>{anbimaRatingDescription}</strong>
            </div>
            <FundTypeIndicator
              fundOpen={investmentFundConfig?.openCapture}
              fundOpeningDate={investmentFundConfig?.openingCapture}
              qualifiedInvestor={investmentFundProfile?.qualifiedInvestor}
            />
          </FundRiskIndicator>
          <th>{investmentFundValues?.minApplication || "-"}</th>
          <th>{investmentFundFees.administrationFeeValue}%</th>
          <th>13,65%</th>
          <th>{fundRentabilityYear}</th>
          <th>{fundRentabilityMonth}</th>
          <th>{fundTwelveMonthRentability}</th>
          <th>
            <NavArrowDown
              aria-pressed={isShown}
              onClick={handleToggleIsShown}
              className={styles["icon-wrapper"]}
            />
          </th>
        </tr>
      )}

      {isShown ? renderDescription() : ""}
    </>
  );
}
