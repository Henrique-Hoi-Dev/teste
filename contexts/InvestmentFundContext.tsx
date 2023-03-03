import React, { createContext, useState, useCallback } from "react";
import { fetchFundsEndpoints } from "@/endpoints/fetchFundsEndpoint";
import { Funds } from "@/interfaces/Fund";

interface ContextProvider {
  children: React.ReactNode;
}

interface InvestmentFundContextProps {
  loading: boolean;
  loadingNextPage: boolean;
  funds: Funds;
  fundsListing: Funds["funds"];
  onSearch: (name: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  onFetchNextPage: () => void;
  hasMoreResultsToShow: boolean;
  onFilterChange: (key: string, value: number | string) => void;
  filters: Filters;
}

interface Filters {
  category: string | number;
  investorType: string | number;
  innitalAplication: string | number;
  liquidation: string | number;
}

export const InvestmentFundContext = createContext<InvestmentFundContextProps>(
  {} as InvestmentFundContextProps
);

const RESULTS_LIMIT = 20;

export function InvestmentFundContextProvider({ children }: ContextProvider) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [error, setError] = useState(false);
  const [fundsConfiguration, setFundsConfiguration] = useState({
    page: 1,
    limit: RESULTS_LIMIT,
    searchQuery: "",
    totalPages: 1,
    hasMorePagesToShow: true,
  });

  const [fundsData, setFundsData] = useState<Funds>({} as Funds);
  const [fundsListing, setFundsListing] = useState<Funds["funds"]>(
    [] as Funds["funds"]
  );

  const [filters, setFilters] = useState<Filters>({
    category: "",
    investorType: "",
    innitalAplication: "",
    liquidation: "",
  });

  const onFilterChange = (key: string, value: number) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const onSearch = useCallback(
    async (name: string) => {
      try {
        setIsLoading(true);

        const response = await fetchFundsEndpoints({
          limit: RESULTS_LIMIT,
          name: name.toUpperCase(),
          page: 1,
          category: filters?.category || "",
          minApplication: filters?.innitalAplication,
          redemptionSettlementDays: filters?.liquidation,
          suitability: filters?.investorType,
        });

        setFundsConfiguration({
          limit: 10,
          page: 1,
          searchQuery: name.toUpperCase(),
          totalPages: response.totalPages,
          hasMorePagesToShow: response.totalPages > 1,
        });

        setFundsData(response);
        setFundsListing(response.funds);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  const fetchNextPage = useCallback(
    async (page: number) => {
      try {
        setLoadingNextPage(true);

        const response = await fetchFundsEndpoints({
          limit: 20,
          name: fundsConfiguration.searchQuery,
          page: page,
          category: filters.category,
          minApplication: filters?.innitalAplication,
          redemptionSettlementDays: filters?.liquidation,
          suitability: filters?.investorType,
        });

        setFundsListing((prevState) => {
          return [...prevState, ...response.funds];
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoadingNextPage(false);
      }
    },
    [
      fundsConfiguration,
      filters.category,
      filters.innitalAplication,
      filters.liquidation,
      filters.investorType,
    ]
  );

  const onFetchNextPage = () => {
    if (fundsConfiguration.page <= fundsConfiguration.totalPages) {
      const newPage = fundsConfiguration.page + 1;

      setFundsConfiguration((prevState) => {
        return {
          ...prevState,
          page: newPage,
          hasMorePagesToShow: newPage < prevState.totalPages,
        };
      });

      fetchNextPage(newPage);
    }
  };

  return (
    <InvestmentFundContext.Provider
      value={{
        loading: isLoading,
        funds: fundsData,
        fundsListing: fundsListing,
        onSearch: onSearch,
        fetchNextPage,
        onFetchNextPage,
        hasMoreResultsToShow: fundsConfiguration.hasMorePagesToShow,
        onFilterChange,
        filters,
        loadingNextPage,
      }}
    >
      {children}
    </InvestmentFundContext.Provider>
  );
}
