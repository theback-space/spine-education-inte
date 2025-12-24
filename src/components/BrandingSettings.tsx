import { useState, useRef, useEffect } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Upload, X } from "@phosphor-icons/react"
import { toast } from "sonner"

const FONT_OPTIONS = [
  { value: "Space Grotesk", label: "Space Grotesk (Default)" },
  { value: "IBM Plex Sans", label: "IBM Plex Sans" },
  { value: "Playfair Display", label: "Playfair Display" },
  { value: "Crimson Pro", label: "Crimson Pro" },
  { value: "JetBrains Mono", label: "JetBrains Mono" },
  { value: "Fira Code", label: "Fira Code" },
  { value: "Bricolage Grotesque", label: "Bricolage Grotesque" },
  { value: "Newsreader", label: "Newsreader" },
  { value: "Source Sans 3", label: "Source Sans 3" },
]

export function BrandingSettings() {
  const [practiceName, setPracticeName] = useKV<string>("practice-name", "THE-BACK.SPACE")
  const [brandFont, setBrandFont] = useKV<string>("brand-font", "Space Grotesk")
  const [logoUrl, setLogoUrl] = useKV<string>("logo-url", "")
  
  const [isOpen, setIsOpen] = useState(false)
  const [tempName, setTempName] = useState(practiceName || "THE-BACK.SPACE")
  const [tempFont, setTempFont] = useState(brandFont || "Space Grotesk")
  const [tempLogo, setTempLogo] = useState(logoUrl || "")
  const [logoPreview, setLogoPreview] = useState(logoUrl || "")
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTempName(practiceName || "THE-BACK.SPACE")
      setTempFont(brandFont || "Space Grotesk")
      setTempLogo(logoUrl || "")
      setLogoPreview(logoUrl || "")
    }
  }, [isOpen, practiceName, brandFont, logoUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setTempLogo(dataUrl)
      setLogoPreview(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setTempLogo("")
    setLogoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSave = () => {
    setPracticeName(tempName)
    setBrandFont(tempFont)
    setLogoUrl(tempLogo)
    setIsOpen(false)
    toast.success("Branding updated successfully")
  }

  const handleCancel = () => {
    setTempName(practiceName || "THE-BACK.SPACE")
    setTempFont(brandFont || "Space Grotesk")
    setTempLogo(logoUrl || "")
    setLogoPreview(logoUrl || "")
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
        <div className="space-y-5 py-4">
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

          <div className="space-y-2">
            <Label htmlFor="brand-font">Branding Font</Label>
            <Select value={tempFont} onValueChange={setTempFont}>
              <SelectTrigger id="brand-font">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Font used for your practice name on the chart
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo-upload">Logo Image</Label>
            {logoPreview ? (
              <div className="relative w-full h-32 bg-muted rounded-md border flex items-center justify-center overflow-hidden">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="max-h-full max-w-full object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveLogo}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                className="w-full h-32 border-2 border-dashed border-input rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload logo</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-muted-foreground">
              Upload your practice logo (PNG, JPG, or SVG, max 5MB)
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
