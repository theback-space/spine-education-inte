import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface CarePhase {
  id: string
  name: string
  frequency: string
  duration: string
  description: string
  expectations: string
}

const DEFAULT_PHASES: CarePhase[] = [
  {
    id: "phase-1",
    name: "Phase 1: Palliative Care",
    frequency: "2-3 sessions per week",
    duration: "4-6 weeks",
    description: "Focused on symptom reduction and initial stabilization",
    expectations: "During this phase, you can expect initial relief from acute symptoms. Pain and discomfort will begin to reduce as we work to stabilize your spine and reduce inflammation. Your body is starting its healing journey."
  },
  {
    id: "phase-2",
    name: "Phase 2: Supportive Care",
    frequency: "1-2 sessions per week",
    duration: "8-12 weeks",
    description: "Supporting the body's natural healing ability as symptoms calm down",
    expectations: "Symptoms have significantly calmed down and may feel almost 'gone.' We're now focusing on strengthening corrections and supporting your body's natural healing processes. You'll notice improved function and mobility as your spine becomes more stable."
  },
  {
    id: "phase-3",
    name: "Phase 3: Preventative Wellness Care",
    frequency: "1 session every 2-4 weeks",
    duration: "Ongoing",
    description: "Keeping the body moving and operating at its best",
    expectations: "This maintenance phase helps improve overall health and reduce the risk of injury or disease. Your spine is now stable, and we're working to keep it that way. Regular adjustments help maintain optimal nervous system function and overall wellness."
  }
]

export function CareJourney() {
  const [carePhases, setCarePhases] = useKV<CarePhase[]>("care-phases", DEFAULT_PHASES)
  const [isEditing, setIsEditing] = useState(false)
  const [editPhases, setEditPhases] = useState<CarePhase[]>(carePhases || DEFAULT_PHASES)

  const handleSave = () => {
    setCarePhases(editPhases)
    setIsEditing(false)
  }

  const handleReset = () => {
    setEditPhases(carePhases || DEFAULT_PHASES)
    setIsEditing(false)
  }

  const handleAddPhase = () => {
    const newPhase: CarePhase = {
      id: `phase-${Date.now()}`,
      name: "New Phase",
      frequency: "1 session per week",
      duration: "4 weeks",
      description: "Add description here",
      expectations: "Add what the client can expect during this phase"
    }
    setEditPhases((current) => [...current, newPhase])
  }

  const handleRemovePhase = (id: string) => {
    setEditPhases((current) => current.filter(p => p.id !== id))
  }

  const handleUpdatePhase = (id: string, field: keyof CarePhase, value: string) => {
    setEditPhases((current) =>
      current.map(p => p.id === id ? { ...p, [field]: value } : p)
    )
  }

  const phases = isEditing ? editPhases : (carePhases || DEFAULT_PHASES)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="p-6 md:p-8 shadow-lg border-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your Chiropractic Care Journey
              </h2>
              <p className="text-muted-foreground mt-2">
                Personalized recommendations for your healing journey
              </p>
            </div>
            
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="shrink-0"
              >
                Customize Plan
              </Button>
            ) : (
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </Button>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative",
                  isEditing && "bg-muted/30 rounded-lg p-4 border-2 border-dashed"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    {isEditing ? (
                      <>
                        <div>
                          <Label htmlFor={`phase-name-${phase.id}`}>Phase Name</Label>
                          <Input
                            id={`phase-name-${phase.id}`}
                            value={phase.name}
                            onChange={(e) => handleUpdatePhase(phase.id, "name", e.target.value)}
                            className="font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`phase-freq-${phase.id}`}>Frequency</Label>
                            <Input
                              id={`phase-freq-${phase.id}`}
                              value={phase.frequency}
                              onChange={(e) => handleUpdatePhase(phase.id, "frequency", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`phase-dur-${phase.id}`}>Duration</Label>
                            <Input
                              id={`phase-dur-${phase.id}`}
                              value={phase.duration}
                              onChange={(e) => handleUpdatePhase(phase.id, "duration", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`phase-desc-${phase.id}`}>Description</Label>
                          <Textarea
                            id={`phase-desc-${phase.id}`}
                            value={phase.description}
                            onChange={(e) => handleUpdatePhase(phase.id, "description", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`phase-expect-${phase.id}`}>What to Expect</Label>
                          <Textarea
                            id={`phase-expect-${phase.id}`}
                            value={phase.expectations}
                            onChange={(e) => handleUpdatePhase(phase.id, "expectations", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 
                          className="text-xl font-bold text-foreground"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {phase.name}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                          <Badge variant="secondary" className="px-3 py-1 text-sm">
                            <strong className="mr-1">Frequency:</strong> {phase.frequency}
                          </Badge>
                          <Badge variant="secondary" className="px-3 py-1 text-sm">
                            <strong className="mr-1">Duration:</strong> {phase.duration}
                          </Badge>
                        </div>

                        <p className="text-sm font-medium text-foreground italic">
                          {phase.description}
                        </p>

                        <div className="bg-accent/10 rounded-md p-3 border border-accent/20">
                          <p className="text-sm font-semibold text-accent mb-1">
                            What to Expect:
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {phase.expectations}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemovePhase(phase.id)}
                      className="shrink-0 text-destructive hover:text-destructive"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                  )}
                </div>

                {index < phases.length - 1 && !isEditing && (
                  <div className="ml-6 mt-4 mb-2 h-8 w-0.5 bg-border"></div>
                )}
              </motion.div>
            ))}

            {isEditing && (
              <Button
                variant="outline"
                onClick={handleAddPhase}
                className="w-full gap-2 border-dashed"
              >
                <Plus className="w-5 h-5" />
                Add Phase
              </Button>
            )}
          </div>

          <Separator />

          <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
            <p className="text-sm text-foreground">
              <strong style={{ fontFamily: "var(--font-heading)" }}>Important:</strong> This care plan is tailored to your specific subluxation pattern and overall health goals. 
              Consistency is key to achieving optimal results. We'll reassess your progress regularly and adjust as needed.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
