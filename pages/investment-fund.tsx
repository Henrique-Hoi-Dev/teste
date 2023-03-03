import React, { useState, useEffect, useCallback } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import {
  fetchInvestmentFundPageData,
  InvestmentFundPageData,
} from "@/endpoints/index";
import { Container } from "@/components/InvestmentFund/Container";
import { InvestmentFundContextProvider } from "contexts/InvestmentFundContext";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";

type InvestmentFundPageDataProps = InvestmentFundPageData["data"]["attributes"];

interface Props extends InvestmentFundPageDataProps {}

export default function InvestmentFund(props: Props) {
  return (
    <>
      <Head>
        <title> Mirae | Fundos de investimento</title>
        <meta name="description" content="Mirae Assets" />
      </Head>

      <InvestmentFundContextProvider>
        <Container {...props} />
      </InvestmentFundContextProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const investmentFundPagesData = await fetchInvestmentFundPageData();

    return {
      props: {
        ...investmentFundPagesData?.data?.attributes,
      },
      revalidate: PAGE_REGENERATION_TIME,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
