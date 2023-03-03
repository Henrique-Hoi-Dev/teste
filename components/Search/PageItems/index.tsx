import React from "react";
import styles from "./styles.module.scss";
import { ChevronRight } from "@/icons/ChevronRight";
import { ISearchResults } from "@/endpoints/fetchSearchResults";
import { useRouter } from "next/router";

interface IPageItems {
  searchResults: ISearchResults[];
  pageLinkLabel: string;
  onClose: () => void;
}

const PageItems = ({ pageLinkLabel, searchResults, onClose }: IPageItems) => {
  const router = useRouter();

  function filterLinkSlash(link: string) {
    return link[0] === "/" ? link.slice(1) : link;
  }

  function handleOnClose(link: string) {
    router.push(filterLinkSlash(link));
    onClose();
  }

  return (
    <div className={styles["search-results-container"]}>
      {searchResults.map((item) => {
        const { id, attributes } = item;
        const { title, description, link } = attributes;

        return (
          <div key={id} className={styles["page-info-container"]}>
            <h4>{title}</h4>
            <p>{description}</p>
            <button
              className={styles["link-container"]}
              onClick={() => handleOnClose(link)}
            >
              <p>{pageLinkLabel}</p>
              <ChevronRight stroke="#F58220" width={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PageItems;
