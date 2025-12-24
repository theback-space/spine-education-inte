export interface VertebraData {
  id: string
  name: string
  fullName: string
  region: string
  nerveSupply: string[]
  associatedOrgans: string[]
  commonSymptoms: string[]
  description: string
}

export const spineData: Record<string, VertebraData> = {
  C1: {
    id: "C1",
    name: "C1",
    fullName: "Atlas (1st Cervical)",
    region: "Cervical",
    nerveSupply: ["Blood supply to the head", "Pituitary gland", "Scalp", "Brain", "Inner & middle ear", "Sympathetic nervous system"],
    associatedOrgans: ["Brain", "Pituitary", "Scalp", "Ears"],
    commonSymptoms: ["Headaches", "Migraines", "Nervousness", "Insomnia", "Head colds", "High blood pressure", "Memory issues", "Chronic fatigue", "Dizziness"],
    description: "The Atlas supports your head and affects blood flow to the brain. Misalignment here can impact your entire nervous system."
  },
  C2: {
    id: "C2",
    name: "C2",
    fullName: "Axis (2nd Cervical)",
    region: "Cervical",
    nerveSupply: ["Eyes", "Optic nerves", "Auditory nerves", "Sinuses", "Mastoid bones", "Tongue", "Forehead"],
    associatedOrgans: ["Eyes", "Ears", "Sinuses", "Tongue"],
    commonSymptoms: ["Sinus trouble", "Allergies", "Eye problems", "Earaches", "Fainting spells", "Certain cases of blindness", "Crossed eyes", "Deafness"],
    description: "C2 influences your senses - vision, hearing, and sinus function. Issues here often manifest as sensory problems."
  },
  C3: {
    id: "C3",
    name: "C3",
    fullName: "3rd Cervical",
    region: "Cervical",
    nerveSupply: ["Cheeks", "Outer ear", "Face bones", "Teeth", "Trifacial nerve"],
    associatedOrgans: ["Face", "Teeth", "Ears"],
    commonSymptoms: ["Neuralgia", "Neuritis", "Acne", "Pimples", "Eczema", "Trigeminal neuralgia"],
    description: "This vertebra affects facial nerves and skin. Subluxations can cause facial pain and skin conditions."
  },
  C4: {
    id: "C4",
    name: "C4",
    fullName: "4th Cervical",
    region: "Cervical",
    nerveSupply: ["Nose", "Lips", "Mouth", "Eustachian tube"],
    associatedOrgans: ["Nose", "Lips", "Mouth", "Eustachian tubes"],
    commonSymptoms: ["Hay fever", "Catarrh", "Hearing loss", "Adenoids"],
    description: "C4 controls the nose, mouth, and eustachian tubes. Misalignment often leads to respiratory and hearing issues."
  },
  C5: {
    id: "C5",
    name: "C5",
    fullName: "5th Cervical",
    region: "Cervical",
    nerveSupply: ["Vocal cords", "Neck glands", "Pharynx"],
    associatedOrgans: ["Throat", "Vocal cords", "Neck glands"],
    commonSymptoms: ["Laryngitis", "Hoarseness", "Throat conditions", "Sore throat", "Chronic cough"],
    description: "This area controls throat function and voice. Problems here often affect speaking and swallowing."
  },
  C6: {
    id: "C6",
    name: "C6",
    fullName: "6th Cervical",
    region: "Cervical",
    nerveSupply: ["Neck muscles", "Shoulders", "Tonsils"],
    associatedOrgans: ["Shoulders", "Neck", "Tonsils"],
    commonSymptoms: ["Stiff neck", "Pain in upper arm", "Tonsillitis", "Whooping cough", "Croup"],
    description: "C6 affects shoulder and neck muscles. Misalignment commonly causes neck stiffness and shoulder pain."
  },
  C7: {
    id: "C7",
    name: "C7",
    fullName: "7th Cervical (Vertebra Prominens)",
    region: "Cervical",
    nerveSupply: ["Thyroid gland", "Shoulders", "Elbows", "Arms"],
    associatedOrgans: ["Thyroid", "Shoulders", "Arms"],
    commonSymptoms: ["Bursitis", "Colds", "Thyroid conditions", "Arm pain", "Tennis elbow"],
    description: "The last cervical vertebra influences the thyroid and arms. Issues here can affect metabolism and arm function."
  },
  T1: {
    id: "T1",
    name: "T1",
    fullName: "1st Thoracic",
    region: "Thoracic",
    nerveSupply: ["Arms from elbows down", "Hands", "Wrists", "Fingers", "Esophagus", "Trachea"],
    associatedOrgans: ["Arms", "Hands", "Esophagus"],
    commonSymptoms: ["Asthma", "Cough", "Difficult breathing", "Shortness of breath", "Pain in forearms and hands"],
    description: "T1 controls the lower arms and respiratory passages. Compression affects breathing and hand function."
  },
  T2: {
    id: "T2",
    name: "T2",
    fullName: "2nd Thoracic",
    region: "Thoracic",
    nerveSupply: ["Heart", "Coronary arteries"],
    associatedOrgans: ["Heart", "Coronary arteries"],
    commonSymptoms: ["Functional heart conditions", "Chest pain", "Heart palpitations"],
    description: "This vertebra directly influences heart function. Subluxations may contribute to heart rhythm irregularities."
  },
  T3: {
    id: "T3",
    name: "T3",
    fullName: "3rd Thoracic",
    region: "Thoracic",
    nerveSupply: ["Lungs", "Bronchial tubes", "Pleura", "Chest", "Breast"],
    associatedOrgans: ["Lungs", "Bronchial tubes", "Chest"],
    commonSymptoms: ["Bronchitis", "Pleurisy", "Pneumonia", "Flu", "Chest congestion"],
    description: "T3 affects lung function and breathing. Problems here often manifest as respiratory conditions."
  },
  T4: {
    id: "T4",
    name: "T4",
    fullName: "4th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Gallbladder", "Common duct"],
    associatedOrgans: ["Gallbladder", "Bile ducts"],
    commonSymptoms: ["Gallbladder conditions", "Jaundice", "Shingles", "Upper abdominal pain"],
    description: "This area controls the gallbladder. Misalignment can affect digestion and bile flow."
  },
  T5: {
    id: "T5",
    name: "T5",
    fullName: "5th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Liver", "Solar plexus", "Blood circulation"],
    associatedOrgans: ["Liver", "Solar plexus"],
    commonSymptoms: ["Liver conditions", "Fevers", "Low blood pressure", "Anemia", "Poor circulation", "Fatigue"],
    description: "T5 influences the liver and overall circulation. Issues affect detoxification and energy levels."
  },
  T6: {
    id: "T6",
    name: "T6",
    fullName: "6th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Stomach"],
    associatedOrgans: ["Stomach"],
    commonSymptoms: ["Stomach troubles", "Indigestion", "Heartburn", "Dyspepsia", "Nervous stomach"],
    description: "This vertebra directly affects stomach function. Compression often leads to digestive discomfort."
  },
  T7: {
    id: "T7",
    name: "T7",
    fullName: "7th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Pancreas", "Duodenum"],
    associatedOrgans: ["Pancreas", "Duodenum"],
    commonSymptoms: ["Ulcers", "Gastritis", "Blood sugar imbalances", "Digestive issues"],
    description: "T7 controls the pancreas and can affect blood sugar regulation and digestion."
  },
  T8: {
    id: "T8",
    name: "T8",
    fullName: "8th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Spleen", "Diaphragm"],
    associatedOrgans: ["Spleen", "Diaphragm"],
    commonSymptoms: ["Lowered resistance", "Hiccups", "Immune system weakness"],
    description: "This area affects immune function through the spleen. Misalignment can reduce your body's defenses."
  },
  T9: {
    id: "T9",
    name: "T9",
    fullName: "9th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Adrenal glands"],
    associatedOrgans: ["Adrenal glands"],
    commonSymptoms: ["Allergies", "Hives", "Stress response issues", "Fatigue"],
    description: "T9 influences the adrenal glands that control stress response and energy."
  },
  T10: {
    id: "T10",
    name: "T10",
    fullName: "10th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Kidneys"],
    associatedOrgans: ["Kidneys"],
    commonSymptoms: ["Kidney troubles", "Hardening of arteries", "Chronic tiredness", "Fluid retention"],
    description: "This vertebra affects kidney function and fluid balance in your body."
  },
  T11: {
    id: "T11",
    name: "T11",
    fullName: "11th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Kidneys", "Ureters"],
    associatedOrgans: ["Kidneys", "Ureters"],
    commonSymptoms: ["Skin conditions", "Acne", "Pimples", "Eczema", "Boils"],
    description: "T11 influences kidney function and can affect skin health through toxin elimination."
  },
  T12: {
    id: "T12",
    name: "T12",
    fullName: "12th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Small intestines", "Lymph circulation"],
    associatedOrgans: ["Small intestines", "Lymphatic system"],
    commonSymptoms: ["Rheumatism", "Gas pains", "Certain types of infertility", "Bloating"],
    description: "The last thoracic vertebra affects nutrient absorption and lymphatic drainage."
  },
  L1: {
    id: "L1",
    name: "L1",
    fullName: "1st Lumbar",
    region: "Lumbar",
    nerveSupply: ["Large intestine", "Inguinal rings"],
    associatedOrgans: ["Large intestine", "Colon"],
    commonSymptoms: ["Constipation", "Colitis", "Diarrhea", "Hernias"],
    description: "L1 controls the large intestine. Issues here commonly cause bowel irregularities."
  },
  L2: {
    id: "L2",
    name: "L2",
    fullName: "2nd Lumbar",
    region: "Lumbar",
    nerveSupply: ["Appendix", "Abdomen", "Upper leg"],
    associatedOrgans: ["Appendix", "Abdomen", "Thighs"],
    commonSymptoms: ["Appendicitis", "Cramps", "Difficult breathing", "Acidosis", "Varicose veins"],
    description: "This area affects the abdomen and upper legs. Compression can cause digestive and leg issues."
  },
  L3: {
    id: "L3",
    name: "L3",
    fullName: "3rd Lumbar",
    region: "Lumbar",
    nerveSupply: ["Sex organs", "Ovaries/Testicles", "Uterus", "Bladder", "Knees"],
    associatedOrgans: ["Reproductive organs", "Bladder", "Knees"],
    commonSymptoms: ["Bladder troubles", "Menstrual troubles", "Miscarriages", "Bed wetting", "Impotency", "Knee pain"],
    description: "L3 influences reproductive and urinary systems, plus knee function."
  },
  L4: {
    id: "L4",
    name: "L4",
    fullName: "4th Lumbar",
    region: "Lumbar",
    nerveSupply: ["Prostate gland", "Lower back muscles", "Sciatic nerve"],
    associatedOrgans: ["Prostate", "Lower back", "Sciatic nerve"],
    commonSymptoms: ["Sciatica", "Lumbago", "Difficult/painful urination", "Backaches", "Frequent urination"],
    description: "This vertebra is often involved in sciatica and low back pain. Also affects prostate health."
  },
  L5: {
    id: "L5",
    name: "L5",
    fullName: "5th Lumbar",
    region: "Lumbar",
    nerveSupply: ["Lower legs", "Ankles", "Feet", "Arches"],
    associatedOrgans: ["Legs", "Ankles", "Feet"],
    commonSymptoms: ["Poor circulation in legs", "Swollen ankles", "Weak ankles and arches", "Cold feet", "Leg cramps"],
    description: "The last lumbar vertebra affects your legs and feet. Problems here impact walking and standing."
  },
  SACRUM: {
    id: "SACRUM",
    name: "Sacrum",
    fullName: "Sacrum",
    region: "Sacral",
    nerveSupply: ["Hip bones", "Buttocks", "Pelvic region"],
    associatedOrgans: ["Hips", "Pelvis", "Buttocks"],
    commonSymptoms: ["Sacroiliac conditions", "Spinal curvatures", "Hip pain", "Pelvic instability"],
    description: "The sacrum forms the base of your spine and connects to the pelvis, affecting overall spinal stability."
  },
  COCCYX: {
    id: "COCCYX",
    name: "Coccyx",
    fullName: "Coccyx (Tailbone)",
    region: "Coccygeal",
    nerveSupply: ["Rectum", "Anus", "Pelvic floor"],
    associatedOrgans: ["Rectum", "Anus"],
    commonSymptoms: ["Hemorrhoids", "Pruritis (itching)", "Pain when sitting", "Tailbone pain"],
    description: "Your tailbone provides attachment for pelvic floor muscles and can cause pain when injured."
  }
}

export const getVertebraById = (id: string): VertebraData | undefined => {
  return spineData[id]
}

export const getAllVertebrae = (): VertebraData[] => {
  return Object.values(spineData)
}

export const getVertebraeByRegion = (region: string): VertebraData[] => {
  return Object.values(spineData).filter(v => v.region === region)
}
