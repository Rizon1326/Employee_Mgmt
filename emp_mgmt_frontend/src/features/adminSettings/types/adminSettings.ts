export type Country = {
  id: number;
  name: string;
};
export type City = {
  id: number;
  name: string;
  country: Country;
};