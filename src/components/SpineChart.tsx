import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useKV } from "@github/spark/hooks"

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
  { id: "C1", cx: 475, cy: 240, label: "C1", type: "cervical" },
  { id: "C2", cx: 475, cy: 280, label: "C2", type: "cervical" },
  { id: "C3", cx: 475, cy: 320, label: "C3", type: "cervical" },
  { id: "C4", cx: 475, cy: 360, label: "C4", type: "cervical" },
  { id: "C5", cx: 475, cy: 400, label: "C5", type: "cervical" },
  { id: "C6", cx: 475, cy: 440, label: "C6", type: "cervical" },
  { id: "C7", cx: 475, cy: 480, label: "C7", type: "cervical" },
  
  { id: "T1", cx: 475, cy: 525, label: "T1", type: "thoracic" },
  { id: "T2", cx: 475, cy: 565, label: "T2", type: "thoracic" },
  { id: "T3", cx: 475, cy: 605, label: "T3", type: "thoracic" },
  { id: "T4", cx: 475, cy: 645, label: "T4", type: "thoracic" },
  { id: "T5", cx: 475, cy: 685, label: "T5", type: "thoracic" },
  { id: "T6", cx: 475, cy: 725, label: "T6", type: "thoracic" },
  { id: "T7", cx: 475, cy: 765, label: "T7", type: "thoracic" },
  { id: "T8", cx: 475, cy: 805, label: "T8", type: "thoracic" },
  { id: "T9", cx: 475, cy: 845, label: "T9", type: "thoracic" },
  { id: "T10", cx: 475, cy: 885, label: "T10", type: "thoracic" },
  { id: "T11", cx: 475, cy: 925, label: "T11", type: "thoracic" },
  { id: "T12", cx: 475, cy: 965, label: "T12", type: "thoracic" },
  
  { id: "L1", cx: 475, cy: 1015, label: "L1", type: "lumbar" },
  { id: "L2", cx: 475, cy: 1065, label: "L2", type: "lumbar" },
  { id: "L3", cx: 475, cy: 1115, label: "L3", type: "lumbar" },
  { id: "L4", cx: 475, cy: 1165, label: "L4", type: "lumbar" },
  { id: "L5", cx: 475, cy: 1215, label: "L5", type: "lumbar" },
]

function getVertebraPath(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): string {
  if (type === "cervical") {
    const bodyWidth = 37.5
    const bodyHeight = 31.5
    const processWidth = 52.5
    const processHeight = 13.5
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx + bodyWidth/2 + 6} ${cy} ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx - bodyWidth/2 - 6} ${cy} ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - processWidth/2} ${cy - bodyHeight/2 - 7.5}
      L ${cx - bodyWidth/2 - 3.75} ${cy - bodyHeight/2 - processHeight}
      L ${cx - bodyWidth/2 - 11.25} ${cy - bodyHeight/2 - processHeight - 6}
      L ${cx - bodyWidth/2 - 13.5} ${cy - bodyHeight/2 - 3.75}
      Z
      M ${cx + processWidth/2} ${cy - bodyHeight/2 - 7.5}
      L ${cx + bodyWidth/2 + 3.75} ${cy - bodyHeight/2 - processHeight}
      L ${cx + bodyWidth/2 + 11.25} ${cy - bodyHeight/2 - processHeight - 6}
      L ${cx + bodyWidth/2 + 13.5} ${cy - bodyHeight/2 - 3.75}
      Z
    `
  } else if (type === "thoracic") {
    const bodyWidth = 36
    const bodyHeight = 34.5
    const processLength = 16.5
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 3} ${cy} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 3} ${cy} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 3.75} ${cy - 6}
      L ${cx - bodyWidth/2 - processLength} ${cy - 9}
      L ${cx - bodyWidth/2 - processLength - 3.75} ${cy - 4.5}
      L ${cx - bodyWidth/2 - processLength} ${cy}
      Z
      M ${cx + bodyWidth/2 + 3.75} ${cy - 6}
      L ${cx + bodyWidth/2 + processLength} ${cy - 9}
      L ${cx + bodyWidth/2 + processLength + 3.75} ${cy - 4.5}
      L ${cx + bodyWidth/2 + processLength} ${cy}
      Z
      M ${cx} ${cy - bodyHeight/2}
      L ${cx - 4.5} ${cy - bodyHeight/2 - 13.5}
      L ${cx} ${cy - bodyHeight/2 - 16.5}
      L ${cx + 4.5} ${cy - bodyHeight/2 - 13.5}
      Z
    `
  } else {
    const bodyWidth = 46.5
    const bodyHeight = 42
    const processWidth = 60
    
    return `
      M ${cx - bodyWidth/2} ${cy - bodyHeight/2}
      Q ${cx - bodyWidth/2 - 4.5} ${cy} ${cx - bodyWidth/2} ${cy + bodyHeight/2}
      L ${cx + bodyWidth/2} ${cy + bodyHeight/2}
      Q ${cx + bodyWidth/2 + 4.5} ${cy} ${cx + bodyWidth/2} ${cy - bodyHeight/2}
      Z
      M ${cx - bodyWidth/2 - 6} ${cy}
      L ${cx - processWidth/2} ${cy - 7.5}
      L ${cx - processWidth/2 - 6} ${cy - 3}
      L ${cx - processWidth/2 - 4.5} ${cy + 6}
      Z
      M ${cx + bodyWidth/2 + 6} ${cy}
      L ${cx + processWidth/2} ${cy - 7.5}
      L ${cx + processWidth/2 + 6} ${cy - 3}
      L ${cx + processWidth/2 + 4.5} ${cy + 6}
      Z
    `
  }
}

