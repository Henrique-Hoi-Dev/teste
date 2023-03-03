export interface FundRentability {
  yearRentability: number;
  currentMonthRentability: number;
  twelveMonthRentability: number;
}

export interface InvestmentFundFees {
  chargePerformanceFee: boolean;
  performanceFeeValue: number;
  performanceFeeIndexReferenceValue: number;
  chargeEntranceFee: boolean;
  typeEntranceFee: number;
  typeEntranceFeeDescription: string;
  entranceFeeValue: number;
  chargeExitFee: boolean;
  typeExitFee: number;
  typeExitFeeDescription: string;
  exitFeeValue: number;
  typeAdministrationFee: number;
  typeAdministrationFeeDescription: string;
  administrationFeeValue: number;
  administrationFeeMaxValue: number;
  performanceFeeIndexReferenceName: string;
  performanceFeeDescription: string;
}

export interface InvestmentFundValues {
  minApplication: number;
  minMoviment: number;
  minBalanceApplied: number;
  minRedemption: number;
}

export interface InvestmentFundConfig {
  openCapture: boolean;
  openRedemption: boolean;
  openingCapture: Date;
  openingRedemption: Date;
  conversionTermOfTheQuotaApplication: number;
  conversionTermOfTheQuotaApplicationDescription: string;
  quotaApplicationValueConversionDays: number;
  applicationDeadlineLimit: string;
  redemptionTimeLimit: string;
  deadlineRedemptionPayment: number;
  deadlineRedemptionPaymentDescription: string;
  redemptionConversionDays: number;
  redemptionSettlementDays: number;
  gracePeriodInitialRedemption: number;
  quotaCalculationType: number;
  quotaCalculationTypeDescription: string;
}

export interface InvestmentFundProfile {
  compositionId: number;
  compositionDescription: string;
  anbimaTypeId: number;
  anbimaTypeDescription: string;
  cvmClassId: number;
  cvmClassDescription: string;
  targetTaxation: number;
  targetTaxationDescription: string;
  anbimaRating: number;
  anbimaRatingDescription: string;
  anbimaStatus: number;
  anbimaStatusDescription: string;
  suitability: number;
  suitabilityDescription: string;
  risk: number;
  riskDescription: string;
  qualifiedInvestor: boolean;
  professionalInvestor: boolean;
  category: number;
  categoryDescription: string;
}

export interface VisibleFile {
  fileId: number;
  document: number;
  path: string;
  fileType: number;
  fileTypeDescription: string;
  isVisible: boolean;
  createdAt: Date;
}

export interface fund {
  fundsId: number;
  name: string;
  document: number;
  statusMarket: number;
  statusMarketDescription: string;
  openCapture: boolean;
  administratorName: string;
  start: Date;
  risk: number;
  riskDescription: string;
  suitability: number;
  suitabilityDescription: string;
  qualifiedInvestor: boolean;
  professionalInvestor: boolean;
  status: number;
  statusDescription: string;
  anbimaRating: number;
  anbimaRatingDescription: string;
  category: number;
  categoryDescription: string;
  recentlyStarted: boolean;
  synchronizedMinicom: boolean;
  fundCod: number;
  fundRentability: FundRentability;
  investmentFundFees: InvestmentFundFees;
  investmentFundValues: InvestmentFundValues;
  investmentFundConfig: InvestmentFundConfig;
  investmentFundProfile: InvestmentFundProfile;
  inconsistency: any[];
  visibleFiles: VisibleFile[];
  lastQuota: {
    quotaId: number;
    quotaValue: number;
    netWorth: number;
    informationDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Funds {
  funds: Array<fund>;
  totalRows: number;
  page: number;
  limit: number;
  totalPages: number;
}
