import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpineChartProps {
  view: "front" | "side"
  selectedVertebra: string | null
  onVertebraClick: (id: string) => void
  onVertebraHover: (id: string | null) => void
}

interface VertebraRegion {
  id: string
  cx: number
  cy: number
  rx: number
  ry: number
}

const vertebraRegions: VertebraRegion[] = [
  { id: "C1", cx: 425, cy: 160, rx: 35, ry: 10 },
  { id: "C2", cx: 425, cy: 183, rx: 35, ry: 10 },
  { id: "C3", cx: 425, cy: 206, rx: 36, ry: 10 },
  { id: "C4", cx: 425, cy: 229, rx: 36, ry: 10 },
  { id: "C5", cx: 425, cy: 252, rx: 37, ry: 10 },
  { id: "C6", cx: 425, cy: 275, rx: 37, ry: 10 },
  { id: "C7", cx: 425, cy: 298, rx: 38, ry: 10 },
  
  { id: "T1", cx: 425, cy: 323, rx: 38, ry: 9 },
  { id: "T2", cx: 425, cy: 345, rx: 39, ry: 9 },
  { id: "T3", cx: 425, cy: 367, rx: 39, ry: 9 },
  { id: "T4", cx: 425, cy: 389, rx: 40, ry: 9 },
  { id: "T5", cx: 425, cy: 411, rx: 40, ry: 9 },
  { id: "T6", cx: 425, cy: 433, rx: 41, ry: 9 },
  { id: "T7", cx: 425, cy: 455, rx: 41, ry: 9 },
  { id: "T8", cx: 425, cy: 477, rx: 41, ry: 9 },
  { id: "T9", cx: 425, cy: 499, rx: 40, ry: 9 },
  { id: "T10", cx: 425, cy: 521, rx: 40, ry: 9 },
  { id: "T11", cx: 425, cy: 543, rx: 39, ry: 9 },
  { id: "T12", cx: 425, cy: 565, rx: 39, ry: 9 },
  
  { id: "L1", cx: 425, cy: 590, rx: 38, ry: 11 },
  { id: "L2", cx: 425, cy: 615, rx: 40, ry: 11 },
  { id: "L3", cx: 425, cy: 640, rx: 42, ry: 11 },
  { id: "L4", cx: 425, cy: 665, rx: 43, ry: 11 },
  { id: "L5", cx: 425, cy: 690, rx: 44, ry: 11 },
]

export function SpineChart({ view, selectedVertebra, onVertebraClick, onVertebraHover }: SpineChartProps) {
  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="w-full relative bg-gradient-to-b from-[oklch(0.97_0.008_45)] via-[oklch(0.96_0.005_50)] to-[oklch(0.95_0.008_40)] rounded-lg border-[10px] border-[oklch(0.82_0.015_38)] shadow-2xl overflow-hidden">
          <svg
            viewBox="0 0 850 1100"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.68 0.08 280)" />
                <stop offset="100%" stopColor="oklch(0.55 0.12 290)" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <rect width="850" height="1100" fill="oklch(0.98 0.005 45)" />

            <text x="425" y="55" textAnchor="middle" fontSize="38" fontWeight="700" fill="oklch(0.2 0 0)" fontFamily="var(--font-heading)" letterSpacing="-0.5">
              YOUR SUBLUXATION PATTERN
            </text>
            <text x="425" y="90" textAnchor="middle" fontSize="18" fontWeight="500" fill="oklch(0.35 0 0)" fontFamily="var(--font-body)" letterSpacing="1">
              THE SPINE AND NERVOUS SYSTEM
            </text>

            <line x1="50" y1="118" x2="800" y2="118" stroke="oklch(0.75 0 0)" strokeWidth="1.5" />

            <path
              d="M 425 145 L 425 715"
              stroke="url(#spineGradient)"
              strokeWidth="12"
              fill="none"
              opacity="0.25"
              strokeLinecap="round"
            />

            {vertebraRegions.map((region) => {
              const isSelected = selectedVertebra === region.id
              
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
                        ? "fill-accent/60 stroke-accent" 
                        : "fill-primary/25 stroke-primary/50 hover:fill-accent/40 hover:stroke-accent/80"
                    )}
                    strokeWidth={isSelected ? 3 : 2}
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      filter: isSelected ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.7))" : "none"
                    }}
                  />
                  <text
                    x={region.cx}
                    y={region.cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none select-none font-bold",
                      isSelected ? "fill-accent-foreground" : "fill-foreground"
                    )}
                    fontSize="11"
                    fontFamily="var(--font-heading)"
                  >
                    {region.id}
                  </text>

                  <line
                    x1={region.cx - region.rx - 8}
                    y1={region.cy}
                    x2="90"
                    y2={region.cy}
                    stroke="oklch(0.75 0.04 50)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  
                  <line
                    x1={region.cx + region.rx + 8}
                    y1={region.cy}
                    x2="760"
                    y2={region.cy}
                    stroke="oklch(0.75 0.04 50)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </g>
              )
            })}

            <g>
              <motion.ellipse
                cx={425}
                cy={732}
                rx={60}
                ry={45}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedVertebra === "SACRUM"
                    ? "fill-accent/60 stroke-accent" 
                    : "fill-primary/25 stroke-primary/50 hover:fill-accent/40 hover:stroke-accent/80"
                )}
                strokeWidth={selectedVertebra === "SACRUM" ? 3 : 2}
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  filter: selectedVertebra === "SACRUM" ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.7))" : "none"
                }}
              />
              <text
                x={425}
                y={735}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebra === "SACRUM" ? "fill-accent-foreground" : "fill-foreground"
                )}
                fontSize="14"
                fontFamily="var(--font-heading)"
              >
                SACRUM
              </text>
            </g>

            <g>
              <motion.ellipse
                cx={425}
                cy={800}
                rx={28}
                ry={18}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  selectedVertebra === "COCCYX"
                    ? "fill-accent/60 stroke-accent" 
                    : "fill-primary/25 stroke-primary/50 hover:fill-accent/40 hover:stroke-accent/80"
                )}
                strokeWidth={selectedVertebra === "COCCYX" ? 3 : 2}
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  filter: selectedVertebra === "COCCYX" ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.7))" : "none"
                }}
              />
              <text
                x={425}
                y={802}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebra === "COCCYX" ? "fill-accent-foreground" : "fill-foreground"
                )}
                fontSize="10"
                fontFamily="var(--font-heading)"
              >
                COCCYX
              </text>
            </g>

            <text x="425" y="1000" textAnchor="middle" fontSize="32" fontWeight="700" fill="oklch(0.25 0 0)" fontFamily="var(--font-heading)" letterSpacing="1">
              THE-BACK.SPACE
            </text>
            
            <g fontSize="13" fontFamily="var(--font-body)" fill="oklch(0.25 0 0)">
              <text x="50" y="1050">CLIENT:</text>
              <line x1="120" y1="1055" x2="400" y2="1055" stroke="oklch(0.6 0 0)" strokeWidth="1" />
              
              <text x="450" y="1050">DATE:</text>
              <line x1="510" y1="1055" x2="790" y2="1055" stroke="oklch(0.6 0 0)" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-6 text-center max-w-2xl mx-auto px-4">
        <p className="text-xs text-muted-foreground">
          <strong>Interactive Chart:</strong> Click on any vertebra (C1-Coccyx) to view detailed information about nerve supply, 
          associated organs, and possible symptoms when subluxated.
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Chart design inspired by THE-BACK.SPACE
        </p>
      </div>
    </div>
  )
}
