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
  { id: "C1", cx: 475, cy: 158, rx: 28, ry: 18, label: "C1" },
  { id: "C2", cx: 475, cy: 182, rx: 28, ry: 18, label: "C2" },
  { id: "C3", cx: 475, cy: 206, rx: 28, ry: 18, label: "C3" },
  { id: "C4", cx: 475, cy: 229, rx: 28, ry: 18, label: "C4" },
  { id: "C5", cx: 475, cy: 252, rx: 28, ry: 18, label: "C5" },
  { id: "C6", cx: 475, cy: 275, rx: 28, ry: 18, label: "C6" },
  { id: "C7", cx: 475, cy: 298, rx: 28, ry: 18, label: "C7" },
  
  { id: "T1", cx: 475, cy: 323, rx: 26, ry: 16, label: "T1" },
  { id: "T2", cx: 475, cy: 345, rx: 26, ry: 16, label: "T2" },
  { id: "T3", cx: 475, cy: 367, rx: 26, ry: 16, label: "T3" },
  { id: "T4", cx: 475, cy: 389, rx: 26, ry: 16, label: "T4" },
  { id: "T5", cx: 475, cy: 411, rx: 26, ry: 16, label: "T5" },
  { id: "T6", cx: 475, cy: 433, rx: 26, ry: 16, label: "T6" },
  { id: "T7", cx: 475, cy: 455, rx: 26, ry: 16, label: "T7" },
  { id: "T8", cx: 475, cy: 477, rx: 26, ry: 16, label: "T8" },
  { id: "T9", cx: 475, cy: 499, rx: 26, ry: 16, label: "T9" },
  { id: "T10", cx: 475, cy: 521, rx: 26, ry: 16, label: "T10" },
  { id: "T11", cx: 475, cy: 543, rx: 26, ry: 16, label: "T11" },
  { id: "T12", cx: 475, cy: 565, rx: 26, ry: 16, label: "T12" },
  
  { id: "L1", cx: 475, cy: 590, rx: 32, ry: 20, label: "L1" },
  { id: "L2", cx: 475, cy: 615, rx: 32, ry: 20, label: "L2" },
  { id: "L3", cx: 475, cy: 640, rx: 32, ry: 20, label: "L3" },
  { id: "L4", cx: 475, cy: 665, rx: 32, ry: 20, label: "L4" },
  { id: "L5", cx: 475, cy: 690, rx: 32, ry: 20, label: "L5" },
]



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
              
              return (
                <g key={region.id}>
                  <defs>
                    <radialGradient id={`vertebra-gradient-${region.id}`}>
                      <stop offset="0%" stopColor={isSelected ? "oklch(0.75 0.15 200)" : "oklch(0.88 0.05 280)"} />
                      <stop offset="50%" stopColor={isSelected ? "oklch(0.68 0.18 195)" : "oklch(0.82 0.07 275)"} />
                      <stop offset="100%" stopColor={isSelected ? "oklch(0.60 0.20 190)" : "oklch(0.75 0.09 270)"} />
                    </radialGradient>
                  </defs>
                  <motion.ellipse
                    cx={region.cx}
                    cy={region.cy}
                    rx={region.rx}
                    ry={region.ry}
                    fill={`url(#vertebra-gradient-${region.id})`}
                    className="cursor-pointer"
                    stroke={isSelected ? "oklch(0.65 0.12 200)" : "oklch(0.65 0.08 270)"}
                    strokeWidth={isSelected ? 3.5 : 2}
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.12, strokeWidth: 3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      filter: isSelected 
                        ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.9)) drop-shadow(0 2px 6px oklch(0 0 0 / 0.3))" 
                        : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                    }}
                  />
                  <text
                    x={region.cx}
                    y={region.cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none select-none font-bold",
                      isSelected ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.15_0.02_270)]"
                    )}
                    fontSize="13"
                    fontFamily="var(--font-heading)"
                    style={{
                      filter: isSelected ? "drop-shadow(0 1px 2px oklch(0 0 0 / 0.5))" : "none"
                    }}
                  >
                    {region.label}
                  </text>
                </g>
              )
            })}

            <g>
              <defs>
                <radialGradient id="sacrum-gradient">
                  <stop offset="0%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.75 0.15 200)" : "oklch(0.88 0.04 30)"} />
                  <stop offset="50%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.68 0.18 195)" : "oklch(0.82 0.06 25)"} />
                  <stop offset="100%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.60 0.20 190)" : "oklch(0.75 0.08 20)"} />
                </radialGradient>
              </defs>
              <motion.path
                d="M 475 720 Q 445 745 475 770 Q 505 745 475 720 Z"
                fill="url(#sacrum-gradient)"
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("SACRUM") ? "oklch(0.65 0.12 200)" : "oklch(0.68 0.06 25)"}
                strokeWidth={selectedVertebrae.includes("SACRUM") ? 3.5 : 2}
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08, strokeWidth: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("SACRUM") 
                    ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.9)) drop-shadow(0 2px 6px oklch(0 0 0 / 0.3))" 
                    : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                }}
              />
              <text
                x={475}
                y={745}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("SACRUM") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.15_0.02_25)]"
                )}
                fontSize="13"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("SACRUM") ? "drop-shadow(0 1px 2px oklch(0 0 0 / 0.5))" : "none"
                }}
              >
                SACRUM
              </text>
            </g>

            <g>
              <defs>
                <radialGradient id="coccyx-gradient">
                  <stop offset="0%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.75 0.15 200)" : "oklch(0.88 0.04 320)"} />
                  <stop offset="50%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.68 0.18 195)" : "oklch(0.82 0.06 315)"} />
                  <stop offset="100%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.60 0.20 190)" : "oklch(0.75 0.08 310)"} />
                </radialGradient>
              </defs>
              <motion.ellipse
                cx={475}
                cy={800}
                rx={26}
                ry={18}
                fill="url(#coccyx-gradient)"
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("COCCYX") ? "oklch(0.65 0.12 200)" : "oklch(0.68 0.07 320)"}
                strokeWidth={selectedVertebrae.includes("COCCYX") ? 3.5 : 2}
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.12, strokeWidth: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("COCCYX") 
                    ? "drop-shadow(0 0 12px oklch(0.65 0.12 200 / 0.9)) drop-shadow(0 2px 6px oklch(0 0 0 / 0.3))" 
                    : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                }}
              />
              <text
                x={475}
                y={801}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("COCCYX") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.15_0.02_320)]"
                )}
                fontSize="12"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("COCCYX") ? "drop-shadow(0 1px 2px oklch(0 0 0 / 0.5))" : "none"
                }}
              >
                COCCYX
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
