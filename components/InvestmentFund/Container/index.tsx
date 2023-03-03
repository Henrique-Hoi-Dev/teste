import React, { useState, useContext } from "react";
import Head from "next/head";
import { InvestmentFundPageData } from "@/endpoints/index";
import { CardVideo } from "@/components/Common/CardVideo";
import { Banner } from "@/components/Banner";
import { SearchInput } from "@/components/Common/SearchInput";
import { Stars, Hexagon, ClosedBox } from "@/icons/index";
import { Table } from "@/components/InvestmentFund/Table";
import { Filters } from "@/components/InvestmentFund/Filters";
import { Chart } from "@/components/InvestmentFund/Chart";
import { isMobile } from "@/utils/hooks/isMobile";
import Box from "@/components/Common/Box";
import styles from "@/styles/investmentFund.module.scss";
import { UseDebounce } from "@/utils/hooks/useDebounce";
import { InvestmentFundContext } from "contexts/InvestmentFundContext";
import { GetScreenType } from "@/utils/hooks/getScreenType";

type InvestmentFundPageDataProps = InvestmentFundPageData["data"]["attributes"];

interface Props extends InvestmentFundPageDataProps {}

export function Container(props: Props) {
  const { banner, cardVideo, filters, graphic, profitabilityLabel } = props;

  const screenType = GetScreenType();

  const { onSearch, funds } = useContext(InvestmentFundContext);
  const [, setSearchQuery] = UseDebounce({
    onDebounce: onSearch,
  });

  return (
    <>
      <Head>
        <title> Mirae | Fundos de investimento</title>
        <meta name="description" content="Mirae Assets" />
      </Head>
      <Banner {...banner} />

      <section className={styles["investment-fund-section"]}>
        <div className={styles["investment-fund-section__content"]}>
          <Box className={styles["investment-fund-section__investment-list"]}>
            <h3>INVESTIMENTO</h3>

            <header>
              <SearchInput
                placeholder="Qual fundo está procurando?"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <Filters searchFilters={props.filters} />
            </header>
            {screenType === "desktop" && (
              <div
                className={
                  styles["investment-fund-section__investor-type-labels"]
                }
              >
                <ul>
                  <li>
                    <Stars />
                    <strong>Investidor qualificado</strong>
                  </li>
                  <li>
                    <Hexagon />
                    <strong>Fundo com menos de 6 meses</strong>
                  </li>
                  <li>
                    <ClosedBox />
                    <strong>Fechado para novas aplicações</strong>
                  </li>
                </ul>
              </div>
            )}
            <Table
              funds={funds.funds}
              filters={filters}
              resultsLength={funds.totalRows}
            />
          </Box>
        </div>
      </section>
      <div className="container">
        <Chart title={profitabilityLabel} graphic={graphic} />
      </div>
      <section className={styles["investment-fund-section__card-video"]}>
        <div className="container">
          {cardVideo?.title ? (
            <CardVideo
              title={cardVideo?.title}
              videoOfTheCards={cardVideo?.videoOfTheCards}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
