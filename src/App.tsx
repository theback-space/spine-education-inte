import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SpineChart } from "@/components/SpineChart"
import { InfoPanel } from "@/components/InfoPanel"
import { CareJourney } from "@/components/CareJourney"
import { getVertebraById } from "@/lib/spineData"
import { generateSubluxationPDF } from "@/lib/pdfGenerator"
import { ArrowsClockwise, DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react"
import { toast } from "sonner"

function App() {
  const [selectedVertebrae, setSelectedVertebrae] = useKV<string[]>("selected-vertebrae", [])
  const [carePhases, setCarePhases] = useKV<any[]>("care-phases", [])
  const [view, setView] = useState<"front" | "side">("front")
  const [hoveredVertebra, setHoveredVertebra] = useState<string | null>(null)

  const vertebraeData = selectedVertebrae?.map(id => getVertebraById(id)).filter((v): v is NonNullable<typeof v> => v !== undefined) ?? []

  const handleVertebraClick = (id: string) => {
    setSelectedVertebrae((current = []) => {
      if (current.includes(id)) {
        return current.filter(v => v !== id)
      } else {
        return [...current, id]
      }
    })
  }

  const handleReset = () => {
    setSelectedVertebrae([])
    toast.success("Selection cleared")
  }

  const handleDownloadPDF = async () => {
    if (vertebraeData.length === 0) return
    
    try {
      toast.loading("Generating PDF report...", { id: "pdf-gen" })
      await generateSubluxationPDF(vertebraeData, carePhases || [])
      toast.success("PDF downloaded successfully!", { id: "pdf-gen" })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast.error("Failed to generate PDF", { id: "pdf-gen" })
    }
  }

  const handleEmailShare = () => {
    if (vertebraeData.length === 0) return

    const vertebraeList = vertebraeData.map(v => v.fullName).join(", ")
    const subject = `Subluxation Pattern Report - ${vertebraeList}`
    
    const body = `
SUBLUXATION PATTERN REPORT

Selected Vertebrae: ${vertebraeList}

${vertebraeData.map(v => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${v.fullName}

${v.description}

Nerve Supply:
${v.nerveSupply.map(n => `• ${n}`).join('\n')}

Associated Organs:
${v.associatedOrgans.map(o => `• ${o}`).join('\n')}

Possible Symptoms When Subluxated:
${v.commonSymptoms.map(s => `• ${s}`).join('\n')}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
              Click vertebrae to select your subluxation pattern for client education
            </p>
            {selectedVertebrae && selectedVertebrae.length > 0 && (
              <p className="text-sm text-accent font-semibold">
                {selectedVertebrae.length} vertebra{selectedVertebrae.length !== 1 ? 'e' : ''} selected
              </p>
            )}
          </header>

          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  disabled={!selectedVertebrae || selectedVertebrae.length === 0}
                  className="gap-2"
                >
                  <ArrowsClockwise className="w-5 h-5" />
                  Clear Selection
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear all selected vertebrae</TooltipContent>
            </Tooltip>

            {selectedVertebrae && selectedVertebrae.length > 0 && (
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
                  <TooltipContent>Download subluxation pattern report</TooltipContent>
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
              {hoveredVertebra && (!selectedVertebrae || selectedVertebrae.length === 0) && (
                <div className="text-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Hovering: <span className="text-accent font-semibold">{hoveredVertebra}</span>
                  </span>
                </div>
              )}
              
              <SpineChart
                view={view}
                selectedVertebrae={selectedVertebrae ?? []}
                onVertebraClick={handleVertebraClick}
                onVertebraHover={setHoveredVertebra}
              />
            </div>

            {vertebraeData && vertebraeData.length > 0 && (
              <div>
                <InfoPanel vertebraeData={vertebraeData} />
              </div>
            )}

            <div>
              <CareJourney />
            </div>
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