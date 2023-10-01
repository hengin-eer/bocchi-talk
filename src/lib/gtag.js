export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const pageView = (url) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};