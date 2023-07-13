import React, { createContext, useState } from 'react';

export interface IData {
    id: number;
    nome: string;
    aberto: string;
    horarioSem: string;
    horarioFimSem: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
    descricao: string;
    capacidade_maxima_reservas: number;
}

interface ContextProps {
    data: IData;
    setData: React.Dispatch<React.SetStateAction<IData>>;
}

export const AppContext = createContext<ContextProps>({
    data: {} as IData,
    setData: () => { }
});

export const AppProvider: React.FC = ({ children }: any) => {
    const [data, setData] = useState<IData>({} as IData);

    return (
        <AppContext.Provider value={{ data, setData }}>
            {children}
        </AppContext.Provider>
    );
};