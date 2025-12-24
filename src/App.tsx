import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SpineChart } from "@/components/SpineChart"
import { InfoPanel } from "@/components/InfoPanel"
import { getVertebraById } from "@/lib/spineData"
import { ArrowsClockwise, DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react"
import { toast } from "sonner"

function App() {
  const [selectedVertebra, setSelectedVertebra] = useKV<string | null>("selected-vertebra", null)
  const [view, setView] = useState<"front" | "side">("front")
  const [hoveredVertebra, setHoveredVertebra] = useState<string | null>(null)

  const vertebraData = selectedVertebra ? getVertebraById(selectedVertebra) : null

  const handleVertebraClick = (id: string) => {
    setSelectedVertebra(id)
  }

  const handleReset = () => {
    setSelectedVertebra(null)
    toast.success("View reset")
  }

  const handleDownloadPDF = () => {
    if (!vertebraData) return
    
    toast.info("PDF download feature coming soon!", {
      description: "This will generate a detailed report for your client."
    })
  }

  const handleEmailShare = () => {
    if (!vertebraData) return

    const subject = `Spine Health Information - ${vertebraData.fullName}`
    const body = `
${vertebraData.fullName}

${vertebraData.description}

Nerve Supply:
${vertebraData.nerveSupply.map(n => `• ${n}`).join('\n')}

Associated Organs:
${vertebraData.associatedOrgans.map(o => `• ${o}`).join('\n')}

Common Symptoms:
${vertebraData.commonSymptoms.map(s => `• ${s}`).join('\n')}

---
This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.
    `.trim()

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
    
    toast.success("Opening email client...")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster position="top-center" />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="text-center mb-8 space-y-3">
            <h1 
              className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Interactive Spine Chart
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any vertebra to learn how it affects your body's function and health
            </p>
          </header>

          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  disabled={!selectedVertebra}
                  className="gap-2"
                >
                  <ArrowsClockwise className="w-5 h-5" />
                  Reset View
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear selected vertebra</TooltipContent>
            </Tooltip>

            {selectedVertebra && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleDownloadPDF}
                      className="gap-2"
                    >
                      <DownloadSimple className="w-5 h-5" />
                      Download PDF
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download vertebra information</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleEmailShare}
                      className="gap-2"
                    >
                      <EnvelopeSimple className="w-5 h-5" />
                      Email Client
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share via email</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-card rounded-lg shadow-md p-6 border">
              {hoveredVertebra && !selectedVertebra && (
                <div className="text-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Hovering: <span className="text-accent font-semibold">{hoveredVertebra}</span>
                  </span>
                </div>
              )}
              
              <SpineChart
                view={view}
                selectedVertebra={selectedVertebra ?? null}
                onVertebraClick={handleVertebraClick}
                onVertebraHover={setHoveredVertebra}
              />
            </div>

            {vertebraData && (
              <div>
                <InfoPanel vertebraData={vertebraData} />
              </div>
            )}
          </div>

          <footer className="mt-12 text-center text-sm text-muted-foreground space-y-2 pb-8">
            <p>
              <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            <p className="text-xs">
              Anatomical data compiled from standard chiropractic reference materials. Always consult with a licensed healthcare provider.
            </p>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App