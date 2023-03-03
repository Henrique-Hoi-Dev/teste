import React, { useEffect, useState } from "react";
import Box from "@/components/Common/Box";
import { Ipo } from "@/endpoints/ipo/fetchIpoList";
import { IpoListing as IpoListingLabelsProps } from "@/endpoints/fetchIPOPageData";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { AiOutlinePlus } from "react-icons/ai";
import { ListItemMobile } from "./ListItemMobile";
import { TableRow } from "./TableRow";
import styles from "./styles.module.scss";

interface Props extends IpoListingLabelsProps {
  openOffers: Array<Ipo>;
  closedOffers: Array<Ipo>;
}

type offersType = "openOffers" | "closedOffers";

export function Table(props: Props) {
  const {
    openOffers,
    atentionText,
    labelClosedOffers,
    labelLiquidation,
    labelNoticeToMarket,
    labelOfferBegin,
    labelOfferCloseDate,
    labelOpenOffers,
    labelProspecto,
    labelReserveButton,
    labelTitle,
    title,
  } = props;

  const screen = GetScreenType();

  const [activeOffers, setActiveOffers] = useState<Array<Ipo>>(openOffers);
  const [activeOfferType, setActiveOfferType] =
    useState<offersType>("openOffers");

  const [visibleItems, setVisibleItems] = useState(10);

  const onActiveOfferChange = (newActiveOffer: offersType) => {
    setActiveOfferType(newActiveOffer);
    setVisibleItems(10);
  };

  const onShowMoreItemButtonClick = () => {
    if (visibleItems < props[activeOfferType].length) {
      setVisibleItems((prevState) => prevState + 10);
      setActiveOffers(props[activeOfferType].slice(0, visibleItems));
    }
  };

  useEffect(() => {
    setActiveOffers(props[activeOfferType].slice(0, visibleItems));
  }, [visibleItems, activeOfferType, props]);

  const hasMoreItemsToShow = visibleItems <= activeOffers.length;

  const renderTableDesktop = () => (
    <table className={styles["public-offers-table"]}>
      <thead>
        <tr>
          <th>{labelClosedOffers} </th>
          <th> {labelTitle} </th>
          <th> {labelNoticeToMarket} </th>
          <th> {labelProspecto} </th>
          <th> </th>
        </tr>
        <tr></tr>
      </thead>
      <tbody>
        {activeOffers?.length &&
          activeOffers.map((offer) => (
            <TableRow
              key={offer.id}
              beginReservation={offer.beginReservation}
              endReservation={offer.endReservation}
              name={offer.name}
              liquidation={offer.liquidation}
              labelOfferBegin={labelOfferBegin}
              labelOfferCloseDate={labelOfferCloseDate}
              atentionText={atentionText}
              labelLiquidation={labelLiquidation}
              labelReserveButton={labelReserveButton}
            />
          ))}
      </tbody>
    </table>
  );

  const renderMobileList = () =>
    activeOffers?.length &&
    activeOffers.map((offer) => (
      <ListItemMobile
        key={offer.id}
        beginReservation={offer.beginReservation}
        endReservation={offer.endReservation}
        name={offer.name}
        liquidation={offer.liquidation}
        labelOfferBegin={labelOfferBegin}
        labelOfferCloseDate={labelOfferCloseDate}
        atentionText={atentionText}
        labelLiquidation={labelLiquidation}
        labelReserveButton={labelReserveButton}
        labelNoticeToMarket={labelNoticeToMarket}
        labelProspecto={labelProspecto}
      />
    ));

  return (
    <Box className={styles["ipo-list"]}>
      <h3> {title} </h3>

      <header>
        <button
          onClick={() => onActiveOfferChange("openOffers")}
          aria-pressed={activeOfferType === "openOffers"}
        >
          {labelOpenOffers}
        </button>
        <button
          onClick={() => onActiveOfferChange("closedOffers")}
          aria-pressed={activeOfferType === "closedOffers"}
        >
          {labelClosedOffers}
        </button>
      </header>

      {screen == "desktop" ? renderTableDesktop() : renderMobileList()}

      {hasMoreItemsToShow && (
        <footer>
          <button onClick={onShowMoreItemButtonClick}>
            <AiOutlinePlus />
          </button>
        </footer>
      )}
    </Box>
  );
}
