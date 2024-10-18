import { useState } from "#app";

export const useSearchState = () => {
  const searchInput = useState<string>("searchInput", () => "");

  const setSearchInput = (value: string) => {
    searchInput.value = value;
  };

  return {
    searchInput,
    setSearchInput,
  };
};
