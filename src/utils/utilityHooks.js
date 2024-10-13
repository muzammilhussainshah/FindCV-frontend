import axios from "axios";
import {
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

export const useGetSkillsHook = () => {
    const { t } = useTranslation();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobsSkill`);
                const data = response.data;
                setSkills(data.map(skill => ({
                    value: skill.value,
                    label: t(`general.skill.${skill.label}`)
                })));
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        fetchSkills();
    }, [t]);

    return skills;
};


export const useGetCompanyIndustriesHook = () => {
    const { t } = useTranslation();

    const industry_codes = ["agriculture", "automotive", "banking", "biotechnology", "chemicals", "construction", "consulting", "consumer_goods", "education", "energy", "engineering", "entertainment", "financial_services", "food_beverage", "healthcare", "hospitality", "insurance", "internet", "logistics", "manufacturing", "marketing", "media", "non_profit", "pharmaceutical", "real_estate", "retail", "software", "telecommunications", "transportation", "utilities"];
    const industries = [];

    industry_codes.forEach(industry => {
        industries.push({
            value: industry,
            label: t(`general.company_industries.${industry}`)
        });
    });

    return industries;
};

export const useGetJobCategoriesHook = () => {
    const { t } = useTranslation();
    const [jobCategories, setJobCategories] = useState([]);

    useEffect(() => {
        const fetchJobCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}job/getJobsCategory`);
                const data = await response.data;
                setJobCategories(data.map(category => ({
                    value: category.value,
                    label: t(`general.job_category.${category.label}`)
                })));
            } catch (error) {
                console.error('Error fetching job categories:', error);
            }
        };

        fetchJobCategories();
    }, [t]);

    return jobCategories;
};


export const useGetEducationLevelsHook = () => {
    const { t } = useTranslation();

    const education_levels_codes = [
        "no_formal_education",
        "primary_education",
        "lower_secondary_education",
        "upper_secondary_education",
        "vocational_education_and_training",
        "associate_degree",
        "bachelors_degree",
        "masters_degree",
        "doctoral_degree",
        "postdoctoral_research",
        "professional_certification"
    ];
    const education_levels = [];

    education_levels_codes.forEach(education_level => {
        education_levels.push({
            value: education_level,
            label: t(`general.education_levels.${education_level}`)
        });
    });

    return education_levels;
};

export const useGetCurrenciesHook = (includeCurrencies = []) => {

    const currencies_list = [
        { code: "usd", name: "USD", symbol: "$" },
        { code: "eur", name: "EUR", symbol: "€" },
        { code: "gbp", name: "GBP", symbol: "£" },
        { code: "jpy", name: "JPY", symbol: "¥" },
        { code: "cny", name: "CNY", symbol: "¥" },
        { code: "cad", name: "CAD", symbol: "$" },
        { code: "aud", name: "AUD", symbol: "$" },
        { code: "chf", name: "CHF", symbol: "CHF" },
        { code: "sek", name: "SEK", symbol: "kr" },
        { code: "nok", name: "NOK", symbol: "kr" },
        { code: "dkk", name: "DKK", symbol: "kr" },
        { code: "rub", name: "RUB", symbol: "₽" },
        { code: "inr", name: "INR", symbol: "₹" },
        { code: "brl", name: "BRL", symbol: "R$" },
        { code: "zar", name: "ZAR", symbol: "R" },
        { code: "hkd", name: "HKD", symbol: "$" },
        { code: "sgd", name: "SGD", symbol: "$" },
        { code: "nzd", name: "NZD", symbol: "$" },
        { code: "thb", name: "THB", symbol: "฿" },
        { code: "php", name: "PHP", symbol: "₱" },
        { code: "idr", name: "IDR", symbol: "Rp" },
        { code: "myr", name: "MYR", symbol: "RM" },
        { code: "vnd", name: "VND", symbol: "₫" },
        { code: "krw", name: "KRW", symbol: "₩" },
        { code: "try", name: "TRY", symbol: "₺" },
        { code: "mxn", name: "MXN", symbol: "$" },
        { code: "ars", name: "ARS", symbol: "$" },
        { code: "cop", name: "COP", symbol: "$" },
        { code: "clp", name: "CLP", symbol: "$" },
        { code: "pen", name: "PEN", symbol: "S/." },
        { code: "aed", name: "AED", symbol: "د.إ" },
        { code: "sar", name: "SAR", symbol: "ر.س" },
        { code: "qar", name: "QAR", symbol: "ر.ق" },
        { code: "omr", name: "OMR", symbol: "ر.ع." },
        { code: "kwd", name: "KWD", symbol: "د.ك" },
        { code: "bhd", name: "BHD", symbol: "د.ب" },
        { code: "jod", name: "JOD", symbol: "د.ا" },
        { code: "ils", name: "ILS", symbol: "₪" },
        { code: "pln", name: "PLN", symbol: "zł" },
        { code: "czk", name: "CZK", symbol: "Kč" },
        { code: "huf", name: "HUF", symbol: "Ft" },
        { code: "ron", name: "RON", symbol: "lei" },
        { code: "sek", name: "SEK", symbol: "kr" },
        { code: "nok", name: "NOK", symbol: "kr" },
        { code: "dkk", name: "DKK", symbol: "kr" },
        { code: "rub", name: "RUB", symbol: "₽" },
        { code: "inr", name: "INR", symbol: "₹" },
        { code: "brl", name: "BRL", symbol: "R$" },
        { code: "zar", name: "ZAR", symbol: "R" },
        { code: "hkd", name: "HKD", symbol: "$" },
        { code: "sgd", name: "SGD", symbol: "$" },
        { code: "nzd", name: "NZD", symbol: "$" },
        { code: "thb", name: "THB", symbol: "฿" },
        { code: "php", name: "PHP", symbol: "₱" },
        { code: "idr", name: "IDR", symbol: "Rp" },
        { code: "myr", name: "MYR", symbol: "RM" },
        { code: "vnd", name: "VND", symbol: "₫" },
        { code: "krw", name: "KRW", symbol: "₩" },
        { code: "try", name: "TRY", symbol: "₺" },
        { code: "mxn", name: "MXN", symbol: "$" },
        { code: "ars", name: "ARS", symbol: "$" },
        { code: "cop", name: "COP", symbol: "$" },
        { code: "clp", name: "CLP", symbol: "$" },
        { code: "pen", name: "PEN", symbol: "S/." },
        { code: "aed", name: "AED", symbol: "د.إ" },
        { code: "sar", name: "SAR", symbol: "ر.س" },
        { code: "qar", name: "QAR", symbol: "ر.ق" },
        { code: "omr", name: "OMR", symbol: "ر.ع." },
        { code: "kwd", name: "KWD", symbol: "د.ك" },
        { code: "bhd", name: "BHD", symbol: "د.ب" },
        { code: "jod", name: "JOD", symbol: "د.ا" },
        { code: "ils", name: "ILS", symbol: "₪" },
        { code: "pln", name: "PLN", symbol: "zł" },
        { code: "czk", name: "CZK", symbol: "Kč" },
        { code: "huf", name: "HUF", symbol: "Ft" }
    ];
    const currencies = [];

    currencies_list.forEach(currency => {

        if (includeCurrencies.length > 0) {

            if (includeCurrencies.includes(currency.code)) {
                currencies.push({
                    value: currency.code,
                    label: currency.name + " (" + currency.symbol + ")"
                });
            }

        }
        else {
            currencies.push({
                value: currency.code,
                label: currency.name + " (" + currency.symbol + ")"
            });
        }

    });

    const uniqueCurrencyValues = new Set();
    const uniqueCurrencies = currencies.filter(currency => {
        if (uniqueCurrencyValues.has(currency.value)) {
            return false;
        } else {
            uniqueCurrencyValues.add(currency.value);
            return true;
        }
    });

    return uniqueCurrencies;

};

