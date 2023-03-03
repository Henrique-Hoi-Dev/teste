import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Stars, Hexagon, MoneyBox, ClosedBox } from "@/icons/index";
import { getMonthDifference } from "@/utils/date/differenceInMonths";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import styles from "./styles.module.scss";

interface Props {
  fundOpen: boolean;
  fundOpeningDate: Date;
  qualifiedInvestor: boolean;
}

export const FundTypeIndicator = ({
  fundOpen,
  fundOpeningDate,
  qualifiedInvestor,
}: Props) => {
  const screenType = GetScreenType();

  const isFundOpenMoreThanSixMonths =
    Math.abs(getMonthDifference(new Date(), new Date(fundOpeningDate))) > 6;

  const renderQualifiedInvestorTooltip = () =>
    qualifiedInvestor ? (
      <Tooltip
        arrow
        title="Apenas para investidores qualificados"
        placement="right"
      >
        <IconButton>
          <Stars />
        </IconButton>
      </Tooltip>
    ) : (
      <> </>
    );

  const renderQualifiedInvestorMobile = () =>
    qualifiedInvestor ? (
      <div>
        <span> Apenas para investidores qualificados </span> <Stars />
      </div>
    ) : (
      <> </>
    );

  const renderFundClosedTooltip = () =>
    !fundOpen ? (
      <Tooltip arrow title="Fechado para novas aplicações" placement="right">
        <IconButton>
          <ClosedBox />
        </IconButton>
      </Tooltip>
    ) : (
      <> </>
    );

  const renderFundClosedMobile = () =>
    qualifiedInvestor ? (
      <div>
        <span> Fechado para novas aplicações </span> <ClosedBox />
      </div>
    ) : (
      <> </>
    );

  const renderFundHasMoreThanSixMonthsTooltip = () =>
    !isFundOpenMoreThanSixMonths ? (
      <Tooltip arrow title="Fundo com menos de 6 meses" placement="right">
        <IconButton>
          <Hexagon />
        </IconButton>
      </Tooltip>
    ) : (
      <> </>
    );

  const renderFundHasMoreThanSixMobile = () =>
    !isFundOpenMoreThanSixMonths ? (
      <div>
        <span> Fundo com menos de 6 meses </span> <Hexagon />
      </div>
    ) : (
      <> </>
    );

  const renderDesktopContent = () => (
    <>
      {renderQualifiedInvestorTooltip()}
      {renderFundClosedTooltip()}
      {renderFundHasMoreThanSixMonthsTooltip()}
    </>
  );

  const renderMobileContent = () => <>{renderQualifiedInvestorMobile()}</>;

  return (
    <div className={styles["fund-type-indicator-container"]}>
      {screenType == "desktop" ? renderDesktopContent() : renderMobileContent()}
    </div>
  );
};
