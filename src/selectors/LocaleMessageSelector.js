import en from '../locale/en.json';

const locales = {'en-GB': en};

export function getMessageString(currentLocale, key) {
    const localeBundle = locales[currentLocale] || {};
    return localeBundle[key] || key;
}
