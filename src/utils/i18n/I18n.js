import I18n from "i18n-js";
import en_us from './locales/en';
import fa_ir from './locales/fa';

I18n.fallbacks = true;
I18n.translations = {
    en_us,
    fa_ir
};

export function i18n(name, locale) {
    return I18n.t(name, {locale: locale});
}
