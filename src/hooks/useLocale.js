import { useRouter } from "next/router";
import en from "@/lib/locale/en";
import ja from "@/lib/locale/ja";

export const useLocale = () => {
    const { locale } = useRouter();

    const t = 'en' ? en : ja;

    return { locale, t }
};