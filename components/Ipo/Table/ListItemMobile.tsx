import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { NavArrowDown } from "@/icons/index";
import { Link } from "@/components/Common/Link";
import { formatDate } from "@/utils/date/formatDate";
import { LOGIN_PAGE } from "@/utils/pages";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface Props {
  endReservation: string;
  beginReservation: string;
  liquidation: string;
  name: string;
  labelOfferCloseDate: string;
  labelOfferBegin: string;
  labelReserveButton: string;
  labelLiquidation: string;
  labelNoticeToMarket: string;
  labelProspecto: string;
  atentionText: string;
}

export function ListItemMobile(props: Props) {
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  const goToPage = useRouter();

  const {
    name,
    endReservation,
    beginReservation,
    liquidation,
    labelOfferBegin,
    labelOfferCloseDate,
    labelLiquidation,
    labelReserveButton,
    labelNoticeToMarket,
    labelProspecto,
  } = props;

  const goToLoginPage = () => {
    goToPage.push(LOGIN_PAGE);
  };

  return (
    <li className={styles["public-offers-list--mobile"]}>
      <header>
        <strong> {name} </strong>
      </header>

      <section>
        <div>
          <strong>{labelOfferCloseDate} </strong>
          <span> {formatDate(endReservation)}</span>
        </div>

        <div>
          <strong> {labelLiquidation} </strong>
          <span>{formatDate(liquidation)} </span>
        </div>

        <div className={styles["public-offers-list--mobile__icon"]}>
          <strong>{labelNoticeToMarket} </strong>
          <AiOutlineCloudDownload onClick={goToLoginPage} />
        </div>

        <div className={styles["public-offers-list--mobile__icon"]}>
          <strong> {labelProspecto} </strong>
          <AiOutlineCloudDownload onClick={goToLoginPage} />
        </div>

        {isAdditionalInfoOpen && (
          <>
            <div>
              <strong> {labelOfferBegin} </strong>
              <span>{formatDate(beginReservation)} </span>
            </div>
            <div>
              <strong> {labelOfferCloseDate} </strong>
              <span> {formatDate(endReservation)} </span>
            </div>
          </>
        )}
      </section>

      {isAdditionalInfoOpen && (
        <footer>
          <Link variant="contained" href="">
            {labelReserveButton}
          </Link>
        </footer>
      )}

      <div className={styles["public-offers-list--mobile__dropdown"]}>
        <NavArrowDown
          aria-pressed={isAdditionalInfoOpen}
          onClick={() => setIsAdditionalInfoOpen((prevState) => !prevState)}
        />
      </div>
    </li>
  );
}
