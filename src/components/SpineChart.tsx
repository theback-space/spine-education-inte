import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpineChartProps {
  view: "front" | "side"
  selectedVertebra: string | null
  onVertebraClick: (id: string) => void
  onVertebraHover: (id: string | null) => void
}

interface VertebraElement {
  id: string
  x: number
  y: number
  width: number
  height: number
}

const cervicalVertebrae: VertebraElement[] = [
  { id: "C1", x: 145, y: 40, width: 30, height: 12 },
  { id: "C2", x: 145, y: 55, width: 30, height: 12 },
  { id: "C3", x: 145, y: 70, width: 32, height: 12 },
  { id: "C4", x: 144, y: 85, width: 34, height: 12 },
  { id: "C5", x: 143, y: 100, width: 36, height: 12 },
  { id: "C6", x: 142, y: 115, width: 38, height: 12 },
  { id: "C7", x: 141, y: 130, width: 40, height: 12 },
]

const thoracicVertebrae: VertebraElement[] = [
  { id: "T1", x: 140, y: 148, width: 42, height: 11 },
  { id: "T2", x: 139, y: 162, width: 44, height: 11 },
  { id: "T3", x: 138, y: 176, width: 46, height: 11 },
  { id: "T4", x: 137, y: 190, width: 48, height: 11 },
  { id: "T5", x: 136, y: 204, width: 50, height: 11 },
  { id: "T6", x: 135, y: 218, width: 52, height: 11 },
  { id: "T7", x: 135, y: 232, width: 52, height: 11 },
  { id: "T8", x: 136, y: 246, width: 50, height: 11 },
  { id: "T9", x: 137, y: 260, width: 48, height: 11 },
  { id: "T10", x: 138, y: 274, width: 46, height: 11 },
  { id: "T11", x: 139, y: 288, width: 44, height: 11 },
  { id: "T12", x: 140, y: 302, width: 42, height: 11 },
]

const lumbarVertebrae: VertebraElement[] = [
  { id: "L1", x: 139, y: 318, width: 44, height: 14 },
  { id: "L2", x: 138, y: 335, width: 46, height: 14 },
  { id: "L3", x: 137, y: 352, width: 48, height: 14 },
  { id: "L4", x: 136, y: 369, width: 50, height: 14 },
  { id: "L5", x: 135, y: 386, width: 52, height: 14 },
]

const sacralVertebrae: VertebraElement[] = [
  { id: "SACRUM", x: 133, y: 405, width: 56, height: 35 },
  { id: "COCCYX", x: 145, y: 443, width: 32, height: 22 },
]

export function SpineChart({ view, selectedVertebra, onVertebraClick, onVertebraHover }: SpineChartProps) {
  const allVertebrae = [...cervicalVertebrae, ...thoracicVertebrae, ...lumbarVertebrae, ...sacralVertebrae]

  const renderVertebra = (v: VertebraElement) => {
    const isSelected = selectedVertebra === v.id
    const isCervical = v.id.startsWith("C")
    const isThoracic = v.id.startsWith("T")
    const isLumbar = v.id.startsWith("L")

    return (
      <g key={v.id}>
        <motion.rect
          x={v.x}
          y={v.y}
          width={v.width}
          height={v.height}
          rx={2}
          className={cn(
            "cursor-pointer transition-all duration-200",
            isSelected 
              ? "fill-accent stroke-accent-foreground" 
              : "fill-muted stroke-muted-foreground hover:fill-accent/70 hover:stroke-accent"
          )}
          strokeWidth={isSelected ? 2.5 : 1.5}
          onClick={() => onVertebraClick(v.id)}
          onMouseEnter={() => onVertebraHover(v.id)}
          onMouseLeave={() => onVertebraHover(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{
            filter: isSelected ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))" : "none"
          }}
        />
        <text
          x={v.x + v.width / 2}
          y={v.y + v.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(
            "pointer-events-none select-none text-[9px] font-semibold",
            isSelected ? "fill-accent-foreground" : "fill-foreground"
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {v.id}
        </text>
      </g>
    )
  }

  return (
    <div className="w-full flex justify-center items-start py-6">
      <svg
        viewBox="0 0 320 480"
        className="w-full max-w-md h-auto"
        style={{ maxHeight: "70vh" }}
      >
        <defs>
          <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.92 0.01 240)" />
            <stop offset="100%" stopColor="oklch(0.85 0.01 240)" />
          </linearGradient>
        </defs>

        <rect x="155" y="35" width="10" height="432" fill="url(#spineGradient)" rx="5" opacity="0.3" />

        <text
          x="25"
          y="80"
          className="text-[11px] font-semibold fill-muted-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Cervical
        </text>
        <line x1="60" y1="78" x2="130" y2="78" stroke="oklch(0.75 0.01 240)" strokeWidth="1" strokeDasharray="2,2" />

        <text
          x="15"
          y="225"
          className="text-[11px] font-semibold fill-muted-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thoracic
        </text>
        <line x1="60" y1="223" x2="125" y2="223" stroke="oklch(0.75 0.01 240)" strokeWidth="1" strokeDasharray="2,2" />

        <text
          x="25"
          y="355"
          className="text-[11px] font-semibold fill-muted-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Lumbar
        </text>
        <line x1="60" y1="353" x2="127" y2="353" stroke="oklch(0.75 0.01 240)" strokeWidth="1" strokeDasharray="2,2" />

        <text
          x="235"
          y="425"
          className="text-[11px] font-semibold fill-muted-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sacral
        </text>
        <line x1="193" y1="423" x2="230" y2="423" stroke="oklch(0.75 0.01 240)" strokeWidth="1" strokeDasharray="2,2" />

        {allVertebrae.map(renderVertebra)}
      </svg>
    </div>
  )
}
