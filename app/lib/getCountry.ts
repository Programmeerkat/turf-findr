import { countries } from "../constants/countries";

export default function getCountry(countryCode: string) {
  return countries.find((country) => country.value === countryCode)?.label ?? "";
};
