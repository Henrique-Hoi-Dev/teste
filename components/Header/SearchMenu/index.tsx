import qs from "qs";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./styles.module.scss";
import ReactPaginate from "react-paginate";
import { CloseIcon } from "@/icons/CloseIcon";
import { ISearchMenu } from "@/interfaces/Header";
import React, { useCallback, useMemo, useState } from "react";
import { SearchInput } from "@/components/Common/SearchInput";
import { customPopupStyles } from "./utils/customPopupStyles";
import { ISearchResults } from "@/endpoints/fetchSearchResults";
import PageItems from "@/components/Search/PageItems";
import { Loader } from "@/components/Common/Loader";

interface ISearchMenuProps extends ISearchMenu {
  visible: boolean;
  onClose: () => void;
  onCrossClick?: () => void;
}

interface IPagination {
  page: number;
  pageCount: number;
}

interface IHandlePageClick {
  selected: number;
}

interface IHandleSearchRequest {
  page?: number;
  search?: string;
}

interface IError {
  title: string;
  description: string;
}

export function SearchMenu({
  title,
  visible,
  onClose,
  onCrossClick,
  notFoundTitle,
  pageLinkLabel,
  searchPlaceholder,
  errorTitle,
  errorDescription,
  notFoundDescription
}: ISearchMenuProps) {
  const FIRST_PAGE = 1;
  const PAGE_RANGE_DISPLAYED = 2;

  const defaultPaginationValues = {
    page: FIRST_PAGE,
    pageCount: 0
  };

  const defaultErrorValues = useMemo(
    () => ({
      title: "",
      description: ""
    }),
    []
  );

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResults[]>([]);
  const [pagination, setPagination] = useState<IPagination>(
    defaultPaginationValues
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError>(defaultErrorValues);

  function handleClose(crossClick?: boolean) {
    const shouldCallCrossClick = crossClick && onCrossClick;

    setPagination(defaultPaginationValues);
    setSearchValue("");
    setError(defaultErrorValues);

    shouldCallCrossClick ? onCrossClick() : onClose();
  }

  const renderNotFound = useCallback(
    () => (
      <div className={styles["not-found-container"]}>
        <h4>{error.title || notFoundTitle}</h4>
        <p>{error.description || notFoundDescription}</p>
      </div>
    ),
    [error.title, error.description, notFoundDescription, notFoundTitle]
  );

  const handleSearchRequest = useCallback(
    async ({ search, page }: Partial<IHandleSearchRequest>) => {
      try {
        setLoading(true);
        setError(defaultErrorValues);

        const newPage = page || pagination.page;
        const newSearch = search || searchValue;

        setSearchResults([]);

        const query = qs.stringify(
          {
            pagination: {
              page: newPage,
              pageSize: 3
            },
            filters: {
              title: {
                $containsi: newSearch
              }
            }
          },
          {
            encodeValuesOnly: true
          }
        );

        const response = await axios.get(`/api/search?${query}`);

        const searchRequest = response.data;

        const { pagination: paginationRequest } = searchRequest.meta;
        const { page: pageRequest, pageCount } = paginationRequest;

        setSearchResults(searchRequest.data);
        setPagination({
          page: pageRequest,
          pageCount
        });

        setLoading(false);
      } catch (error) {
        setError({
          title: errorTitle,
          description: errorDescription
        });

        setLoading(false);
      }
    },
    [
      defaultErrorValues,
      errorDescription,
      errorTitle,
      pagination.page,
      searchValue
    ]
  );

  const handleSearchValueChange = useCallback(
    async (value: string) => {
      setSearchValue(value);
      setPagination(defaultPaginationValues);

      await handleSearchRequest({ search: value });
    },
    [handleSearchRequest]
  );

  const handlePageClick = useCallback(
    async ({ selected: selectedPage }: IHandlePageClick) => {
      setPagination((prevState) => ({
        ...prevState,
        page: selectedPage + 1
      }));

      await handleSearchRequest({ page: selectedPage + 1 });
    },
    [handleSearchRequest]
  );

  const renderLoading = useCallback(
    () => (
      <div className={styles["pagination-loading-container"]}>
        <Loader
          stroke="#f58220"
          className={styles["pagination-loading-icon"]}
        />
      </div>
    ),
    []
  );

  const renderResults = useCallback(
    () => (
      <div className={styles["pagination-wrapper"]}>
        <PageItems
          pageLinkLabel={pageLinkLabel}
          searchResults={searchResults}
          onClose={handleClose}
        />
        <ReactPaginate
          className={styles["pagination-container"]}
          breakLabel="..."
          previousLabel={null}
          nextLabel={null}
          onPageChange={handlePageClick}
          pageCount={pagination.pageCount}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          renderOnZeroPageCount={() => null}
          forcePage={pagination.page - 1}
          activeClassName={styles["pagination-container__active"]}
          disabledClassName={styles["pagination-container__disabled"]}
          containerClassName={styles["pagination-container"]}
        />
      </div>
    ),
    [handlePageClick, pageLinkLabel, pagination, searchResults]
  );

  const renderPageInformations = useMemo(() => {
    if (loading) return renderLoading();

    if (!searchResults.length) {
      return renderNotFound();
    }

    if (!searchValue) {
      return null;
    }

    return renderResults();
  }, [
    loading,
    renderLoading,
    renderNotFound,
    renderResults,
    searchResults.length,
    searchValue
  ]);

  return (
    <Popup
      open={visible}
      className={styles["search-popup"]}
      {...customPopupStyles}
    >
      <>
        <div className={`container ${styles["search-popup__top-container"]}`}>
          <div onClick={() => handleClose(true)}>
            <CloseIcon stroke="#fff" width={"1.5rem"} />
          </div>
          <h2>{title}</h2>
          <SearchInput
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={async ({ target }) =>
              handleSearchValueChange(target.value)
            }
          />
        </div>
        <div className="container">{renderPageInformations}</div>
      </>
    </Popup>
  );
}

export default SearchMenu;
