import React, { createContext, useState, ReactNode } from "react";

interface ContextTypes {
    first: number; 
    setFirst: React.Dispatch<React.SetStateAction<number>>; 
    nextPage: number; setNextPage: 
    React.Dispatch<React.SetStateAction<number>>;
}

export const FilterContext = createContext<ContextTypes>({ 
    first: 5, 
    setFirst: () => 0,
    nextPage: 5, 
    setNextPage: () => 0,
});

interface PokemonProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: PokemonProviderProps) => {
    const [first, setFirst] = useState(5);
    const [nextPage, setNextPage] = useState(5);

    const value = { first, setFirst, nextPage, setNextPage};

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
};
  