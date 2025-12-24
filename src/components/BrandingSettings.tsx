import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Palette } from "@phosphor-icons/react"
import { toast } from "sonner"

export function BrandingSettings() {
  const [practiceName, setPracticeName] = useKV<string>("practice-name", "THE-BACK.SPACE")
  const [isOpen, setIsOpen] = useState(false)
  const [tempName, setTempName] = useState(practiceName || "THE-BACK.SPACE")

  const handleSave = () => {
    setPracticeName(tempName)
    setIsOpen(false)
    toast.success("Branding updated successfully")
  }

  const handleCancel = () => {
    setTempName(practiceName || "THE-BACK.SPACE")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Palette className="w-5 h-5" />
          Customize Branding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>Customize Branding</DialogTitle>
          <DialogDescription>
            Personalize the spine chart with your practice information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="practice-name">Practice Name</Label>
            <Input
              id="practice-name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your practice name"
              className="font-semibold"
            />
            <p className="text-xs text-muted-foreground">
              This name will appear on the spine chart and exported PDFs
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
