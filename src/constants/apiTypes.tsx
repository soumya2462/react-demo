type DateTimestamp = {
  seconds: number,
  nanos: number,
};

export type apiPackage = {
  id: string,
  name: string,
  clientId: string,
  packageId: string,
  createdDate: DateTimestamp,
};

export type apiSite = {
  id: string,
  siteId: string,
  name: string,
  subDomain: string,
  audience: string,
  clientId: string,
  packages: Array<string>,
  createdDate: DateTimestamp,
};

export type NumberRange = {
  start: number;
  end: number;
}

export type LetterRange = {
  start: string;
  end: string;
}

export type apiNumberFormat = {
  id: string,
  numberFormatId: string,
  packageId: string,
  clientId: string,
  livePrefix: string,
  testPrefix: string,
  suffix: string,
  numberPadding: number,
  numberRange: NumberRange[],
  letterRange: LetterRange[],
  messageIfNumbersOutsideRange: string,
  messageIfLettersOutsideRange: string,
};

export type apiClaimStatuses = {
  id: string,
  claimStatusesId: string,
  packageId: string,
  clientId: string,
  claimStatusesList: Array<string>,
};
