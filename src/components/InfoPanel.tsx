import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VertebraData } from "@/lib/spineData"

interface InfoPanelProps {
  vertebraeData: VertebraData[]
}

export function InfoPanel({ vertebraeData }: InfoPanelProps) {
  if (!vertebraeData || vertebraeData.length === 0) return null

  const aggregateUniqueItems = (items: string[][]) => {
    return Array.from(new Set(items.flat())).sort()
  }

  const allNerveSupply = aggregateUniqueItems(vertebraeData.map(v => v.nerveSupply))
  const allOrgans = aggregateUniqueItems(vertebraeData.map(v => v.associatedOrgans))
  const allSymptoms = aggregateUniqueItems(vertebraeData.map(v => v.commonSymptoms))

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <Card className="p-6 shadow-lg border-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Subluxation Pattern Summary
              </h2>
              <div className="flex flex-wrap gap-2">
                {vertebraeData.map((v) => (
                  <Badge 
                    key={v.id}
                    variant="default" 
                    className="text-base px-3 py-1.5 bg-accent text-accent-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {v.name}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {vertebraeData.length} vertebra{vertebraeData.length !== 1 ? 'e' : ''} selected
              </p>
            </div>

            <Separator />

            {vertebraeData.length === 1 ? (
              <>
                <div className="space-y-2">
                  <h3 
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {vertebraeData[0].fullName}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {vertebraeData[0].description}
                  </p>
                </div>

                <Separator />
              </>
            ) : (
              <>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  <h3 
                    className="text-lg font-semibold text-foreground sticky top-0 bg-card pb-2 z-10"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Selected Vertebrae Details
                  </h3>
                  <div className="space-y-3">
                    {vertebraeData.map((v) => (
                      <div key={v.id} className="bg-muted/30 rounded-md p-3">
                        <p className="font-semibold text-sm text-foreground mb-1">{v.fullName}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />
              </>
            )}

            <div className="space-y-5">
              <h3 
                className="text-lg font-semibold text-foreground mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Possible/Likely Symptoms When Subluxated
              </h3>
              <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2">
                {vertebraeData.map((v) => (
                  <div key={v.id} className="bg-muted/20 rounded-lg p-4 border-l-4 border-accent">
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <Badge 
                        variant="default" 
                        className="text-sm font-bold px-3 py-1.5 bg-accent text-accent-foreground shrink-0"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {v.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{v.fullName}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {v.commonSymptoms.map((symptom, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline"
                          className="text-xs px-2.5 py-1 border-accent/40 bg-background/50 whitespace-normal text-center"
                        >
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground italic">
                This information is for educational purposes. Always consult with a healthcare professional for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
