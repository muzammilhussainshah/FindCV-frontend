export const formatDateForMySQL = (selectedDate) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // getMonth() is zero-indexed
    const day = (`0${date.getDate()}`).slice(-2);
  
    return `${year}-${month}-${day}`;
};

export const formatLanguageCodeEmoji = (code) => {
    let result = false;

    switch (code) {
        case 'AA':
            result = 'ET'; // Afar is predominantly spoken in Ethiopia
            break;
        case 'AB':
            result = 'GE'; // Abkhazian is predominantly spoken in Georgia
            break;
        case 'AF':
            result = 'ZA'; // Afrikaans is predominantly spoken in South Africa
            break;
        case 'AK':
            result = 'GH'; // Akan is predominantly spoken in Ghana
            break;
        case 'AM':
            result = 'ET'; // Amharic is predominantly spoken in Ethiopia
            break;
        case 'AN':
            result = 'ES'; // Aragonese is spoken in Spain, though not the majority language
            break;
        case 'AR':
            result = 'SA'; // Arabic has many speakers, but Saudi Arabia is a central location
            break;
        case 'AS':
            result = 'IN'; // Assamese is predominantly spoken in India
            break;
        case 'AV':
            result = 'RU'; // Avar is spoken in Russia, especially Dagestan
            break;
        case 'AY':
            result = 'BO'; // Aymara is predominantly spoken in Bolivia
            break;
        case 'AZ':
            result = 'AZ'; // Azerbaijani is predominantly spoken in Azerbaijan
            break;
        case 'BA':
            result = 'RU'; // Bashkir is spoken in Russia, particularly in Bashkortostan
            break;
        case 'BE':
            result = 'BY'; // Belarusian is predominantly spoken in Belarus
            break;
        case 'BG':
            result = 'BG'; // Bulgarian is predominantly spoken in Bulgaria
            break;
        case 'BH':
            result = 'IN'; // Bihari languages are spoken in India
            break;
        case 'BI':
            result = 'VU'; // Bislama is an official language of Vanuatu
            break;
        case 'BM':
            result = 'ML'; // Bambara is predominantly spoken in Mali
            break;
        case 'BN':
            result = 'BD'; // Bengali is predominantly spoken in Bangladesh
            break;
        case 'BO':
            result = 'CN'; // Tibetan is predominantly spoken in the Tibetan regions of China
            break;
        case 'BR':
            result = 'FR'; // Breton is spoken in Brittany, France
            break;
        case 'BS':
            result = 'BA'; // Bosnian is predominantly spoken in Bosnia and Herzegovina
            break;
        case 'CA':
            result = 'ES'; // Catalan is spoken in Catalonia, Spain
            break;
        case 'CH':
            result = 'GU'; // Chamorro is the native language of Guam
            break;
        case 'CO':
            result = 'FR'; // Corsican is spoken on the island of Corsica, France
            break;
        case 'CS':
            result = 'CZ'; // Czech is predominantly spoken in the Czech Republic
            break;
        case 'DA':
            result = 'DK'; // Danish is predominantly spoken in Denmark
            break;
        case 'DE':
            result = 'DE'; // German is predominantly spoken in Germany
            break;
        case 'DV':
            result = 'MV'; // Divehi is predominantly spoken in the Maldives
            break;
        case 'DZ':
            result = 'BT'; // Dzongkha is the national language of Bhutan
            break;
        case 'EE':
            result = 'GH'; // Ewe is predominantly spoken in Ghana
            break;
        case 'EL':
            result = 'GR'; // Greek is predominantly spoken in Greece
            break;
        case 'EN':
            result = 'GB'; // English is predominantly spoken in the United Kingdom
            break;
        case 'ES':
            result = 'ES'; // Spanish is predominantly spoken in Spain
            break;
        case 'ET':
            result = 'EE'; // Estonian is predominantly spoken in Estonia
            break;
        case 'EU':
            result = 'ES'; // Basque is spoken in the Basque Country, Spain
            break;
        case 'FA':
            result = 'IR'; // Persian is predominantly spoken in Iran
            break;
        case 'FF':
            result = 'SN'; // Peul (Fula) is widely spoken in Senegal
            break;
        case 'FI':
            result = 'FI'; // Finnish is predominantly spoken in Finland
            break;
        case 'FJ':
            result = 'FJ'; // Fijian is the official language of Fiji
            break;
        case 'FO':
            result = 'FO'; // Faroese is predominantly spoken in the Faroe Islands
            break;
        case 'FR':
            result = 'FR'; // French is predominantly spoken in France
            break;
        case 'FY':
            result = 'NL'; // West Frisian is predominantly spoken in the Netherlands
            break;
        case 'GA':
            result = 'IE'; // Irish is predominantly spoken in Ireland
            break;
        case 'GD':
            result = 'GB'; // Scottish Gaelic is predominantly spoken in Scotland, UK
            break;
        case 'GL':
            result = 'ES'; // Galician is spoken in Galicia, Spain
            break;
        case 'GN':
            result = 'PY'; // Guarani is one of the official languages of Paraguay
            break;
        case 'GU':
            result = 'IN'; // Gujarati is predominantly spoken in India
            break;
        case 'GV':
            result = 'IM'; // Manx is spoken on the Isle of Man
            break;
        case 'HA':
            result = 'NG'; // Hausa is predominantly spoken in Nigeria
            break;
        case 'HE':
            result = 'IL'; // Hebrew is predominantly spoken in Israel
            break;
        case 'HI':
            result = 'IN'; // Hindi is predominantly spoken in India
            break;
        case 'HO':
            result = 'PG'; // Hiri Motu is one of the official languages of Papua New Guinea
            break;
        case 'HR':
            result = 'HR'; // Croatian is predominantly spoken in Croatia
            break;
        case 'HT':
            result = 'HT'; // Haitian (Haitian Creole) is predominantly spoken in Haiti
            break;
        case 'HU':
            result = 'HU'; // Hungarian is predominantly spoken in Hungary
            break;
        case 'HY':
            result = 'AM'; // Armenian is predominantly spoken in Armenia
            break;
        case 'HZ':
            result = 'NA'; // Herero is spoken in Namibia
            break;
        case 'ID':
            result = 'ID'; // Indonesian is predominantly spoken in Indonesia
            break;
        case 'IG':
            result = 'NG'; // Igbo is predominantly spoken in Nigeria
            break;
        case 'II':
            result = 'CN'; // Sichuan Yi is predominantly spoken in Sichuan, China
            break;
        case 'IK':
            result = 'US'; // Inupiaq is spoken in Alaska, USA
            break;
        case 'IS':
            result = 'IS'; // Icelandic is predominantly spoken in Iceland
            break;
        case 'IT':
            result = 'IT'; // Italian is predominantly spoken in Italy
            break;
        case 'IU':
            result = 'CA'; // Inuktitut is predominantly spoken in northern Canada
            break;
        case 'JA':
            result = 'JP'; // Japanese is predominantly spoken in Japan
            break;
        case 'JV':
            result = 'ID'; // Javanese is predominantly spoken in Indonesia
            break;
        case 'KA':
            result = 'GE'; // Georgian is predominantly spoken in Georgia
            break;
        case 'KG':
            result = 'CG'; // Kongo is spoken in the Republic of Congo
            break;
        case 'KI':
            result = 'KE'; // Kikuyu is predominantly spoken in Kenya
            break;
        case 'KJ':
            result = 'AO'; // Kuanyama is spoken in Angola
            break;
        case 'KK':
            result = 'KZ'; // Kazakh is predominantly spoken in Kazakhstan
            break;
        case 'KL':
            result = 'GL'; // Greenlandic is the official language of Greenland
            break;
        case 'KM':
            result = 'KH'; // Cambodian (Khmer) is predominantly spoken in Cambodia
            break;
        case 'KN':
            result = 'IN'; // Kannada is predominantly spoken in India
            break;
        case 'KO':
            result = 'KR'; // Korean is predominantly spoken in South Korea
            break;
        case 'KR':
            result = 'NE'; // Kanuri is spoken in Niger
            break;
        case 'KS':
            result = 'IN'; // Kashmiri is predominantly spoken in India
            break;
        case 'KU':
            result = 'IQ'; // Kurdish is predominantly spoken in Iraq
            break;
        case 'KW':
            result = 'GB'; // Cornish is spoken in Cornwall, United Kingdom
            break;
        case 'KY':
            result = 'KG'; // Kirghiz is predominantly spoken in Kyrgyzstan
            break;
        case 'LA':
            result = 'VA'; // Latin, though not a national language, is official in Vatican City for its historical significance
            break;
        case 'LB':
            result = 'LU'; // Luxembourgish is predominantly spoken in Luxembourg
            break;
        case 'LG':
            result = 'UG'; // Ganda is predominantly spoken in Uganda
            break;
        case 'LI':
            result = 'NL'; // Limburgian is spoken in the Limburg region, Netherlands
            break;
        case 'LN':
            result = 'CD'; // Lingala is widely spoken in the Democratic Republic of Congo
            break;
        case 'LO':
            result = 'LA'; // Laotian is the official language of Laos
            break;
        case 'LT':
            result = 'LT'; // Lithuanian is the official language of Lithuania
            break;
        case 'LV':
            result = 'LV'; // Latvian is the official language of Latvia
            break;
        case 'MG':
            result = 'MG'; // Malagasy is the national language of Madagascar
            break;
        case 'MH':
            result = 'MH'; // Marshallese is the national language of the Marshall Islands
            break;
        case 'MI':
            result = 'NZ'; // Maori is an official language of New Zealand
            break;
        case 'MK':
            result = 'MK'; // Macedonian is the official language of North Macedonia
            break;
        case 'ML':
            result = 'IN'; // Malayalam is predominantly spoken in the state of Kerala, India
            break;
        case 'MN':
            result = 'MN'; // Mongolian is the official language of Mongolia
            break;
        case 'MO':
            result = 'MD'; // Moldovan, considered the same as Romanian, is spoken in Moldova
            break;
        case 'MR':
            result = 'IN'; // Marathi is predominantly spoken in the state of Maharashtra, India
            break;
        case 'MS':
            result = 'MY'; // Malay is predominantly spoken in Malaysia
            break;
        case 'MT':
            result = 'MT'; // Maltese is the official language of Malta
            break;
        case 'MY':
            result = 'MM'; // Burmese is the official language of Myanmar
            break;
        case 'NA':
            result = 'NR'; // Nauruan is the national language of Nauru
            break;
        case 'ND':
            result = 'ZW'; // North Ndebele is spoken in Zimbabwe
            break;
        case 'NE':
            result = 'NP'; // Nepali is the official language of Nepal
            break;
        case 'NG':
            result = 'NA'; // Ndonga is spoken in Namibia
            break;
        case 'NL':
            result = 'NL'; // Dutch is the official language of the Netherlands
            break;
        case 'NN':
            result = 'NO'; // Norwegian Nynorsk is one of the written standards in Norway
            break;
        case 'NO':
            result = 'NO'; // Norwegian is the official language of Norway
            break;
        case 'NR':
            result = 'ZA'; // South Ndebele is spoken in South Africa
            break;
        case 'NV':
            result = 'US'; // Navajo is spoken in the Southwestern United States
            break;
        case 'NY':
            result = 'MW'; // Chichewa is the national language of Malawi
            break;
        case 'OC':
            result = 'FR'; // Occitan is spoken in Southern France
            break;
        case 'OJ':
            result = 'CA'; // Ojibwa is spoken in Canada
            break;
        case 'OM':
            result = 'ET'; // Oromo is widely spoken in Ethiopia
            break;
        case 'OR':
            result = 'IN'; // Oriya is predominantly spoken in the state of Odisha, India
            break;
        case 'OS':
            result = 'GE'; // Ossetian is spoken in Georgia
            break;
        case 'PA':
            result = 'IN'; // Punjabi is predominantly spoken in the state of Punjab, India
            break;
        case 'PL':
            result = 'PL'; // Polish is predominantly spoken in Poland
            break;
        case 'PS':
            result = 'AF'; // Pashto is one of the official languages of Afghanistan
            break;
        case 'PT':
            result = 'PT'; // Portuguese is predominantly spoken in Portugal
            break;
        case 'QU':
            result = 'PE'; // Quechua is an official language in Peru
            break;
        case 'RM':
            result = 'CH'; // Raeto Romance is spoken in Switzerland
            break;
        case 'RN':
            result = 'BI'; // Kirundi is the official language of Burundi
            break;
        case 'RO':
            result = 'RO'; // Romanian is predominantly spoken in Romania
            break;
        case 'RU':
            result = 'RU'; // Russian is predominantly spoken in Russia
            break;
        case 'RW':
            result = 'RW'; // Rwandi (Kinyarwanda) is the official language of Rwanda
            break;
        case 'SA':
            result = 'IN'; // Sanskrit, ancient language, historically significant in India
            break;
        case 'SC':
            result = 'IT'; // Sardinian is spoken in Sardinia, Italy
            break;
        case 'SD':
            result = 'PK'; // Sindhi is predominantly spoken in Pakistan
            break;
        case 'SG':
            result = 'CF'; // Sango is an official language of the Central African Republic
            break;
        case 'SH':
            result = 'RS'; // Serbo-Croatian, assigning to Serbia for simplification
            break;
        case 'SI':
            result = 'LK'; // Sinhalese is predominantly spoken in Sri Lanka
            break;
        case 'SK':
            result = 'SK'; // Slovak is the official language of Slovakia
            break;
        case 'SL':
            result = 'SI'; // Slovenian is the official language of Slovenia
            break;
        case 'SM':
            result = 'WS'; // Samoan is the national language of Samoa
            break;
        case 'SN':
            result = 'ZW'; // Shona is predominantly spoken in Zimbabwe
            break;
        case 'SO':
            result = 'SO'; // Somali is predominantly spoken in Somalia
            break;
        case 'SQ':
            result = 'AL'; // Albanian is predominantly spoken in Albania
            break;
        case 'SR':
            result = 'RS'; // Serbian is predominantly spoken in Serbia
            break;
        case 'SS':
            result = 'SZ'; // Swati is predominantly spoken in Eswatini (Swaziland)
            break;
        case 'ST':
            result = 'LS'; // Southern Sotho is one of the official languages of Lesotho
            break;
        case 'SU':
            result = 'ID'; // Sundanese is predominantly spoken in West Java, Indonesia
            break;
        case 'SV':
            result = 'SE'; // Swedish is predominantly spoken in Sweden
            break;
        case 'SW':
            result = 'TZ'; // Swahili is an official language of Tanzania and widely spoken in East Africa
            break;
        case 'TA':
            result = 'IN'; // Tamil is predominantly spoken in Tamil Nadu, India, and in Sri Lanka
            break;
        case 'TE':
            result = 'IN'; // Telugu is predominantly spoken in Andhra Pradesh and Telangana, India
            break;
        case 'TG':
            result = 'TJ'; // Tajik is predominantly spoken in Tajikistan
            break;
        case 'TH':
            result = 'TH'; // Thai is predominantly spoken in Thailand
            break;
        case 'TI':
            result = 'ER'; // Tigrinya is predominantly spoken in Eritrea
            break;
        case 'TK':
            result = 'TM'; // Turkmen is predominantly spoken in Turkmenistan
            break;
        case 'TL':
            result = 'PH'; // Tagalog (Filipino) is predominantly spoken in the Philippines
            break;
        case 'TN':
            result = 'BW'; // Tswana is one of the official languages of Botswana
            break;
        case 'TO':
            result = 'TO'; // Tongan is the national language of Tonga
            break;
        case 'TR':
            result = 'TR'; // Turkish is predominantly spoken in Turkey
            break;
        case 'TS':
            result = 'ZA'; // Tsonga is spoken in South Africa
            break;
        case 'TW':
            result = 'GH'; // Twi is spoken in Ghana
            break;
        case 'TY':
            result = 'PF'; // Tahitian is spoken in French Polynesia
            break;
        case 'UG':
            result = 'CN'; // Uyghur is spoken in Xinjiang, China
            break;
        case 'UK':
            result = 'UA'; // Ukrainian is the official language of Ukraine
            break;
        case 'UR':
            result = 'PK'; // Urdu is the national language of Pakistan
            break;
        case 'VE':
            result = 'ZA'; // Venda is spoken in South Africa
            break;
        case 'VI':
            result = 'VN'; // Vietnamese is the official language of Vietnam
            break;
        case 'WA':
            result = 'BE'; // Walloon is spoken in Belgium
            break;
        case 'WO':
            result = 'SN'; // Wolof is the most widely spoken language in Senegal
            break;
        case 'XH':
            result = 'ZA'; // Xhosa is one of the official languages of South Africa
            break;
        case 'YI':
            result = 'UN'; // Yiddish, while international, has significant speakers in Jewish communities worldwide
            break;
        case 'YO':
            result = 'NG'; // Yoruba is widely spoken in Nigeria
            break;
        case 'ZA':
            result = 'CN'; // Zhuang is spoken in Guangxi, China
            break;
        case 'ZH':
            result = 'CN'; // Chinese is predominantly spoken in China
            break;
        case 'ZU':
            result = 'ZA'; // Zulu is one of the official languages of South Africa
            break;   
        default:
            result = false;
    }

    return result;
};

export const getLanguageLevelCode = (level) => {

    let code = '';

    switch (level) {
        case 1:
            code = 'A1';
            break;
        case 2:
            code = 'A2';
            break;
        case 3:
            code = 'B1';
            break;
        case 4:
            code = 'B2';
            break;
        case 5:
            code = 'C1';
            break;
        case 6:
            code = 'C2';
            break;
        default:
            code = 'A1';
    }

    return code;
}

export const getCurrencySymbol = (currency_code) => {
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
    const currency = currencies_list.find(currency => currency.code === currency_code);

    return currency.symbol;
}

export const getTimeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };
  
    let unit = 'second';
    let count = seconds;
  
    for (const [key, value] of Object.entries(intervals)) {
        if (seconds >= value) {
            unit = key;
            count = Math.floor(seconds / value);
            break;
        }
    }
  
    const unit_plural = count > 1 ? unit + 's' : unit;

    return {
        count,
        unit,
        unit_plural
    };
}