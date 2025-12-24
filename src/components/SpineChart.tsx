import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useKV } from "@github/spark/hooks"

interface SpineChartProps {
  view: "front" | "side"
  selectedVertebrae: string[]
  onVertebraClick: (id: string) => void
  onVertebraHover: (id: string | null) => void
  practiceName?: string
  clientName?: string
}

interface VertebraRegion {
  id: string
  cx: number
  cy: number
  label: string
  type: "cervical" | "thoracic" | "lumbar"
}

const vertebraRegions: VertebraRegion[] = [
  { id: "C1", cx: 475, cy: 260, label: "C1", type: "cervical" },
  { id: "C2", cx: 475, cy: 330, label: "C2", type: "cervical" },
  { id: "C3", cx: 475, cy: 400, label: "C3", type: "cervical" },
  { id: "C4", cx: 475, cy: 470, label: "C4", type: "cervical" },
  { id: "C5", cx: 475, cy: 540, label: "C5", type: "cervical" },
  { id: "C6", cx: 475, cy: 610, label: "C6", type: "cervical" },
  { id: "C7", cx: 475, cy: 680, label: "C7", type: "cervical" },
  
  { id: "T1", cx: 475, cy: 760, label: "T1", type: "thoracic" },
  { id: "T2", cx: 475, cy: 835, label: "T2", type: "thoracic" },
  { id: "T3", cx: 475, cy: 910, label: "T3", type: "thoracic" },
  { id: "T4", cx: 475, cy: 985, label: "T4", type: "thoracic" },
  { id: "T5", cx: 475, cy: 1060, label: "T5", type: "thoracic" },
  { id: "T6", cx: 475, cy: 1135, label: "T6", type: "thoracic" },
  { id: "T7", cx: 475, cy: 1210, label: "T7", type: "thoracic" },
  { id: "T8", cx: 475, cy: 1285, label: "T8", type: "thoracic" },
  { id: "T9", cx: 475, cy: 1360, label: "T9", type: "thoracic" },
  { id: "T10", cx: 475, cy: 1435, label: "T10", type: "thoracic" },
  { id: "T11", cx: 475, cy: 1510, label: "T11", type: "thoracic" },
  { id: "T12", cx: 475, cy: 1585, label: "T12", type: "thoracic" },
  
  { id: "L1", cx: 475, cy: 1680, label: "L1", type: "lumbar" },
  { id: "L2", cx: 475, cy: 1785, label: "L2", type: "lumbar" },
  { id: "L3", cx: 475, cy: 1890, label: "L3", type: "lumbar" },
  { id: "L4", cx: 475, cy: 1995, label: "L4", type: "lumbar" },
  { id: "L5", cx: 475, cy: 2100, label: "L5", type: "lumbar" },
]

