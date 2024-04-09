import { useTranslation } from "react-i18next";

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
}