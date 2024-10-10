import axios from "axios";
import {
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

export const useGetSkillsHook = () => {
    const { t } = useTranslation();

    const skill_codes = ["team_player", "communication", "problem_solving", "leadership", "time_management", "critical_thinking", "adaptability", "integrity", "attention_to_detail", "work_ethic", "project_management", "customer_service", "creativity", "interpersonal_skills", "conflict_resolution", "data_analysis", "it_skills", "mathematics", "sales_ability", "persuasion", "negotiation", "stress_management", "organization", "punctuality", "public_speaking", "financial_planning", "writing", "reporting", "programming", "analytics", "seo_sem_marketing", "software_proficiency", "graphic_design", "statistical_analysis", "team_building", "strategic_planning", "digital_marketing", "networking", "technical_support", "resource_management", "training", "quality_control", "database_management", "empowerment_skills", "budgeting", "decision_making", "innovation", "environmental_awareness", "health_and_safety", "product_development", "business_development", "logistics", "translation", "research", "legal_compliance", "risk_management", "change_management", "performance_management", "customer_relationship_management", "inventory_management", "policy_formulation", "information_management", "fiscal_management", "process_improvement", "artistic_ability", "scheduling", "coaching", "mentoring", "counseling", "programming_languages", "cybersecurity", "data_entry", "erp_experience", "crm_software", "mobile_development", "cloud_computing", "ui_ux_design", "version_control", "software_testing", "hardware_skills", "machine_learning", "data_visualization", "ai_knowledge", "blockchain_technology", "quantitative_research", "corporate_law", "therapeutic_expertise", "biotechnology", "scientific_research", "event_planning", "fundraising", "volunteer_management", "nonprofit_management", "campaign_management", "political_campaigning", "administrative_support", "advertising", "analytical_skills", "branding", "business_intelligence", "business_strategy", "content_creation", "content_management", "contract_negotiation", "creative_writing", "crisis_management", "customer_insight", "data_architecture", "data_security", "database_design", "design_thinking", "digital_media", "e-commerce", "email_marketing", "employee_relations", "energy_management", "engineering", "enterprise_software", "entrepreneurship", "event_management", "executive_management", "facilities_management", "field_operations", "financial_accounting", "financial_analysis", "financial_reporting", "foreign_languages", "fund_accounting", "geographic_information_systems", "grant_writing", "graphic_communication", "health_care_management", "hospitality", "human_resources", "information_design", "information_security", "infrastructure_management", "intellectual_property", "interaction_design", "international_business", "internet_marketing", "investment_management", "investor_relations", "journalism", "labor_relations", "leadership_development", "learning_and_development", "leasing_management", "litigation", "market_analysis", "market_research", "marketing_communication", "media_planning", "mergers_and_acquisitions", "mobile_marketing", "network_administration", "online_marketing", "operational_planning", "payroll_management", "performance_analysis", "personal_development", "pharmaceuticals", "photography", "portfolio_management", "presentation_skills", "product_marketing", "professional_networking", "project_coordination", "public_relations", "quality_assurance", "quality_management", "real_estate", "recruitment", "regulatory_compliance", "retail_management", "risk_assessment", "sales_management", "search_engine_optimization", "security_management", "social_media_management", "software_development", "staff_management", "statistical_modeling", "supply_chain_management", "tax_preparation", "teaching", "technical_writing", "telecommunications", "trade_marketing", "training_and_development", "video_production", "web_design", "web_development", "cooking", "driving", "basic_computer_skills", "cleaning", "maintenance", "machine_operation", "plumbing", "carpentry", "electrical_work", "landscaping", "painting", "welding", "masonry", "tailoring", "gardening", "forklift_operation", "barista_skills", "cash_handling", "inventory_stocking", "security_guard", "receptionist_skills", "call_center_operations", "food_service", "bartending", "housekeeping", "child_care", "elder_care", "animal_care", "fitness_training", "personal_shopping", "delivery_services", "taxi_service", "event_setup", "audio_setup", "video_setup", "computer_repair", "smartphone_repair", "baking", "butchery", "phlebotomy", "medical_assistance", "dental_assistance", "pharmacy_technician", "radiology_technician", "clinical_data_entry", "environmental_cleanup", "pest_control", "pool_maintenance", "roofing", "catering", "sewing", "upholstery", "shoe_repair", "jewelry_making", "pottery", "sculpting", "flower_arranging", "wedding_planning", "tour_guiding", "photography_services", "makeup_artistry", "hair_styling", "massage_therapy", "nail_technician", "skin_care", "tattoo_artistry", "yoga_instruction", "martial_arts_training", "bicycle_repair", "auto_mechanics", "boat_maintenance", "aircraft_maintenance", "train_conducting", "bus_driving", "truck_driving", "warehouse_management", "quality_inspection", "assembly_line_work", "textile_processing", "metal_fabrication", "glass_blowing", "leatherworking", "bookbinding", "printing", "packaging", "sorting", "loading", "unloading", "dispatching", "routing", "scheduling_logistics", "transport_management", "cargo_handling", "freight_brokering", "import_export_management", "customs_brokering", "shipping_coordinator", "material_handling", "purchasing", "procurement", "contract_management", "vendor_management", "supply_management", "inventory_control", "stock_management", "order_fulfillment", "distribution_management", "logistics_coordination", "logistics_analysis", "production_planning", "production_management", "factory_management", "plant_management", "industrial_management", "site_supervision", "construction_management", "building_maintenance", "electrical_installation", "plastering", "tiling", "flooring", "bricklaying", "concrete_finishing", "insulation", "window_installation", "door_installation", "cabinet_making", "furniture_assembly", "furniture_design", "interior_design", "exterior_design", "landscape_design", "urban_planning", "architecture", "civil_engineering", "mechanical_engineering", "electrical_engineering", "chemical_engineering", "biomedical_engineering", "aerospace_engineering", "environmental_engineering", "agricultural_engineering", "marine_engineering", "nuclear_engineering", "software_engineering", "network_engineering", "system_administration", "database_administration", "system_analysis", "it_consulting", "technology_management", "data_management", "information_systems_management", "project_management_professional", "certified_information_systems_security_professional", "microsoft_certified_solutions_expert", "cisco_certified_network_associate", "certified_public_accountant", "chartered_financial_analyst", "certified_management_accountant", "certified_internal_auditor", "certified_fraud_examiner", "certified_information_systems_auditor", "certified_healthcare_financial_professional", "certified_financial_planner", "certified_financial_services_auditor", "certified_financial_marketer", "certified_credit_executive", "certified_bank_auditor", "certified_anti_money_laundering_specialist", "certified_public_bookkeeper", "enrolled_agent", "licensed_practical_nurse", "certified_nursing_assistant", "registered_nurse", "physician_assistant", "medical_doctor", "dental_hygienist", "optometrist", "pharmacist", "physical_therapist", "occupational_therapist", "speech_pathologist", "audiologist", "chiropodist", "chiropractor", "osteopath", "podiatrist", "dietitian", "nutritionist", "health_educator", "community_health_worker", "public_health_nurse", "health_information_technician", "medical_records_administrator", "health_services_manager", "clinical_laboratory_technologist", "medical_laboratory_technician", "biomedical_equipment_technician", "radiologic_technologist", "nuclear_medicine_technologist", "sonographer", "cardiovascular_technologist", "respiratory_therapist", "surgical_technologist", "anesthesia_technician", "sterile_processing_technician", "emergency_medical_technician", "paramedic", "firefighter", "police_officer", "security_officer", "corrections_officer", "probation_officer", "bailiff", "court_clerk", "legal_secretary", "paralegal", "lawyer", "judge", "mediator", "arbitrator", "legal_assistant", "legal_researcher", "legal_consultant", "legal_advisor", "solicitor", "barrister", "advocate", "notary_public", "title_examiner", "title_searcher", "claims_adjuster", "claims_examiner", "insurance_underwriter", "insurance_agent", "insurance_broker", "actuary"];
    const skills = [];

    skill_codes.forEach(skill => {
        skills.push({
            value: skill,
            label: t(`general.skill.${skill}`)
        });
    });

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