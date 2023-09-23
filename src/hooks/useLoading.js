import { Loading } from '@/components/loading';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react'

const loadingContext = createContext({
    isLoading: false,
    isPageLoading: false,
});
export const useLoading = () => useContext(loadingContext);

export const LoadingProvider = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        const handleStart = (url) => (url !== router.asPath) && setIsPageLoading(true);
        const handleComplete = () => setIsPageLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [])

    return (
        <loadingContext.Provider value={{ isLoading, isPageLoading }}>
            {(isLoading || isPageLoading) && (
                <Loading />
            )}
            {children}
        </loadingContext.Provider>
    )
};