function getVertebraLabelPosition(cx: number, cy: number, type: "cervical" | "thoracic" | "lumbar"): { x: number; y: number } {
  return { x: cx, y: cy + 2 }
}



export function SpineChart({ view, selectedVertebrae, onVertebraClick, onVertebraHover, practiceName = "THE-BACK.SPACE" }: SpineChartProps) {
  const [brandFont] = useKV<string>("brand-font", "Space Grotesk")
  const [logoUrl] = useKV<string>("logo-url", "")

  return (
    <div className="w-full flex flex-col items-center justify-start py-4">
      <div className="relative w-full mx-auto">
        <div className="w-full relative bg-[oklch(0.97_0.008_45)] rounded-lg border-[8px] border-[oklch(0.75_0.015_38)] shadow-2xl overflow-hidden">
          <svg
            viewBox="0 0 950 1600"
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

            <rect width="950" height="2100" fill="oklch(0.985 0.002 45)" />

            <text x="475" y="60" textAnchor="middle" fontSize="52" fontWeight="700" fill="oklch(0.15 0 0)" fontFamily="var(--font-heading)" letterSpacing="2">
              YOUR SUBLUXATION PATTERN
            </text>
            <text x="475" y="100" textAnchor="middle" fontSize="20" fontWeight="500" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)" letterSpacing="3">
              THE SPINE AND NERVOUS SYSTEM
            </text>

            <g opacity="0.5">
              <ellipse cx="475" cy="175" rx="95" ry="110" fill="url(#boneGradient)" stroke="oklch(0.60 0.03 45)" strokeWidth="2.5"/>
              <ellipse cx="475" cy="160" rx="75" ry="85" fill="oklch(0.92 0.01 48)" stroke="oklch(0.60 0.03 45)" strokeWidth="2"/>
              <text x="475" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="oklch(0.30 0 0)" fontFamily="var(--font-body)">SKULL</text>
            </g>

            <text x="200" y="360" textAnchor="middle" fontSize="20" fontWeight="700" fill="oklch(0.70 0.12 340)" fontFamily="var(--font-heading)">CERVICAL</text>
            <line x1="250" y1="360" x2="390" y2="360" stroke="oklch(0.70 0.12 340)" strokeWidth="2.5"/>

            <text x="200" y="745" textAnchor="middle" fontSize="20" fontWeight="700" fill="oklch(0.68 0.12 200)" fontFamily="var(--font-heading)">THORACIC</text>
            <line x1="250" y1="745" x2="390" y2="745" stroke="oklch(0.68 0.12 200)" strokeWidth="2.5"/>

            <text x="200" y="1115" textAnchor="middle" fontSize="20" fontWeight="700" fill="oklch(0.66 0.12 120)" fontFamily="var(--font-heading)">LUMBAR</text>
            <line x1="250" y1="1115" x2="390" y2="1115" stroke="oklch(0.66 0.12 120)" strokeWidth="2.5"/>

            <text x="200" y="1280" textAnchor="middle" fontSize="20" fontWeight="700" fill="oklch(0.68 0.10 50)" fontFamily="var(--font-heading)">SACRAL</text>
            <line x1="250" y1="1280" x2="390" y2="1280" stroke="oklch(0.68 0.10 50)" strokeWidth="2.5"/>

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
                    strokeWidth={isSelected ? 4.5 : 2.5}
                    strokeLinejoin="round"
                    onClick={() => onVertebraClick(region.id)}
                    onMouseEnter={() => onVertebraHover(region.id)}
                    onMouseLeave={() => onVertebraHover(null)}
                    whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      filter: isSelected 
                        ? `drop-shadow(0 0 20px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 4px 12px oklch(0 0 0 / 0.4))` 
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
                    fontSize={region.type === "lumbar" ? "17" : region.type === "thoracic" ? "15" : "16"}
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
                  M 475 1265
                  L 435 1280
                  Q 428 1297 432 1315
                  L 443 1345
                  L 475 1360
                  L 507 1345
                  L 518 1315
                  Q 522 1297 515 1280
                  L 475 1265
                  Z
                `}
                fill={selectedVertebrae.includes("SACRUM") ? "url(#selectedGradient)" : "url(#sacrum-gradient)"}
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("SACRUM") ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 50)"}
                strokeWidth={selectedVertebrae.includes("SACRUM") ? 4.5 : 2.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("SACRUM")}
                onMouseEnter={() => onVertebraHover("SACRUM")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("SACRUM") 
                    ? "drop-shadow(0 0 20px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 4px 12px oklch(0 0 0 / 0.4))" 
                    : "drop-shadow(0 2px 5px oklch(0 0 0 / 0.2))"
                }}
              />
              <text
                x={475}
                y={1315}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("SACRUM") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_30)]"
                )}
                fontSize="17"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("SACRUM") ? "drop-shadow(0 1px 3px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.15))"
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
                  M 475 1367
                  L 463 1380
                  Q 459 1390 461 1397
                  L 475 1405
                  L 489 1397
                  Q 491 1390 487 1380
                  L 475 1367
                  Z
                `}
                fill={selectedVertebrae.includes("COCCYX") ? "url(#selectedGradient)" : "url(#coccyx-gradient)"}
                className="cursor-pointer"
                stroke={selectedVertebrae.includes("COCCYX") ? "oklch(0.50 0.30 25)" : "oklch(0.70 0.10 320)"}
                strokeWidth={selectedVertebrae.includes("COCCYX") ? 4.5 : 2.5}
                strokeLinejoin="round"
                onClick={() => onVertebraClick("COCCYX")}
                onMouseEnter={() => onVertebraHover("COCCYX")}
                onMouseLeave={() => onVertebraHover(null)}
                whileHover={{ scale: 1.08, strokeWidth: 3.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  filter: selectedVertebrae.includes("COCCYX") 
                    ? "drop-shadow(0 0 20px oklch(0.50 0.30 25 / 0.9)) drop-shadow(0 4px 12px oklch(0 0 0 / 0.4))" 
                    : "drop-shadow(0 2px 5px oklch(0 0 0 / 0.2))"
                }}
              />
              <text
                x={475}
                y={1387}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  "pointer-events-none select-none font-bold",
                  selectedVertebrae.includes("COCCYX") ? "fill-[oklch(1_0_0)]" : "fill-[oklch(0.20_0.02_320)]"
                )}
                fontSize="15"
                fontFamily="var(--font-heading)"
                style={{
                  filter: selectedVertebrae.includes("COCCYX") ? "drop-shadow(0 1px 3px oklch(0 0 0 / 0.6))" : "drop-shadow(0 1px 2px oklch(0 0 0 / 0.15))"
                }}
              >
                COCCYX
              </text>
            </g>

            <g opacity="0.6">
              <path 
                d="M 315 1265 
                   Q 308 1225 325 1185 
                   Q 338 1155 362 1145 
                   L 368 1170 
                   Q 372 1210 368 1250 
                   Q 364 1280 355 1305 
                   Q 345 1330 333 1350 
                   L 323 1362 
                   Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="3"
              />
              <path 
                d="M 635 1265 
                   Q 642 1225 625 1185 
                   Q 612 1155 588 1145 
                   L 582 1170 
                   Q 578 1210 582 1250 
                   Q 586 1280 595 1305 
                   Q 605 1330 617 1350 
                   L 627 1362 
                   Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="3"
              />
              
              <ellipse cx="315" cy="1370" rx="38" ry="45" fill="oklch(0.92 0.02 48)" stroke="oklch(0.55 0.04 45)" strokeWidth="3"/>
              <path 
                d="M 277 1370 
                   Q 268 1340 273 1310 
                   L 285 1316 
                   Q 282 1348 285 1370 
                   Q 288 1392 294 1410 
                   L 282 1416 
                   Q 274 1392 277 1370 Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="2.5"
              />
              <ellipse cx="315" cy="1370" rx="22" ry="28" fill="oklch(0.82 0.02 48)" stroke="oklch(0.65 0.03 45)" strokeWidth="1.5"/>
              
              <ellipse cx="635" cy="1370" rx="38" ry="45" fill="oklch(0.92 0.02 48)" stroke="oklch(0.55 0.04 45)" strokeWidth="3"/>
              <path 
                d="M 673 1370 
                   Q 682 1340 677 1310 
                   L 665 1316 
                   Q 668 1348 665 1370 
                   Q 662 1392 656 1410 
                   L 668 1416 
                   Q 676 1392 673 1370 Z" 
                fill="url(#hipBoneGradient)" 
                stroke="oklch(0.55 0.04 45)" 
                strokeWidth="2.5"
              />
              <ellipse cx="635" cy="1370" rx="22" ry="28" fill="oklch(0.82 0.02 48)" stroke="oklch(0.65 0.03 45)" strokeWidth="1.5"/>
              
              <text x="245" y="1420" textAnchor="middle" fontSize="16" fontWeight="700" fill="oklch(0.25 0 0)" fontFamily="var(--font-body)">HIP</text>
              <text x="705" y="1420" textAnchor="middle" fontSize="16" fontWeight="700" fill="oklch(0.25 0 0)" fontFamily="var(--font-body)">HIP</text>
            </g>

            {logoUrl ? (
              <image
                href={logoUrl}
                x="350"
                y="1440"
                width="250"
                height="80"
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <text 
                x="475" 
                y="1480" 
                textAnchor="middle" 
                fontSize="52" 
                fontWeight="700" 
                fill="oklch(0.15 0 0)" 
                fontFamily={brandFont || "var(--font-heading)"} 
                letterSpacing="2"
              >
                {practiceName.toUpperCase()}
              </text>
            )}
            
            <g fontSize="16" fontFamily="var(--font-body)" fill="oklch(0.20 0 0)">
              <text x="80" y="1515" fontWeight="600">CLIENT:</text>
              <line x1="180" y1="1520" x2="420" y2="1520" stroke="oklch(0.50 0 0)" strokeWidth="1.5" />
              
              <text x="530" y="1515" fontWeight="600">DATE:</text>
              <line x1="600" y1="1520" x2="870" y2="1520" stroke="oklch(0.50 0 0)" strokeWidth="1.5" />
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
