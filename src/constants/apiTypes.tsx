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