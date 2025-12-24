import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpineChartProps {
  view: "front" | "side"
  selectedVertebrae: string[]
  onVertebraClick: (id: string) => void
  onVertebraHover: (id: string | null) => void
}

interface VertebraRegion {
  id: string
  cx: number
  cy: number
  rx: number
  ry: number
  label: string
}

const vertebraRegions: VertebraRegion[] = [
  { id: "C1", cx: 475, cy: 158, rx: 18, ry: 11, label: "C1" },
  { id: "C2", cx: 475, cy: 182, rx: 18, ry: 11, label: "C2" },
  { id: "C3", cx: 475, cy: 206, rx: 18, ry: 11, label: "C3" },
  { id: "C4", cx: 475, cy: 229, rx: 18, ry: 11, label: "C4" },
  { id: "C5", cx: 475, cy: 252, rx: 18, ry: 11, label: "C5" },
  { id: "C6", cx: 475, cy: 275, rx: 18, ry: 11, label: "C6" },
  { id: "C7", cx: 475, cy: 298, rx: 18, ry: 11, label: "C7" },
  
  { id: "T1", cx: 475, cy: 323, rx: 17, ry: 10, label: "T1" },
  { id: "T2", cx: 475, cy: 345, rx: 17, ry: 10, label: "T2" },
  { id: "T3", cx: 475, cy: 367, rx: 17, ry: 10, label: "T3" },
  { id: "T4", cx: 475, cy: 389, rx: 17, ry: 10, label: "T4" },
  { id: "T5", cx: 475, cy: 411, rx: 17, ry: 10, label: "T5" },
  { id: "T6", cx: 475, cy: 433, rx: 17, ry: 10, label: "T6" },
  { id: "T7", cx: 475, cy: 455, rx: 17, ry: 10, label: "T7" },
  { id: "T8", cx: 475, cy: 477, rx: 17, ry: 10, label: "T8" },
  { id: "T9", cx: 475, cy: 499, rx: 17, ry: 10, label: "T9" },
  { id: "T10", cx: 475, cy: 521, rx: 17, ry: 10, label: "T10" },
  { id: "T11", cx: 475, cy: 543, rx: 17, ry: 10, label: "T11" },
  { id: "T12", cx: 475, cy: 565, rx: 17, ry: 10, label: "T12" },
  
  { id: "L1", cx: 475, cy: 590, rx: 20, ry: 12, label: "L1" },
  { id: "L2", cx: 475, cy: 615, rx: 20, ry: 12, label: "L2" },
  { id: "L3", cx: 475, cy: 640, rx: 20, ry: 12, label: "L3" },
  { id: "L4", cx: 475, cy: 665, rx: 20, ry: 12, label: "L4" },
  { id: "L5", cx: 475, cy: 690, rx: 20, ry: 12, label: "L5" },
]

const leftLabels: { [key: string]: string } = {
  C1: "pituitary gland, scalp, brain, left ear, left eye",
  C2: "head, eyes, tongue, left ear, left eye, heart",
  C3: "face, left side of neck, left ear, left shoulder, diaphragm",
  C4: "face, left side of neck, left chest, diaphragm",
  C5: "neck, vocal cords, left shoulder, left upper arm, diaphragm",
  C6: "left shoulder, left arm, tonsils",
  C7: "left shoulder, left arm, left wrist, left hand, thyroid",
  T1: "left shoulder, left arm, left elbow, left wrist, left hand",
  T2: "head, neck, heart, thyroid, esophagus, trachea, left hand and elbow",
  T3: "head, neck, heart, left lung, upper left arm",
  T4: "head, neck, heart, left lung, chest, upper left arm",
  T5: "head, neck, heart, lungs, gallbladder, upper left arm",
  T6: "head, neck, heart, liver, esophagus, blood circulation, upper left arm",
  T7: "esophagus, stomach, spleen, pancreas, duodenum, middle back",
  T8: "stomach, spleen, pancreas, duodenum, liver, gallbladder, middle back",
  T9: "stomach, spleen, pancreas, liver, gallbladder, adrenal glands, middle back",
  T10: "stomach, spleen, pancreas, adrenal glands, gallbladder, reproductive organs, liver, small intestine",
  T11: "stomach, spleen, pancreas, small intestines, reproductive organs, appendix, left leg",
  T12: "left kidney, reproductive organs, left leg, small intestine, large intestine, bladder, adrenal glands, ileocecal valve",
  L1: "left kidney, reproductive organs, left leg, small intestine, large intestine, bladder, upper and lower back, ileocecal valve",
  L2: "abdomen, reproductive organs, left foot and left leg, large intestine, bladder",
  L3: "reproductive organs, left leg and left foot, large intestine, bladder, uterus, appendix, abdomen",
  L4: "left leg and left foot, reproductive organs, bladder, prostate, large intestine",
  L5: "left buttocks, left leg and left foot, prostate, muscles of the lower back"
}

