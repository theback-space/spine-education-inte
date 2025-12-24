import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpineChartProps {
  view: "front" | "side"
  selectedVertebrae: string[]
  onVertebraClick: (id: string) => void
  onVertebraHover: (id: string | null) => void
  practiceName?: string
}

interface VertebraRegion {
  id: string
  cx: number
  cy: number
  label: string
  type: "cervical" | "thoracic" | "lumbar"
}

const vertebraRegions: VertebraRegion[] = [
  { id: "C1", cx: 475, cy: 200, label: "C1", type: "cervical" },
  { id: "C2", cx: 475, cy: 280, label: "C2", type: "cervical" },
  { id: "C3", cx: 475, cy: 360, label: "C3", type: "cervical" },
  { id: "C4", cx: 475, cy: 440, label: "C4", type: "cervical" },
  { id: "C5", cx: 475, cy: 520, label: "C5", type: "cervical" },
  { id: "C6", cx: 475, cy: 600, label: "C6", type: "cervical" },
  { id: "C7", cx: 475, cy: 680, label: "C7", type: "cervical" },
  
  { id: "T1", cx: 475, cy: 765, label: "T1", type: "thoracic" },
  { id: "T2", cx: 475, cy: 845, label: "T2", type: "thoracic" },
  { id: "T3", cx: 475, cy: 925, label: "T3", type: "thoracic" },
  { id: "T4", cx: 475, cy: 1005, label: "T4", type: "thoracic" },
  { id: "T5", cx: 475, cy: 1085, label: "T5", type: "thoracic" },
  { id: "T6", cx: 475, cy: 1165, label: "T6", type: "thoracic" },
  { id: "T7", cx: 475, cy: 1245, label: "T7", type: "thoracic" },
  { id: "T8", cx: 475, cy: 1325, label: "T8", type: "thoracic" },
  { id: "T9", cx: 475, cy: 1405, label: "T9", type: "thoracic" },
  { id: "T10", cx: 475, cy: 1485, label: "T10", type: "thoracic" },
  { id: "T11", cx: 475, cy: 1565, label: "T11", type: "thoracic" },
  { id: "T12", cx: 475, cy: 1645, label: "T12", type: "thoracic" },
  
  { id: "L1", cx: 475, cy: 1740, label: "L1", type: "lumbar" },
  { id: "L2", cx: 475, cy: 1840, label: "L2", type: "lumbar" },
  { id: "L3", cx: 475, cy: 1940, label: "L3", type: "lumbar" },
  { id: "L4", cx: 475, cy: 2040, label: "L4", type: "lumbar" },
  { id: "L5", cx: 475, cy: 2140, label: "L5", type: "lumbar" },
]

