import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VertebraData } from "@/lib/spineData"

interface InfoPanelProps {
  vertebraData: VertebraData | null
}

export function InfoPanel({ vertebraData }: InfoPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {vertebraData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="p-6 shadow-lg border-2">
            <ScrollArea className="h-full max-h-[400px]">
              <div className="space-y-6 pr-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="default" 
                      className="text-lg px-4 py-1.5 bg-accent text-accent-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vertebraData.name}
                    </Badge>
                    <h2 
                      className="text-2xl font-bold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {vertebraData.fullName}
                    </h2>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {vertebraData.description}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Nerve Supply
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {vertebraData.nerveSupply.map((nerve, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {nerve}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Associated Organs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {vertebraData.associatedOrgans.map((organ, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className="text-sm px-3 py-1 border-primary/30"
                      >
                        {organ}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Common Symptoms When Misaligned
                  </h3>
                  <ul className="space-y-2">
                    {vertebraData.commonSymptoms.map((symptom, idx) => (
                      <li 
                        key={idx}
                        className="text-sm text-foreground flex items-start"
                      >
                        <span className="text-accent mr-2 mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground italic">
                    This information is for educational purposes. Always consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