const rightLabels: { [key: string]: string } = {
  C1: "right eye, right ear, brain, scalp, pituitary gland",
  C2: "heart, right eye, right ear, tongue, eyes, head",
  C3: "diaphragm, right shoulder, right ear, right side of neck, face",
  C4: "diaphragm, right chest, right side of neck, face",
  C5: "diaphragm, right shoulder and upper arm, vocal cords, neck",
  C6: "tonsil, right arm, right shoulder",
  C7: "thyroid, right hand, right wrist, right arm, right shoulder",
  T1: "right hand, right wrist, right elbow, right arm, right shoulder",
  T2: "elbow and right hand, trachea, esophagus, thyroid, heart, neck, head",
  T3: "upper right arm, right lung, heart, neck, head",
  T4: "upper right arm, chest, right lung, heart, neck, head",
  T5: "upper right arm, gallbladder, lungs, heart, neck, head",
  T6: "upper right arm, blood circulation, esophagus, liver, heart, neck, head",
  T7: "middle back, duodenum, pancreas, spleen, stomach, esophagus",
  T8: "middle back, gallbladder, liver, duodenum, pancreas, spleen, stomach",
  T9: "gallbladder, liver, pancreas, spleen, stomach, middle back, adrenal glands",
  T10: "gallbladder, adrenal glands, pancreas, spleen, stomach, small intestine, liver, reproductive organs",
  T11: "small intestine, pancreas, spleen, stomach, right leg, large intestine, appendix, reproductive organs",
  T12: "small intestine, right leg, reproductive organs, right kidney, ileocecal valve, adrenal glands, bladder, large intestine",
  L1: "small intestine, reproductive organs, right kidney, ileocecal valve, upper and lower back, bladder, large intestine",
  L2: "right leg and right foot, reproductive organs, abdomen, bladder, large intestine",
  L3: "right foot and right leg, reproductive organs, abdomen, appendix, bladder, large intestine",
  L4: "right leg and right foot, large intestine, prostate, bladder, reproductive organs",
  L5: "muscles of the lower back, prostate, right foot and right leg, right buttocks"
}

