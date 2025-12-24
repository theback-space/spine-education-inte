import jsPDF from "jspdf"
import { VertebraData } from "./spineData"

interface CarePhase {
  id: string
  name: string
  frequency: string
  duration: string
  description: string
  expectations: string
}

export async function generateSubluxationPDF(vertebraeData: VertebraData[], carePhases?: CarePhase[], practiceName?: string, clientName?: string): Promise<void> {
  const doc = new jsPDF()
  
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPos = margin

  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos, { align: "center" })
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
  
  yPos += 15
  doc.setLineWidth(0.5)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  
  const date = new Date().toLocaleDateString()
  doc.text(`Date: ${date}`, margin, yPos)
  if (clientName) {
    doc.text(`Client: ${clientName}`, pageWidth / 2, yPos, { align: "center" })
  }
  doc.text(`Vertebrae Selected: ${vertebraeData.length}`, pageWidth - margin, yPos, { align: "right" })
  yPos += 10

  const vertebraeList = vertebraeData.map(v => v.name).join(", ")
  const splitText = doc.splitTextToSize(`Pattern: ${vertebraeList}`, contentWidth)
  doc.text(splitText, margin, yPos)
  yPos += splitText.length * 5 + 10

  for (let i = 0; i < vertebraeData.length; i++) {
    const v = vertebraeData[i]
    
    if (yPos > pageHeight - 60) {
      doc.addPage()
      yPos = margin
    }

    doc.setFillColor(240, 240, 250)
    doc.rect(margin, yPos - 5, contentWidth, 12, "F")
    
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(v.fullName, margin + 3, yPos + 3)
    yPos += 15

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const descLines = doc.splitTextToSize(v.description, contentWidth)
    doc.text(descLines, margin, yPos)
    yPos += descLines.length * 5 + 8

    doc.setFont("helvetica", "bold")
    doc.text("Nerve Supply:", margin, yPos)
    yPos += 6
    doc.setFont("helvetica", "normal")
    
    v.nerveSupply.forEach(nerve => {
      if (yPos > pageHeight - 20) {
        doc.addPage()
        yPos = margin
      }
      const nerveLines = doc.splitTextToSize(`• ${nerve}`, contentWidth - 5)
      doc.text(nerveLines, margin + 3, yPos)
      yPos += nerveLines.length * 5
    })
    yPos += 5

    if (yPos > pageHeight - 40) {
      doc.addPage()
      yPos = margin
    }

    doc.setFont("helvetica", "bold")
    doc.text("Associated Organs:", margin, yPos)
    yPos += 6
    doc.setFont("helvetica", "normal")
    
    v.associatedOrgans.forEach(organ => {
      if (yPos > pageHeight - 20) {
        doc.addPage()
        yPos = margin
      }
      const organLines = doc.splitTextToSize(`• ${organ}`, contentWidth - 5)
      doc.text(organLines, margin + 3, yPos)
      yPos += organLines.length * 5
    })
    yPos += 5

    if (yPos > pageHeight - 40) {
      doc.addPage()
      yPos = margin
    }

    doc.setFont("helvetica", "bold")
    doc.text(`Possible Symptoms (${v.name}):`, margin, yPos)
    yPos += 6
    doc.setFont("helvetica", "normal")
    
    v.commonSymptoms.forEach(symptom => {
      if (yPos > pageHeight - 20) {
        doc.addPage()
        yPos = margin
      }
      const symptomLines = doc.splitTextToSize(`• ${symptom}`, contentWidth - 5)
      doc.text(symptomLines, margin + 3, yPos)
      yPos += symptomLines.length * 5
    })
    
    yPos += 10
    
    if (i < vertebraeData.length - 1) {
      doc.setLineWidth(0.3)
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 10
    }
  }

  if (carePhases && carePhases.length > 0) {
    doc.addPage()
    yPos = margin

    doc.setFillColor(100, 100, 220)
    doc.rect(margin, yPos - 5, contentWidth, 15, "F")
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("YOUR CHIROPRACTIC CARE JOURNEY", pageWidth / 2, yPos + 5, { align: "center" })
    doc.setTextColor(0, 0, 0)
    yPos += 25

    carePhases.forEach((phase, index) => {
      if (yPos > pageHeight - 60) {
        doc.addPage()
        yPos = margin
      }

      doc.setFillColor(245, 245, 255)
      doc.rect(margin, yPos - 5, contentWidth, 10, "F")
      
      doc.setFontSize(13)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${phase.name}`, margin + 3, yPos + 2)
      yPos += 12

      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Frequency: ", margin + 5, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(phase.frequency, margin + 30, yPos)
      yPos += 6

      doc.setFont("helvetica", "bold")
      doc.text("Duration: ", margin + 5, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(phase.duration, margin + 30, yPos)
      yPos += 8

      doc.setFont("helvetica", "italic")
      const descLines = doc.splitTextToSize(phase.description, contentWidth - 10)
      doc.text(descLines, margin + 5, yPos)
      yPos += descLines.length * 5 + 5

      if (yPos > pageHeight - 50) {
        doc.addPage()
        yPos = margin
      }

      doc.setFillColor(250, 250, 255)
      const expectHeight = 8 + (doc.splitTextToSize(phase.expectations, contentWidth - 10).length * 5)
      doc.rect(margin + 5, yPos, contentWidth - 10, expectHeight, "F")
      doc.setDrawColor(150, 150, 200)
      doc.rect(margin + 5, yPos, contentWidth - 10, expectHeight)
      
      doc.setFont("helvetica", "bold")
      doc.text("What to Expect:", margin + 8, yPos + 5)
      doc.setFont("helvetica", "normal")
      const expectLines = doc.splitTextToSize(phase.expectations, contentWidth - 16)
      doc.text(expectLines, margin + 8, yPos + 10)
      yPos += expectHeight + 10
    })

    if (yPos < pageHeight - 50) {
      yPos += 5
      doc.setFillColor(255, 250, 230)
      const boxHeight = 25
      doc.rect(margin, yPos, contentWidth, boxHeight, "F")
      doc.setDrawColor(200, 180, 100)
      doc.rect(margin, yPos, contentWidth, boxHeight)
      
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.text("Important:", margin + 3, yPos + 6)
      doc.setFont("helvetica", "normal")
      const importantText = "This care plan is tailored to your specific subluxation pattern and overall health goals. Consistency is key to achieving optimal results. We'll reassess your progress regularly and adjust as needed."
      const importantLines = doc.splitTextToSize(importantText, contentWidth - 6)
      doc.text(importantLines, margin + 3, yPos + 12)
    }
  }

  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(128, 128, 128)
    
    const disclaimerText = "This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment."
    const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth)
    doc.text(disclaimerLines, pageWidth / 2, pageHeight - 15, { align: "center" })
    
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" })
  }

  const fileName = `Subluxation_Pattern_${vertebraeData.map(v => v.name).join("_")}_${date.replace(/\//g, "-")}.pdf`
  doc.save(fileName)
}