export const useGetQueryParam = (param) => {
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
};

export const useDebounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export const useGetCities = (includeCountry = []) => {
    const { t } = useTranslation();

    const city_codes_sar = ["riyadh", "jeddah", "mecca", "medina", "dammam", "khobar", "dhahran", "tabuk", "qatif", "al_hasa", "hofuf", "jubail", "abha", "khamis_mushait", "najran", "jizan", "taif", "al_khafji", "yanbu", "al_kharj", "buraidah", "al_jouf", "hail", "arar", "sakaka", "al_mubarraz", "unaizah", "ras_tanura", "rabigh", "al_lith"];
    const city_codes_oman = ["muscat", "salalah", "sohar", "nizwa", "sur", "ibra", "barka", "rustaq", "buraimi", "ibri", "khasab", "matrah", "seeb", "samail", "al_ashkharah", "bidiyah", "badiyah", "bahla", "al_kamil_wal_wafi", "adam", "al_mudhaibi", "al_suwaiq", "al_awabi", "al_buraimi", "al_hamra", "duqm", "dank", "shinas", "liwa", "mahwit", "masirah"];
    const city_codes_kuwait = ["kuwait_city", "hawalli", "salmiya", "farwaniya", "jleeb_al_shuyoukh", "fahaheel", "mangaf", "abu_halifa", "mahboula", "al_jahra", "sabah_al_salem", "sulaibikhat", "raqai", "mishref", "jabriya", "shalim", "al_zour", "wafra", "abdali", "al_ardiyah"];
    const city_codes_bahrein = ["manama", "muharraq", "riffa", "hamad_town", "isa_town", "sitra", "jidhafs", "zallaq", "duraz", "budaiya", "bilad_al_qadeem", "ain_adari", "seef", "saar", "janabiyah", "busaiteen", "jasra", "karzakan", "malikiya", "diraz", "maameer", "buri", "hidd", "al_dar"];
    const city_codes_qatar = ["doha", "al_rayyan", "al_wakrah", "umm_said", "madinat_ash_shamal", "al_khor", "al_shahaniya", "dukhan", "mesaieed", "ras_laffan", "al_wukair", "al_thakhira", "al_ghuwariyah", "al_jumaliyah", "fuwayrit", "al_karanaah", "ash_shihaniyah", "simaismah"];
    const city_codes_uae = ["abu_dhabi", "dubai", "sharjah", "al_ain", "ajman", "ras_al_khaimah", "fujairah", "umm_al_quwain", "khor_fakkan", "dibba_al_fujairah", "kalba", "al_dhaid", "al_madam", "al_jazirah_al_hamra", "masafi", "hili", "al_qua"];

    const cities = [];

    if (includeCountry.length > 0) {

        if (includeCountry.includes("SA")) {
            city_codes_sar.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

        if (includeCountry.includes("OM")) {
            city_codes_oman.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

        if (includeCountry.includes("BH")) {
            city_codes_bahrein.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

        if (includeCountry.includes("KW")) {
            city_codes_kuwait.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

        if (includeCountry.includes("AE")) {
            city_codes_uae.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

        if (includeCountry.includes("QA")) {
            city_codes_qatar.forEach(city_code => {
                cities.push({
                    value: city_code,
                    label: t(`general.city.${city_code}`)
                });
            });
        }

    }
    else {
        city_codes_sar.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
        city_codes_oman.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
        city_codes_kuwait.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
        city_codes_bahrein.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
        city_codes_qatar.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
        city_codes_uae.forEach(city_code => {
            cities.push({
                value: city_code,
                label: t(`general.city.${city_code}`)
            });
        });
    }

    return cities;
};