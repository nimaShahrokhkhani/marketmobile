import { CURRENT_LOCALE } from '../constants';
export function changeLocale(locale) {
    return {
        type: CURRENT_LOCALE,
        payload: locale
    }
}
