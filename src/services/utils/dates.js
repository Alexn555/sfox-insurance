export const formatDate = (timestamp, locale = 'fr-CH') => {
    return new Date(timestamp * 1000).toLocaleDateString(locale);
}