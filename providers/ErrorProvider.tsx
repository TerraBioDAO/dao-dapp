import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';

interface ErrorContextType {
    error: string | null;
    setError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType>({
    error: null,
    setError: () => { }
});

interface ErrorProviderProps {
    children: React.ReactNode;
}

const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const toast = useToast()
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('error provider effect')
        if (error)
            toast({
                title: 'Une erreur est survenue !',
                description: error,
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            })
    }, [error])

    const values: ErrorContextType = useMemo(() => ({
        error,
        setError
    }), [])

    return <ErrorContext.Provider value={values}>{children}</ErrorContext.Provider>;
};

export { ErrorContext, ErrorProvider };