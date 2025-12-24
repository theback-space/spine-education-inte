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
    nerveSupply: ["Pituitary gland", "Scalp", "Brain", "Left eye", "Left ear", "Right eye", "Right ear"],
    associatedOrgans: ["Brain", "Pituitary gland", "Scalp", "Eyes", "Ears"],
    commonSymptoms: ["Headaches", "Migraines", "Nervousness", "Insomnia", "Head colds", "High blood pressure", "Memory issues", "Chronic fatigue", "Dizziness", "Mental fog", "Anxiety", "Vision problems", "Hearing disturbances", "Balance issues"],
    description: "The Atlas supports your head and affects blood flow to the brain. Misalignment here can impact your entire nervous system and affect vision, hearing, and cognitive function."
  },
  C2: {
    id: "C2",
    name: "C2",
    fullName: "Axis (2nd Cervical)",
    region: "Cervical",
    nerveSupply: ["Heart", "Left eye", "Left ear", "Right eye", "Right ear", "Tongue", "Eyes", "Head"],
    associatedOrgans: ["Heart", "Eyes", "Ears", "Tongue"],
    commonSymptoms: ["Sinus trouble", "Allergies", "Eye problems", "Earaches", "Fainting spells", "Heart palpitations", "Tongue problems", "Blurred vision", "Tinnitus", "Dizziness", "Nasal congestion", "Taste disturbances"],
    description: "C2 influences your senses and heart function. Issues here often manifest as sensory problems and cardiovascular irregularities."
  },
  C3: {
    id: "C3",
    name: "C3",
    fullName: "3rd Cervical",
    region: "Cervical",
    nerveSupply: ["Diaphragm", "Face", "Left side of neck", "Left ear", "Left shoulder", "Right shoulder", "Right ear", "Right side of neck"],
    associatedOrgans: ["Diaphragm", "Face", "Shoulders", "Neck"],
    commonSymptoms: ["Neuralgia", "Neuritis", "Acne", "Eczema", "Breathing difficulties", "Shoulder pain", "Neck pain", "Facial pain", "Skin rashes", "Shallow breathing", "Trigeminal neuralgia", "Facial numbness"],
    description: "This vertebra affects facial nerves, breathing, and shoulder function. Subluxations can cause facial pain, skin conditions, and respiratory issues."
  },
  C4: {
    id: "C4",
    name: "C4",
    fullName: "4th Cervical",
    region: "Cervical",
    nerveSupply: ["Diaphragm", "Face", "Left side of neck", "Left chest", "Right chest", "Right side of neck"],
    associatedOrgans: ["Diaphragm", "Face", "Chest", "Neck"],
    commonSymptoms: ["Hay fever", "Catarrh", "Hearing loss", "Breathing problems", "Chest tightness", "Chronic allergies", "Sinus pressure", "Respiratory infections", "Wheezing"],
    description: "C4 controls the diaphragm and chest area. Misalignment often leads to respiratory issues and allergies."
  },
  C5: {
    id: "C5",
    name: "C5",
    fullName: "5th Cervical",
    region: "Cervical",
    nerveSupply: ["Neck", "Vocal cords", "Left shoulder", "Left upper arm", "Diaphragm", "Right shoulder and upper arm"],
    associatedOrgans: ["Throat", "Vocal cords", "Shoulders", "Neck"],
    commonSymptoms: ["Laryngitis", "Hoarseness", "Throat conditions", "Sore throat", "Shoulder pain", "Upper arm weakness", "Voice changes", "Difficulty swallowing", "Chronic cough", "Shoulder stiffness"],
    description: "This area controls throat function, voice, and shoulder movement. Problems here often affect speaking and arm strength."
  },
  C6: {
    id: "C6",
    name: "C6",
    fullName: "6th Cervical",
    region: "Cervical",
    nerveSupply: ["Left shoulder", "Left arm", "Tonsils", "Tonsil", "Right arm", "Right shoulder"],
    associatedOrgans: ["Shoulders", "Arms", "Tonsils"],
    commonSymptoms: ["Stiff neck", "Pain in upper arm", "Tonsillitis", "Whooping cough", "Croup", "Arm numbness", "Chronic sore throat", "Shoulder tension", "Arm tingling", "Wrist weakness"],
    description: "C6 affects shoulder and arm muscles. Misalignment commonly causes neck stiffness, shoulder pain, and arm problems."
  },
  C7: {
    id: "C7",
    name: "C7",
    fullName: "7th Cervical (Vertebra Prominens)",
    region: "Cervical",
    nerveSupply: ["Left shoulder", "Left arm", "Left wrist", "Left hand", "Thyroid", "Right hand", "Right wrist", "Right arm", "Right shoulder"],
    associatedOrgans: ["Thyroid", "Shoulders", "Arms", "Hands"],
    commonSymptoms: ["Bursitis", "Colds", "Thyroid conditions", "Arm pain", "Hand numbness", "Wrist problems", "Weight fluctuations", "Fatigue", "Temperature sensitivity", "Hand tingling", "Grip weakness"],
    description: "The last cervical vertebra influences the thyroid and arms. Issues here can affect metabolism and hand/wrist function."
  },
  T1: {
    id: "T1",
    name: "T1",
    fullName: "1st Thoracic",
    region: "Thoracic",
    nerveSupply: ["Left shoulder", "Left arm", "Left elbow", "Left wrist", "Left hand", "Right hand", "Right wrist", "Right elbow", "Right arm", "Right shoulder"],
    associatedOrgans: ["Arms", "Hands", "Wrists", "Elbows"],
    commonSymptoms: ["Asthma", "Cough", "Difficult breathing", "Shortness of breath", "Pain in forearms and hands", "Elbow pain", "Hand cramping", "Finger numbness", "Carpal tunnel symptoms", "Chronic bronchitis"],
    description: "T1 controls the lower arms and can affect breathing. Compression affects respiratory function and hand dexterity."
  },
  T2: {
    id: "T2",
    name: "T2",
    fullName: "2nd Thoracic",
    region: "Thoracic",
    nerveSupply: ["Head", "Neck", "Heart", "Thyroid", "Esophagus", "Trachea", "Elbow and right hand", "Trachea", "Esophagus", "Thyroid", "Heart", "Neck", "Head"],
    associatedOrgans: ["Heart", "Esophagus", "Trachea", "Thyroid"],
    commonSymptoms: ["Functional heart conditions", "Chest pain", "Heart palpitations", "Swallowing difficulties"],
    description: "This vertebra directly influences heart and throat function. Subluxations may contribute to heart rhythm irregularities and swallowing issues."
  },
  T3: {
    id: "T3",
    name: "T3",
    fullName: "3rd Thoracic",
    region: "Thoracic",
    nerveSupply: ["Head", "Neck", "Heart", "Left lung", "Upper left arm", "Upper right arm", "Right lung", "Heart", "Neck", "Head"],
    associatedOrgans: ["Lungs", "Bronchial tubes", "Chest", "Heart"],
    commonSymptoms: ["Bronchitis", "Pleurisy", "Pneumonia", "Flu", "Chest congestion", "Arm pain"],
    description: "T3 affects lung function and breathing. Problems here often manifest as respiratory conditions."
  },
  T4: {
    id: "T4",
    name: "T4",
    fullName: "4th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Head", "Neck", "Heart", "Left lung", "Chest", "Upper left arm", "Upper right arm", "Chest", "Right lung", "Heart", "Neck", "Head"],
    associatedOrgans: ["Lungs", "Chest", "Heart"],
    commonSymptoms: ["Gallbladder conditions", "Jaundice", "Chest pain", "Breathing difficulties"],
    description: "This area affects chest and lung function. Misalignment can cause chest discomfort and respiratory issues."
  },
  T5: {
    id: "T5",
    name: "T5",
    fullName: "5th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Head", "Neck", "Heart", "Lungs", "Gallbladder", "Upper left arm", "Upper right arm", "Gallbladder", "Lungs", "Heart", "Neck", "Head"],
    associatedOrgans: ["Liver", "Gallbladder", "Solar plexus", "Lungs"],
    commonSymptoms: ["Liver conditions", "Fevers", "Low blood pressure", "Anemia", "Poor circulation", "Fatigue", "Gallbladder issues"],
    description: "T5 influences the liver and overall circulation. Issues affect detoxification and energy levels."
  },
  T6: {
    id: "T6",
    name: "T6",
    fullName: "6th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Head", "Neck", "Heart", "Liver", "Esophagus", "Blood circulation", "Upper left arm", "Upper right arm", "Blood circulation", "Esophagus", "Liver", "Heart", "Neck", "Head"],
    associatedOrgans: ["Stomach", "Liver", "Blood circulation", "Esophagus"],
    commonSymptoms: ["Stomach troubles", "Indigestion", "Heartburn", "Dyspepsia", "Nervous stomach", "Circulation problems"],
    description: "This vertebra directly affects stomach function and circulation. Compression often leads to digestive discomfort."
  },
  T7: {
    id: "T7",
    name: "T7",
    fullName: "7th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Esophagus", "Stomach", "Spleen", "Pancreas", "Duodenum", "Middle back"],
    associatedOrgans: ["Pancreas", "Duodenum", "Stomach", "Spleen"],
    commonSymptoms: ["Ulcers", "Gastritis", "Blood sugar imbalances", "Digestive issues", "Middle back pain"],
    description: "T7 controls the pancreas and digestive organs. Can affect blood sugar regulation and digestion."
  },
  T8: {
    id: "T8",
    name: "T8",
    fullName: "8th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Stomach", "Spleen", "Pancreas", "Duodenum", "Liver", "Gallbladder", "Middle back"],
    associatedOrgans: ["Spleen", "Diaphragm", "Liver", "Gallbladder"],
    commonSymptoms: ["Lowered resistance", "Hiccups", "Immune system weakness", "Liver problems"],
    description: "This area affects immune function through the spleen. Misalignment can reduce your body's defenses."
  },
  T9: {
    id: "T9",
    name: "T9",
    fullName: "9th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Stomach", "Spleen", "Pancreas", "Liver", "Gallbladder", "Adrenal glands", "Middle back"],
    associatedOrgans: ["Adrenal glands", "Liver", "Gallbladder"],
    commonSymptoms: ["Allergies", "Hives", "Stress response issues", "Fatigue", "Middle back pain"],
    description: "T9 influences the adrenal glands that control stress response and energy."
  },
  T10: {
    id: "T10",
    name: "T10",
    fullName: "10th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Stomach", "Spleen", "Pancreas", "Adrenal glands", "Gallbladder", "Gallbladder", "Adrenal glands", "Pancreas", "Spleen", "Stomach", "Small intestine", "Liver", "Reproductive organs"],
    associatedOrgans: ["Kidneys", "Gallbladder", "Adrenal glands", "Small intestine"],
    commonSymptoms: ["Kidney troubles", "Hardening of arteries", "Chronic tiredness", "Fluid retention"],
    description: "This vertebra affects kidney function and fluid balance in your body."
  },
  T11: {
    id: "T11",
    name: "T11",
    fullName: "11th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Stomach", "Spleen", "Pancreas", "Small intestines", "Reproductive organs", "Appendix", "Large intestine", "Appendix", "Reproductive organs", "Small intestine", "Pancreas", "Spleen", "Stomach"],
    associatedOrgans: ["Kidneys", "Ureters", "Small intestine"],
    commonSymptoms: ["Skin conditions", "Acne", "Pimples", "Eczema", "Boils"],
    description: "T11 influences kidney function and can affect skin health through toxin elimination."
  },
  T12: {
    id: "T12",
    name: "T12",
    fullName: "12th Thoracic",
    region: "Thoracic",
    nerveSupply: ["Left kidney", "Reproductive organs", "Left leg", "Small intestine", "Small intestine", "Right leg", "Reproductive organs", "Right kidney", "Ileocecal valve", "Adrenal glands", "Bladder", "Large intestine"],
    associatedOrgans: ["Small intestines", "Lymph circulation", "Kidneys"],
    commonSymptoms: ["Rheumatism", "Gas pains", "Certain types of infertility", "Bloating"],
    description: "The last thoracic vertebra affects nutrient absorption and lymphatic drainage."
  },
  L1: {
    id: "L1",
    name: "L1",
    fullName: "1st Lumbar",
    region: "Lumbar",
    nerveSupply: ["Left kidney", "Reproductive organs", "Left leg", "Small intestine", "Large intestine", "Bladder", "Adrenal glands", "Upper and lower back", "Ileocecal valve"],
    associatedOrgans: ["Large intestine", "Colon", "Inguinal rings"],
    commonSymptoms: ["Constipation", "Colitis", "Diarrhea", "Hernias", "Lower back pain", "Digestive issues", "Bloating", "IBS symptoms", "Abdominal cramping", "Gas"],
    description: "L1 controls the large intestine. Issues here commonly cause bowel irregularities and hernias."
  },
  L2: {
    id: "L2",
    name: "L2",
    fullName: "2nd Lumbar",
    region: "Lumbar",
    nerveSupply: ["Abdomen", "Reproductive organs", "Left foot and left leg", "Large intestine", "Bladder", "Right leg and right foot", "Reproductive organs", "Abdomen", "Bladder", "Large intestine"],
    associatedOrgans: ["Appendix", "Abdomen", "Upper leg", "Bladder"],
    commonSymptoms: ["Appendicitis", "Cramps", "Difficult breathing", "Acidosis", "Varicose veins", "Thigh pain", "Leg weakness", "Abdominal pain", "Digestive cramping"],
    description: "This area affects the abdomen and upper legs. Compression can cause digestive and leg issues."
  },
  L3: {
    id: "L3",
    name: "L3",
    fullName: "3rd Lumbar",
    region: "Lumbar",
    nerveSupply: ["Reproductive organs", "Left leg and left foot", "Large intestine", "Bladder", "Abdomen", "Appendix", "Bladder", "Large intestine"],
    associatedOrgans: ["Sex organs", "Uterus", "Bladder", "Knees"],
    commonSymptoms: ["Bladder troubles", "Menstrual troubles", "Miscarriages", "Bed wetting", "Impotency", "Knee pain", "Urinary frequency", "Menstrual cramps", "Knee instability", "Sexual dysfunction"],
    description: "L3 influences reproductive and urinary systems, plus knee function."
  },
  L4: {
    id: "L4",
    name: "L4",
    fullName: "4th Lumbar",
    region: "Lumbar",
    nerveSupply: ["Left leg and left foot", "Reproductive organs", "Bladder", "Prostate", "Large intestine", "Right leg and right foot", "Large intestine", "Prostate", "Bladder"],
    associatedOrgans: ["Prostate gland", "Lower back muscles", "Sciatic nerve"],
    commonSymptoms: ["Sciatica", "Lumbago", "Difficult/painful urination", "Backaches", "Frequent urination", "Leg pain", "Shooting pains", "Hip pain", "Numbness in legs", "Prostate issues"],
    description: "This vertebra is often involved in sciatica and low back pain. Also affects prostate health."
  },
  L5: {
    id: "L5",
    name: "L5",
    fullName: "5th Lumbar",
    region: "Lumbar",
    nerveSupply: ["Left buttocks", "Left leg and left foot", "Prostate", "Muscles of the lower back", "Muscles of the lower back", "Prostate", "Right foot and right leg", "Right buttocks"],
    associatedOrgans: ["Lower legs", "Ankles", "Feet"],
    commonSymptoms: ["Poor circulation in legs", "Swollen ankles", "Weak ankles and arches", "Cold feet", "Leg cramps", "Foot pain", "Plantar fasciitis", "Achilles tendon pain", "Calf cramping", "Restless legs"],
    description: "The last lumbar vertebra affects your legs and feet. Problems here impact walking and standing."
  },
  SACRUM: {
    id: "SACRUM",
    name: "Sacrum",
    fullName: "Sacrum",
    region: "Sacral",
    nerveSupply: ["Left buttocks", "Left leg", "Left foot and toes", "Prostate", "Prostate", "Right foot and toes", "Right leg", "Right buttocks"],
    associatedOrgans: ["Hip bones", "Buttocks", "Pelvis"],
    commonSymptoms: ["Sacroiliac conditions", "Spinal curvatures", "Hip pain", "Pelvic instability"],
    description: "The sacrum forms the base of your spine and connects to the pelvis, affecting overall spinal stability."
  },
  COCCYX: {
    id: "COCCYX",
    name: "Coccyx",
    fullName: "Coccyx (Tailbone)",
    region: "Coccygeal",
    nerveSupply: ["Rectum", "Anus", "Reproductive organs", "Anus", "Rectum"],
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