function getVertebraPath(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): string {
  if (type === "cervical") {
    const bodyWidth = 50
    const bodyHeight = 42
    const processWidth = 70
    const processHeight = 18
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx + bodyWidth/2 + 8} ${cy} ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx - bodyWidth/2 - 8} ${cy} ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - processWidth/2} ${cy - bodyHeight/2 - 10}
      L ${cx - bodyWidth/2 - 5} ${cy - bodyHeight/2 - processHeight}
      L ${cx - bodyWidth/2 - 15} ${cy - bodyHeight/2 - processHeight - 8}
      L ${cx - bodyWidth/2 - 18} ${cy - bodyHeight/2 - 5}
      Z
      M ${cx + processWidth/2} ${cy - bodyHeight/2 - 10}
      L ${cx + bodyWidth/2 + 5} ${cy - bodyHeight/2 - processHeight}
      L ${cx + bodyWidth/2 + 15} ${cy - bodyHeight/2 - processHeight - 8}
      L ${cx + bodyWidth/2 + 18} ${cy - bodyHeight/2 - 5}
      Z
    `
  } else if (type === "thoracic") {
    const bodyWidth = 48
    const bodyHeight = 46
    const processLength = 22
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 4} ${cy} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 4} ${cy} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 5} ${cy - 8}
      L ${cx - bodyWidth/2 - processLength} ${cy - 12}
      L ${cx - bodyWidth/2 - processLength - 5} ${cy - 6}
      L ${cx - bodyWidth/2 - processLength} ${cy}
      Z
      M ${cx + bodyWidth/2 + 5} ${cy - 8}
      L ${cx + bodyWidth/2 + processLength} ${cy - 12}
      L ${cx + bodyWidth/2 + processLength + 5} ${cy - 6}
      L ${cx + bodyWidth/2 + processLength} ${cy}
      Z
      M ${cx} ${cy - bodyHeight/2}
      L ${cx - 6} ${cy - bodyHeight/2 - 18}
      L ${cx} ${cy - bodyHeight/2 - 22}
      L ${cx + 6} ${cy - bodyHeight/2 - 18}
      Z
    `
  } else {
    const bodyWidth = 62
    const bodyHeight = 56
    const processWidth = 80
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 6} ${cy} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 6} ${cy} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 8} ${cy}
      L ${cx - processWidth/2} ${cy - 10}
      L ${cx - processWidth/2 - 8} ${cy - 4}
      L ${cx - processWidth/2 - 6} ${cy + 8}
      Z
      M ${cx + bodyWidth/2 + 8} ${cy}
      L ${cx + processWidth/2} ${cy - 10}
      L ${cx + processWidth/2 + 8} ${cy - 4}
      L ${cx + processWidth/2 + 6} ${cy + 8}
      Z
    `
  }
}

function getVertebraLabelPosition(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): { x: number; y: number } {
  return { x: cx, y: cy + 2 }
}



export function SpineChart({ view, selectedVertebrae, onVertebraClick, onVertebraHover, practiceName = "THE-BACK.SPACE" }: SpineChartProps) {
  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div className="relative w-full mx-auto">
        <div className="w-full relative bg-[oklch(0.97_0.008_45)] rounded-lg border-[8px] border-[oklch(0.75_0.015_38)] shadow-2xl overflow-hidden">
          <svg
            viewBox="0 0 950 2500"
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
              <linearGradient id="sacrumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.82 0.05 25)" />
                <stop offset="100%" stopColor="oklch(0.75 0.08 20)" />
              </linearGradient>
            </defs>

            <rect width="950" height="2500" fill="oklch(0.985 0.002 45)" />

            <text x="475" y="80" textAnchor="middle" fontSize="52" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              YOUR SUBLUXATION PATTERN
            </text>
            <text x="475" y="125" textAnchor="middle" fontSize="20" fontWeight="500" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)" letterSpacing="3">
              THE SPINE AND NERVOUS SYSTEM
            </text>

            {vertebraRegions.map((region) => {
              const isSelected = selectedVertebrae.includes(region.id)
              const vertebraPath = getVertebraPath(region.cx, region.cy, region.type)
              const labelPos = getVertebraLabelPosition(region.cx, region.cy, region.type)
              
              return (
                <g key={region.id}>
                  <defs>
                    <linearGradient id={`vertebra-gradient-${region.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isSelected ? "oklch(0.78 0.15 200)" : "oklch(0.90 0.04 35)"} />
                      <stop offset="40%" stopColor={isSelected ? "oklch(0.70 0.18 195)" : "oklch(0.85 0.05 30)"} />
                      <stop offset="100%" stopColor={isSelected ? "oklch(0.62 0.20 190)" : "oklch(0.78 0.06 25)"} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={vertebraPath}
                    fill={`url(#vertebra-gradient-${region.id})`}
                    className="cursor-pointer"
                    stroke={isSelected ? "oklch(0.65 0.12 200)" : "oklch(0.70 0.06 30)"}
                    strokeWidth={isSelected ? 4 : 2.5}
                    strokeLinejoin="round"
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      filter: isSelected 
                        ? "drop-shadow(0 0 18px oklch(0.65 0.12 200 / 0.95)) drop-shadow(0 4px 10px oklch(0 0 0 / 0.35))" 
                        : "drop-shadow(0 2px 5px oklch(0 0 0 / 0.2))"
                    }}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none select-none font-bold",
                      isSelected ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_30)]"
                    )}
                    fontSize={region.type === "lumbar" ? "20" : region.type === "thoracic" ? "18" : "19"}
                    fontFamily="var(--font-heading)"
                    style={{
                      filter: isSelected ? "drop-shadow(0 1px 3px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.15))"
                    }}
                  >
                    {region.label}
                  </text>
                </g>
              )
            })}

            <g>
              <defs>
                <linearGradient id="sacrum-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.78 0.15 200)" : "oklch(0.90 0.04 30)"} />
                  <stop offset="40%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.70 0.18 195)" : "oklch(0.85 0.05 25)"} />
                  <stop offset="100%" stopColor={selectedVertebrae.includes("SACRUM") ? "oklch(0.62 0.20 190)" : "oklch(0.78 0.06 20)"} />
                </linearGradient>
              </defs>
              <motion.path
                d={`
                  M 475 2220
                  L 420 2250
                  Q 410 2280 415 2310
                  L 430 2360
                  L 475 2380
                  L 520 2360
                  L 535 2310
                  Q 540 2280 530 2250
                  L 475 2220
                  Z
                `}
                fill="url(#sacrum-gradient)"
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("SACRUM") ? "oklch(0.65 0.12 200)" : "oklch(0.70 0.06 30)"}
                strokeWidth={selectedVertebrae.includes("SACRUM") ? 4 : 2.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("SACRUM") 
                    ? "drop-shadow(0 0 18px oklch(0.65 0.12 200 / 0.95)) drop-shadow(0 4px 10px oklch(0 0 0 / 0.35))" 
                    : "drop-shadow(0 2px 5px oklch(0 0 0 / 0.2))"
                }}
              />
              <text
                x={475}
                y={2300}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("SACRUM") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_30)]"
                )}
                fontSize="20"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("SACRUM") ? "drop-shadow(0 1px 3px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.15))"
                }}
              >
                SACRUM
              </text>
            </g>

            <g>
              <defs>
                <linearGradient id="coccyx-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.78 0.15 200)" : "oklch(0.90 0.04 320)"} />
                  <stop offset="40%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.70 0.18 195)" : "oklch(0.85 0.05 315)"} />
                  <stop offset="100%" stopColor={selectedVertebrae.includes("COCCYX") ? "oklch(0.62 0.20 190)" : "oklch(0.78 0.06 310)"} />
                </linearGradient>
              </defs>
              <motion.path
                d={`
                  M 475 2390
                  L 460 2410
                  Q 455 2425 458 2435
                  L 475 2445
                  L 492 2435
                  Q 495 2425 490 2410
                  L 475 2390
                  Z
                `}
                fill="url(#coccyx-gradient)"
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("COCCYX") ? "oklch(0.65 0.12 200)" : "oklch(0.70 0.06 320)"}
                strokeWidth={selectedVertebrae.includes("COCCYX") ? 4 : 2.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("COCCYX") 
                    ? "drop-shadow(0 0 18px oklch(0.65 0.12 200 / 0.95)) drop-shadow(0 4px 10px oklch(0 0 0 / 0.35))" 
                    : "drop-shadow(0 2px 5px oklch(0 0 0 / 0.2))"
                }}
              />
              <text
                x={475}
                y={2418}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("COCCYX") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_320)]"
                )}
                fontSize="18"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("COCCYX") ? "drop-shadow(0 1px 3px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.15))"
                }}
              >
                COCCYX
              </text>
            </g>

            <text x="475" y="2480" textAnchor="middle" fontSize="52" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              {practiceName.toUpperCase()}
            </text>
            
            <g fontSize="16" fontFamily="var(--font-body)" fill="oklch(0.20 0 0)">
              <text x="80" y="2450" fontWeight="600">CLIENT:</text>
              <line x1="180" y1="2455" x2="420" y2="2455" stroke="oklch(0.50 0 0)" strokeWidth="1.5" />
              
              <text x="530" y="2450" fontWeight="600">DATE:</text>
              <line x1="600" y1="2455" x2="870" y2="2455" stroke="oklch(0.50 0 0)" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-8 text-center max-w-3xl mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          <strong>Interactive Chart:</strong> Click vertebrae to select multiple areas for your subluxation pattern report. 
          Click again to deselect.
        </p>
        <p className="text-sm text-muted-foreground mt-3 italic">
          Chart design from {practiceName}
        </p>
      </div>
    </div>
  )
}
