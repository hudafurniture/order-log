import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface FilterContextProps {
  filteredDrivers: string[];
  setFilteredDrivers: Dispatch<SetStateAction<string[]>>;
}

export const FilterContext = createContext<FilterContextProps>({
  filteredDrivers: [],
  setFilteredDrivers: (): string[] => [],
});

const FilterProvider = ({ children }: any) => {
  const [filteredDrivers, setFilteredDrivers] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ filteredDrivers, setFilteredDrivers }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { FilterProvider, useFilter };
