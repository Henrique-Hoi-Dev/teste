import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { NavArrowDown } from "@/icons/index";
import { Button } from "@/components/Common/Button";
import { formatDate } from "@/utils/date/formatDate";
import { LOGIN_PAGE } from "@/utils/pages";
import { GoToLoginPage } from "@/utils/hooks/goToLoginPage";
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
  atentionText: string;
}

export function TableRow(props: Props) {
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
    atentionText,
  } = props;

  const goToLoginPage = () => {
    goToPage.push(LOGIN_PAGE);
  };

  return (
    <>
      <tr>
        <td className={styles["public-offers-table__date"]}>
          {formatDate(endReservation)}
        </td>
        <td>{name}</td>
        <td className={styles["public-offers-table__icon"]}>
          <span>
            <AiOutlineCloudDownload onClick={goToLoginPage} />
          </span>
        </td>
        <td className={styles["public-offers-table__icon"]}>
          <span>
            <AiOutlineCloudDownload onClick={goToLoginPage} />
          </span>
        </td>
        <td>
          <NavArrowDown
            aria-pressed={isAdditionalInfoOpen}
            onClick={() => setIsAdditionalInfoOpen((prevState) => !prevState)}
            className={styles["public-offers-table__icon-arrow"]}
          />
        </td>
      </tr>

      {isAdditionalInfoOpen && (
        <tr className={styles["public-offers-table__item-expanded"]}>
          <td colSpan={5}>
            <div>
              <div>
                <strong> {labelOfferBegin} </strong>
                <span>{formatDate(beginReservation)} </span>
              </div>

              <div>
                <strong> {labelOfferCloseDate} </strong>
                <span> {formatDate(endReservation)} </span>
              </div>

              <div>
                <strong> {labelLiquidation} </strong>
                <span> {formatDate(liquidation)} </span>
              </div>
            </div>

            <div className={styles["public-offers-table__item-expanded__info"]}>
              <p>{atentionText}</p>
              <Button buttonType="primary" onClick={goToLoginPage}>
                {labelReserveButton}
              </Button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