export function SpineChart({ view, selectedVertebrae, onVertebraClick, onVertebraHover }: SpineChartProps) {
  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="w-full relative bg-[oklch(0.97_0.008_45)] rounded-lg border-[8px] border-[oklch(0.75_0.015_38)] shadow-2xl overflow-hidden">
          <svg
            viewBox="0 0 950 1200"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="spineGradientCervical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.75 0.08 280)" />
                <stop offset="100%" stopColor="oklch(0.68 0.10 285)" />
              </linearGradient>
              <linearGradient id="spineGradientThoracic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.72 0.10 200)" />
                <stop offset="100%" stopColor="oklch(0.65 0.12 210)" />
              </linearGradient>
              <linearGradient id="spineGradientLumbar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.70 0.12 280)" />
                <stop offset="100%" stopColor="oklch(0.62 0.14 290)" />
              </linearGradient>
              <linearGradient id="sacrum Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.82 0.05 25)" />
                <stop offset="100%" stopColor="oklch(0.75 0.08 20)" />
              </linearGradient>
            </defs>

            <rect width="950" height="1200" fill="oklch(0.985 0.002 45)" />

            <text x="475" y="50" textAnchor="middle" fontSize="36" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              YOUR SUBLUXATION PATTERN
            </text>
            <text x="475" y="82" textAnchor="middle" fontSize="14" fontWeight="500" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)" letterSpacing="3">
              THE SPINE AND NERVOUS SYSTEM
            </text>

            {vertebraRegions.map((region) => {
              const isSelected = selectedVertebrae.includes(region.id)
              const leftText = leftLabels[region.id] || ""
              const rightText = rightLabels[region.id] || ""
              
              return (
                <g key={region.id}>
                  <motion.ellipse
                    cx={region.cx}
                    cy={region.cy}
                    rx={region.rx}
                    ry={region.ry}
                    className={cn(
                      "cursor-pointer transition-all duration-200",
                      isSelected 
                        ? "fill-accent/70 stroke-accent" 
                        : "fill-[oklch(0.70_0.10_270)]/40 stroke-[oklch(0.60_0.12_275)] hover:fill-accent/50 hover:stroke-accent/90"
                    )}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      filter: isSelected ? "drop-shadow(0 0 10px oklch(0.65 0.12 200 / 0.8))" : "none"
                    }}
                  />
                  <text
                    x={region.cx}
                    y={region.cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none select-none font-bold",
                      isSelected ? "fill-[oklch(0.98_0_0)]" : "fill-foreground"
                    )}
                    fontSize="9"
                    fontFamily="var(--font-heading)"
                  >
                    {region.label}
                  </text>

                  <line
                    x1={region.cx - region.rx - 5}
                    y1={region.cy}
                    x2="75"
                    y2={region.cy}
                    stroke="oklch(0.70 0.03 40)"
                    strokeWidth="0.8"
                  />
                  
                  <line
                    x1={region.cx + region.rx + 5}
                    y1={region.cy}
                    x2="875"
                    y2={region.cy}
                    stroke="oklch(0.70 0.03 40)"
                    strokeWidth="0.8"
                  />

                  <text
                    x="70"
                    y={region.cy}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="7"
                    fill="oklch(0.20 0 0)"
                    fontFamily="var(--font-body)"
                  >
                    {leftText}
                  </text>

                  <text
                    x="880"
                    y={region.cy}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fontSize="7"
                    fill="oklch(0.20 0 0)"
                    fontFamily="var(--font-body)"
                  >
                    {rightText}
                  </text>
                </g>
              )
            })}

            <g>
              <motion.path
                d="M 475 720 Q 445 745 475 770 Q 505 745 475 720 Z"
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedVertebrae.includes("SACRUM")
                    ? "fill-accent/70 stroke-accent" 
                    : "fill-[oklch(0.80_0.05_25)]/60 stroke-[oklch(0.65_0.08_20)] hover:fill-accent/50 hover:stroke-accent/90"
                )}
                strokeWidth={selectedVertebrae.includes("SACRUM") ? 2.5 : 1.5}
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  filter: selectedVertebrae.includes("SACRUM") ? "drop-shadow(0 0 10px oklch(0.65 0.12 200 / 0.8))" : "none"
                }}
              />
              <text
                x={475}
                y={745}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("SACRUM") ? "fill-[oklch(0.98_0_0)]" : "fill-foreground"
                )}
                fontSize="11"
                fontFamily="var(--font-heading)"
              >
                SACRUM
              </text>

              <line x1="390" y1="745" x2="75" y2="745" stroke="oklch(0.70 0.03 40)" strokeWidth="0.8" />
              <line x1="560" y1="745" x2="875" y2="745" stroke="oklch(0.70 0.03 40)" strokeWidth="0.8" />
              
              <text x="70" y="745" textAnchor="end" dominantBaseline="middle" fontSize="7" fill="oklch(0.20 0 0)" fontFamily="var(--font-body)">
                left buttocks, left leg, reproductive organs, bladder, prostate
              </text>
              <text x="880" y="745" textAnchor="start" dominantBaseline="middle" fontSize="7" fill="oklch(0.20 0 0)" fontFamily="var(--font-body)">
                prostate, right foot and toes, right leg, right buttocks
              </text>
            </g>

            <g>
              <motion.ellipse
                cx={475}
                cy={800}
                rx={18}
                ry={12}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedVertebrae.includes("COCCYX")
                    ? "fill-accent/70 stroke-accent" 
                    : "fill-[oklch(0.75_0.06_320)]/50 stroke-[oklch(0.60_0.10_325)] hover:fill-accent/50 hover:stroke-accent/90"
                )}
                strokeWidth={selectedVertebrae.includes("COCCYX") ? 2.5 : 1.5}
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  filter: selectedVertebrae.includes("COCCYX") ? "drop-shadow(0 0 10px oklch(0.65 0.12 200 / 0.8))" : "none"
                }}
              />
              <text
                x={475}
                y={801}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("COCCYX") ? "fill-[oklch(0.98_0_0)]" : "fill-foreground"
                )}
                fontSize="8"
                fontFamily="var(--font-heading)"
              >
                COCCYX
              </text>

              <line x1="440" y1="800" x2="75" y2="800" stroke="oklch(0.70 0.03 40)" strokeWidth="0.8" />
              <line x1="510" y1="800" x2="875" y2="800" stroke="oklch(0.70 0.03 40)" strokeWidth="0.8" />
              
              <text x="70" y="800" textAnchor="end" dominantBaseline="middle" fontSize="7" fill="oklch(0.20 0 0)" fontFamily="var(--font-body)">
                retum, anus
              </text>
              <text x="880" y="800" textAnchor="start" dominantBaseline="middle" fontSize="7" fill="oklch(0.20 0 0)" fontFamily="var(--font-body)">
                anus, retum
              </text>
            </g>

            <text x="475" y="1070" textAnchor="middle" fontSize="42" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              THE-BACK.SPACE
            </text>
            
            <g fontSize="11" fontFamily="var(--font-body)" fill="oklch(0.20 0 0)">
              <text x="80" y="1130" fontWeight="600">CLIENT:</text>
              <line x1="145" y1="1135" x2="420" y2="1135" stroke="oklch(0.50 0 0)" strokeWidth="1" />
              
              <text x="530" y="1130" fontWeight="600">DATE:</text>
              <line x1="580" y1="1135" x2="870" y2="1135" stroke="oklch(0.50 0 0)" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-6 text-center max-w-2xl mx-auto px-4">
        <p className="text-xs text-muted-foreground">
          <strong>Interactive Chart:</strong> Click vertebrae to select multiple areas for your subluxation pattern report. 
          Click again to deselect.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Chart design from THE-BACK.SPACE
        </p>
      </div>
    </div>
  )
}