function getVertebraPath(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): string {
  if (type === "cervical") {
    const bodyWidth = 62
    const bodyHeight = 52
    const processWidth = 88
    const archHeight = 28
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 5} ${cy - bodyHeight/4} ${cx - bodyWidth/2 - 7} ${cy}
      Q ${cx - bodyWidth/2 - 5} ${cy + bodyHeight/4} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 5} ${cy + bodyHeight/4} ${cx + bodyWidth/2 + 7} ${cy}
      Q ${cx + bodyWidth/2 + 5} ${cy - bodyHeight/4} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - processWidth/2} ${cy - bodyHeight/2 - 5}
      L ${cx - bodyWidth/2 - 4} ${cy - bodyHeight/2 - archHeight}
      Q ${cx - bodyWidth/2 - 14} ${cy - bodyHeight/2 - archHeight - 7} ${cx - bodyWidth/2 - 22} ${cy - bodyHeight/2 - archHeight - 4}
      L ${cx - bodyWidth/2 - 25} ${cy - bodyHeight/2 - 4}
      Z
      M ${cx + processWidth/2} ${cy - bodyHeight/2 - 5}
      L ${cx + bodyWidth/2 + 4} ${cy - bodyHeight/2 - archHeight}
      Q ${cx + bodyWidth/2 + 14} ${cy - bodyHeight/2 - archHeight - 7} ${cx + bodyWidth/2 + 22} ${cy - bodyHeight/2 - archHeight - 4}
      L ${cx + bodyWidth/2 + 25} ${cy - bodyHeight/2 - 4}
      Z
    `
  } else if (type === "thoracic") {
    const bodyWidth = 58
    const bodyHeight = 56
    const processLength = 26
    const spinousLength = 33
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 4} ${cy - bodyHeight/4} ${cx - bodyWidth/2 - 5} ${cy}
      Q ${cx - bodyWidth/2 - 4} ${cy + bodyHeight/4} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 4} ${cy + bodyHeight/4} ${cx + bodyWidth/2 + 5} ${cy}
      Q ${cx + bodyWidth/2 + 4} ${cy - bodyHeight/4} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 3} ${cy - 7}
      L ${cx - bodyWidth/2 - processLength} ${cy - 13}
      L ${cx - bodyWidth/2 - processLength - 6} ${cy - 5}
      L ${cx - bodyWidth/2 - processLength} ${cy + 2}
      Z
      M ${cx + bodyWidth/2 + 3} ${cy - 7}
      L ${cx + bodyWidth/2 + processLength} ${cy - 13}
      L ${cx + bodyWidth/2 + processLength + 6} ${cy - 5}
      L ${cx + bodyWidth/2 + processLength} ${cy + 2}
      Z
      M ${cx} ${cy - bodyHeight/2}
      L ${cx - 5} ${cy - bodyHeight/2 - spinousLength}
      L ${cx} ${cy - bodyHeight/2 - spinousLength - 4}
      L ${cx + 5} ${cy - bodyHeight/2 - spinousLength}
      Z
    `
  } else {
    const bodyWidth = 76
    const bodyHeight = 68
    const processWidth = 98
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 7} ${cy - bodyHeight/4} ${cx - bodyWidth/2 - 9} ${cy}
      Q ${cx - bodyWidth/2 - 7} ${cy + bodyHeight/4} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 7} ${cy + bodyHeight/4} ${cx + bodyWidth/2 + 9} ${cy}
      Q ${cx + bodyWidth/2 + 7} ${cy - bodyHeight/4} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 7} ${cy - 4}
      L ${cx - processWidth/2} ${cy - 15}
      L ${cx - processWidth/2 - 9} ${cy - 4}
      L ${cx - processWidth/2 - 6} ${cy + 9}
      Z
      M ${cx + bodyWidth/2 + 7} ${cy - 4}
      L ${cx + processWidth/2} ${cy - 15}
      L ${cx + processWidth/2 + 9} ${cy - 4}
      L ${cx + processWidth/2 + 6} ${cy + 9}
      Z
    `
  }
}

function getVertebraLabelPosition(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): { x: number; y: number } {
  return { x: cx, y: cy + 2 }
}



export function SpineChart({ view, selectedVertebrae, onVertebraClick, onVertebraHover, practiceName = "THE-BACK.SPACE", clientName = "" }: SpineChartProps) {
  const [brandFont] = useKV<string>("brand-font", "Space Grotesk")
  const [logoUrl] = useKV<string>("logo-url", "")

  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div className="relative w-full mx-auto">
        <div className="w-full relative bg-[oklch(0.97_0.008_45)] rounded-lg border-[8px] border-[oklch(0.75_0.015_38)] shadow-2xl overflow-hidden">
          <svg
            viewBox="0 0 950 2900"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="spineGradientCervical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.75 0.12 340)" />
                <stop offset="100%" stopColor="oklch(0.68 0.14 335)" />
              </linearGradient>
              <linearGradient id="spineGradientThoracic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.72 0.12 200)" />
                <stop offset="100%" stopColor="oklch(0.65 0.14 195)" />
              </linearGradient>
              <linearGradient id="spineGradientLumbar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.70 0.12 120)" />
                <stop offset="100%" stopColor="oklch(0.62 0.14 115)" />
              </linearGradient>
              <linearGradient id="sacrumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.72 0.10 50)" />
                <stop offset="100%" stopColor="oklch(0.65 0.12 45)" />
              </linearGradient>
              <linearGradient id="boneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.88 0.02 50)" />
                <stop offset="100%" stopColor="oklch(0.80 0.03 45)" />
              </linearGradient>
              <linearGradient id="selectedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.65 0.26 25)" />
                <stop offset="40%" stopColor="oklch(0.58 0.28 25)" />
                <stop offset="100%" stopColor="oklch(0.50 0.30 25)" />
              </linearGradient>
              <linearGradient id="hipBoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.90 0.03 50)" />
                <stop offset="50%" stopColor="oklch(0.85 0.04 48)" />
                <stop offset="100%" stopColor="oklch(0.78 0.05 45)" />
              </linearGradient>
            </defs>

            <rect width="950" height="2900" fill="oklch(0.985 0.002 45)" />

            <text x="475" y="70" textAnchor="middle" fontSize="62" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              YOUR SUBLUXATION PATTERN
            </text>
            <text x="475" y="125" textAnchor="middle" fontSize="26" fontWeight="500" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)" letterSpacing="3">
              THE SPINE AND NERVOUS SYSTEM
            </text>

            <g opacity="0.5">
              <ellipse cx="475" cy="190" rx="120" ry="135" fill="url(#boneGradient)" stroke="oklch(0.60 0.03 45)" strokeWidth="3"/>
              <ellipse cx="475" cy="175" rx="95" ry="105" fill="oklch(0.92 0.01 48)" stroke="oklch(0.60 0.03 45)" strokeWidth="2.5"/>
              <text x="475" y="140" textAnchor="middle" fontSize="18" fontWeight="700" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)">SKULL</text>
            </g>

            <text x="190" y="470" textAnchor="middle" fontSize="26" fontWeight="700" fill="oklch(0.70 0.12 340)" fontFamily="var(--font-heading)">CERVICAL</text>
            <line x1="250" y1="470" x2="360" y2="470" stroke="oklch(0.70 0.12 340)" strokeWidth="3.5"/>

            <text x="190" y="1210" textAnchor="middle" fontSize="26" fontWeight="700" fill="oklch(0.68 0.12 200)" fontFamily="var(--font-heading)">THORACIC</text>
            <line x1="250" y1="1210" x2="360" y2="1210" stroke="oklch(0.68 0.12 200)" strokeWidth="3.5"/>

            <text x="190" y="1890" textAnchor="middle" fontSize="26" fontWeight="700" fill="oklch(0.66 0.12 120)" fontFamily="var(--font-heading)">LUMBAR</text>
            <line x1="250" y1="1890" x2="360" y2="1890" stroke="oklch(0.66 0.12 120)" strokeWidth="3.5"/>

            <text x="190" y="2215" textAnchor="middle" fontSize="26" fontWeight="700" fill="oklch(0.68 0.10 50)" fontFamily="var(--font-heading)">SACRAL</text>
            <line x1="250" y1="2215" x2="360" y2="2215" stroke="oklch(0.68 0.10 50)" strokeWidth="3.5"/>

            {vertebraRegions.map((region) => {
              const isSelected = selectedVertebrae.includes(region.id)
              const vertebraPath = getVertebraPath(region.cx, region.cy, region.type)
              const labelPos = getVertebraLabelPosition(region.cx, region.cy, region.type)
              
              let baseColorStart, baseColorMid, baseColorEnd, strokeColor
              
              if (region.type === "cervical") {
                baseColorStart = "oklch(0.88 0.08 340)"
                baseColorMid = "oklch(0.82 0.10 338)"
                baseColorEnd = "oklch(0.75 0.12 335)"
                strokeColor = isSelected ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 340)"
              } else if (region.type === "thoracic") {
                baseColorStart = "oklch(0.88 0.08 200)"
                baseColorMid = "oklch(0.82 0.10 198)"
                baseColorEnd = "oklch(0.75 0.12 195)"
                strokeColor = isSelected ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 200)"
              } else {
                baseColorStart = "oklch(0.88 0.08 120)"
                baseColorMid = "oklch(0.82 0.10 118)"
                baseColorEnd = "oklch(0.75 0.12 115)"
                strokeColor = isSelected ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 120)"
              }
              
              return (
                <g key={region.id}>
                  {!isSelected && (
                    <defs>
                      <linearGradient id={`vertebra-gradient-${region.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={baseColorStart} />
                        <stop offset="40%" stopColor={baseColorMid} />
                        <stop offset="100%" stopColor={baseColorEnd} />
                      </linearGradient>
                    </defs>
                  )}
                  <motion.path
                    d={vertebraPath}
                    fill={isSelected ? "url(#selectedGradient)" : `url(#vertebra-gradient-${region.id})`}
                    className="cursor-pointer"
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 5 : 3.5}
                    strokeLinejoin="round"
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.05, strokeWidth: 4.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      filter: isSelected 
                        ? `drop-shadow(0 0 24px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 6px 16px oklch(0 0 0 / 0.4))` 
                        : "drop-shadow(0 3px 8px oklch(0 0 0 / 0.2))"
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
                    fontSize={region.type === "lumbar" ? "24" : region.type === "thoracic" ? "22" : "23"}
                    fontFamily="var(--font-heading)"
                    style={{
                      filter: isSelected ? "drop-shadow(0 2px 4px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                    }}
                  >
                    {region.label}
                  </text>
                </g>
              )
            })}

            <g>
              {!selectedVertebrae.includes("SACRUM") && (
                <defs>
                  <linearGradient id="sacrum-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.88 0.08 50)" />
                    <stop offset="40%" stopColor="oklch(0.82 0.10 48)" />
                    <stop offset="100%" stopColor="oklch(0.75 0.12 45)" />
                  </linearGradient>
                </defs>
              )}
              <motion.path
                d={`
                  M 475 2215
                  L 420 2240
                  Q 410 2270 418 2310
                  L 438 2370
                  L 475 2395
                  L 512 2370
                  L 532 2310
                  Q 540 2270 530 2240
                  L 475 2215
                  Z
                `}
                fill={selectedVertebrae.includes("SACRUM") ? "url(#selectedGradient)" : "url(#sacrum-gradient)"}
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("SACRUM") ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 50)"}
                strokeWidth={selectedVertebrae.includes("SACRUM") ? 5 : 3.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.05, strokeWidth: 4.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("SACRUM") 
                    ? "drop-shadow(0 0 24px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 6px 16px oklch(0 0 0 / 0.4))" 
                    : "drop-shadow(0 3px 8px oklch(0 0 0 / 0.2))"
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
                fontSize="24"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("SACRUM") ? "drop-shadow(0 2px 4px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                }}
              >
                SACRUM
              </text>
            </g>

            <g>
              {!selectedVertebrae.includes("COCCYX") && (
                <defs>
                  <linearGradient id="coccyx-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.88 0.08 320)" />
                    <stop offset="40%" stopColor="oklch(0.82 0.10 318)" />
                    <stop offset="100%" stopColor="oklch(0.75 0.12 315)" />
                  </linearGradient>
                </defs>
              )}
              <motion.path
                d={`
                  M 475 2405
                  L 455 2435
                  Q 448 2460 453 2480
                  L 475 2500
                  L 497 2480
                  Q 502 2460 495 2435
                  L 475 2405
                  Z
                `}
                fill={selectedVertebrae.includes("COCCYX") ? "url(#selectedGradient)" : "url(#coccyx-gradient)"}
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("COCCYX") ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 320)"}
                strokeWidth={selectedVertebrae.includes("COCCYX") ? 5 : 3.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.05, strokeWidth: 4.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("COCCYX") 
                    ? "drop-shadow(0 0 24px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 6px 16px oklch(0 0 0 / 0.4))" 
                    : "drop-shadow(0 3px 8px oklch(0 0 0 / 0.2))"
                }}
              />
              <text
                x={475}
                y={2453}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("COCCYX") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_320)]"
                )}
                fontSize="22"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("COCCYX") ? "drop-shadow(0 2px 4px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 3px oklch(0 0 0 / 0.15))"
                }}
              >
                COCCYX
              </text>
            </g>

            <g opacity="0.6">
              <path 
                d="M 260 2215 
                   Q 245 2140 280 2055 
                   Q 305 1990 348 1970 
                   L 358 2020 
                   Q 364 2090 358 2160 
                   Q 352 2210 340 2260 
                   Q 325 2320 305 2365 
                   L 290 2385 
                   Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="4"
              />
              <path 
                d="M 690 2215 
                   Q 705 2140 670 2055 
                   Q 645 1990 602 1970 
                   L 592 2020 
                   Q 586 2090 592 2160 
                   Q 598 2210 610 2260 
                   Q 625 2320 645 2365 
                   L 660 2385 
                   Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="4"
              />
              
              <ellipse cx="260" cy="2400" rx="52" ry="62" fill="oklch(0.92 0.02 48)" stroke="oklch(0.55 0.04 45)" strokeWidth="4"/>
              <path 
                d="M 208 2400 
                   Q 195 2350 202 2300 
                   L 220 2310 
                   Q 215 2365 220 2400 
                   Q 225 2435 235 2465 
                   L 217 2475 
                   Q 205 2435 208 2400 Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="3.5"
              />
              <ellipse cx="260" cy="2400" rx="30" ry="38" fill="oklch(0.82 0.02 48)" stroke="oklch(0.65 0.03 45)" strokeWidth="2.5"/>
              
              <ellipse cx="690" cy="2400" rx="52" ry="62" fill="oklch(0.92 0.02 48)" stroke="oklch(0.55 0.04 45)" strokeWidth="4"/>
              <path 
                d="M 742 2400 
                   Q 755 2350 748 2300 
                   L 730 2310 
                   Q 735 2365 730 2400 
                   Q 725 2435 715 2465 
                   L 733 2475 
                   Q 745 2435 742 2400 Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="3.5"
              />
              <ellipse cx="690" cy="2400" rx="30" ry="38" fill="oklch(0.82 0.02 48)" stroke="oklch(0.65 0.03 45)" strokeWidth="2.5"/>
              
              <text x="180" y="2480" textAnchor="middle" fontSize="22" fontWeight="700" fill="oklch(0.25 0 0)" fontFamily="var(--font-body)">HIP</text>
              <text x="770" y="2480" textAnchor="middle" fontSize="22" fontWeight="700" fill="oklch(0.25 0 0)" fontFamily="var(--font-body)">HIP</text>
            </g>

            {logoUrl ? (
              <image
                href={logoUrl}
                x="350"
                y="2540"
                width="250"
                height="80"
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <text 
                x="475" 
                y="2590" 
                textAnchor="middle" 
                fontSize="62" 
                fontWeight="700" 
                fill="oklch(0.15 0 0)" 
                fontFamily={brandFont || "var(--font-heading)"} 
                letterSpacing="2"
              >
                {practiceName.toUpperCase()}
              </text>
            )}
            
            <g fontSize="22" fontFamily="var(--font-body)" fill="oklch(0.20 0 0)">
              <text x="100" y="2690" fontWeight="600">CLIENT:</text>
              {clientName ? (
                <text x="230" y="2690" fontWeight="500" fill="oklch(0.35 0 0)">{clientName}</text>
              ) : (
                <line x1="230" y1="2698" x2="520" y2="2698" stroke="oklch(0.50 0 0)" strokeWidth="2" />
              )}
              
              <text x="570" y="2690" fontWeight="600">DATE:</text>
              <line x1="660" y1="2698" x2="850" y2="2698" stroke="oklch(0.50 0 0)" strokeWidth="2" />
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
