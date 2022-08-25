import React, { createContext, useState } from 'react';

type UserType = {
    email: string;
    perfil: string;
    isLogado: boolean;
    id: Number;
};

type PropsUserContext = {
    state: UserType;
    setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
    state: {
        email: "",
        perfil: "",
        isLogado: false,
        id: null
    },
    setState: () => {},
};

export const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE)

const UserContextProvider: React.FC = ({children}) => {

    const [state, setState] = useState(DEFAULT_VALUE.state);

    return (
        <UserContext.Provider value={{state, setState}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;