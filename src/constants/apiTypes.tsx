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
