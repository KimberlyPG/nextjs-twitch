import React, { createContext, useState, ReactNode } from "react";

interface ContextTypes {
    first: number; 
    setFirst: React.Dispatch<React.SetStateAction<number>>; 
    second: number; 
    setSecond: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterContext = createContext<ContextTypes>({ 
    first: 5, 
    setFirst: () => 0,
    second: 5, 
    setSecond: () => 0,
});

interface PokemonProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: PokemonProviderProps) => {
    const [first, setFirst] = useState(5);
    const [second, setSecond] = useState(5);

    const value = { first, setFirst, second, setSecond};

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
};
  