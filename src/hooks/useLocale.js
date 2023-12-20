import { useRouter } from "next/router";
import en from "@/lib/locale/en";
import ja from "@/lib/locale/ja";
import { useEffect } from "react";

const router = useRouter();

export const useLocale = () => {
    if (router.isReady) {
        useEffect(() => {
            const locale = router.locale;
            const t = 'en' ? en : ja;
            console.log(`locale: ${locale}`);

            return { locale, t };
        }, [router])
    }
};