import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextType {
  from: string;
  to: string;
  date: string;
  isSearchActive: boolean;
  setFrom: (query: string) => void;
  setTo: (query: string) => void;
  setDate: (query: string) => void;
  setIsSearchActive: (isActive: boolean) => void;
}
const SearchContext = createContext<SearchContextType>({
  from: "",
  to: "",
  date: "",
  isSearchActive: false,
  setFrom: () => {},
  setTo: () => {},
  setDate: () => {},
  setIsSearchActive: () => {},
});
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        from,
        to,
        date,
        isSearchActive,
        setFrom,
        setTo,
        setDate,
        setIsSearchActive,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);
