import { useState, useEffect } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SpineChart } from "@/components/SpineChart"
import { InfoPanel } from "@/components/InfoPanel"
import { CareJourney } from "@/components/CareJourney"
import { BrandingSettings } from "@/components/BrandingSettings"
import { PDFPreview } from "@/components/PDFPreview"
import { getVertebraById } from "@/lib/spineData"
import { ArrowsClockwise, Eye, EnvelopeSimple } from "@phosphor-icons/react"
import { toast } from "sonner"

function App() {
  const [selectedVertebrae, setSelectedVertebrae] = useKV<string[]>("selected-vertebrae", [])
  const [carePhases, setCarePhases] = useKV<any[]>("care-phases", [])
  const [practiceName] = useKV<string>("practice-name", "THE-BACK.SPACE")
  const [brandFont] = useKV<string>("brand-font", "Space Grotesk")
  const [clientName, setClientName] = useKV<string>("client-name", "")
  const [clientEmail, setClientEmail] = useKV<string>("client-email", "")
  const [providerName, setProviderName] = useKV<string>("provider-name", "")
  const [reportDate, setReportDate] = useKV<string>("report-date", new Date().toISOString().split('T')[0])
  const [view, setView] = useState<"front" | "side">("front")
  const [hoveredVertebra, setHoveredVertebra] = useState<string | null>(null)
  const [showPDFPreview, setShowPDFPreview] = useState(false)

  useEffect(() => {
    if (brandFont && !document.getElementById(`font-${brandFont.replace(/\s+/g, '-')}`)) {
      const link = document.createElement('link')
      link.id = `font-${brandFont.replace(/\s+/g, '-')}`
      link.href = `https://fonts.googleapis.com/css2?family=${brandFont.replace(/\s+/g, '+')}:wght@400;600;700&display=swap`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }, [brandFont])

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

  const handlePreviewPDF = () => {
    if (vertebraeData.length === 0) return
    setShowPDFPreview(true)
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
        
        
        <PDFPreview
          vertebraeData={vertebraeData}
          carePhases={carePhases || []}
          practiceName={practiceName || "THE-BACK.SPACE"}
          clientName={clientName || ""}
          clientEmail={clientEmail || ""}
          providerName={providerName || ""}
          reportDate={reportDate || new Date().toISOString().split('T')[0]}
          open={showPDFPreview}
          onOpenChange={setShowPDFPreview}
        />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="text-center mb-6 space-y-3">
            <h1 
              className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Interactive Spine Chart
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click vertebrae to select your subluxation pattern for client education
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-3">
                <label htmlFor="client-name" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Client Name:
                </label>
                <Input
                  id="client-name"
                  type="text"
                  placeholder="Enter client name"
                  value={clientName || ""}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-48"
                />
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="client-email" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Client Email:
                </label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="client@example.com"
                  value={clientEmail || ""}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-56"
                />
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="provider-name" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Provider Name:
                </label>
                <Input
                  id="provider-name"
                  type="text"
                  placeholder="Dr. Smith"
                  value={providerName || ""}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-48"
                />
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="report-date" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Report Date:
                </label>
                <Input
                  id="report-date"
                  type="date"
                  value={reportDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-44"
                />
              </div>
            </div>
            
            {selectedVertebrae && selectedVertebrae.length > 0 && (
              <p className="text-sm text-accent font-semibold">
                {selectedVertebrae.length} vertebra{selectedVertebrae.length !== 1 ? 'e' : ''} selected
              </p>
            )}
          </header>

          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <BrandingSettings />
            
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
                      onClick={handlePreviewPDF}
                      className="gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Preview & Download PDF
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Preview report before downloading</TooltipContent>
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

          <div className="flex flex-col gap-10">
            <div className="bg-card rounded-lg shadow-md border flex-shrink-0">
              {hoveredVertebra && (!selectedVertebrae || selectedVertebrae.length === 0) && (
                <div className="text-center py-2">
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
                practiceName={practiceName || "THE-BACK.SPACE"}
                clientName={clientName || ""}
              />
            </div>

            {vertebraeData && vertebraeData.length > 0 && (
              <div className="flex-shrink-0">
                <InfoPanel vertebraeData={vertebraeData} />
              </div>
            )}

            <div className="flex-shrink-0">
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