export type Country = {
  id: number;
  name: string;
};
export type City = {
  id: number;
  name: string;
  country: Country;
  country_id: number;
};

// export type CreateCity = {
//   name: string;
//   country_id: number;
// };