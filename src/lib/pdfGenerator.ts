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

const drawSpineDiagram = (doc: jsPDF, selectedIds: string[], startX: number, startY: number) => {
  const vertebraHeight = 4
  const vertebraSpacing = 1
  const spineWidth = 25
  
  const allVertebrae = [
    { id: 'C1', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C2', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C3', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C4', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C5', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C6', region: 'Cervical', color: [120, 150, 200] },
    { id: 'C7', region: 'Cervical', color: [120, 150, 200] },
    { id: 'T1', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T2', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T3', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T4', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T5', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T6', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T7', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T8', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T9', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T10', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T11', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'T12', region: 'Thoracic', color: [150, 180, 120] },
    { id: 'L1', region: 'Lumbar', color: [200, 150, 100] },
    { id: 'L2', region: 'Lumbar', color: [200, 150, 100] },
    { id: 'L3', region: 'Lumbar', color: [200, 150, 100] },
    { id: 'L4', region: 'Lumbar', color: [200, 150, 100] },
    { id: 'L5', region: 'Lumbar', color: [200, 150, 100] },
    { id: 'SACRUM', region: 'Sacral', color: [180, 120, 150] },
    { id: 'COCCYX', region: 'Coccygeal', color: [160, 100, 130] }
  ]
  
  let currentY = startY
  
  doc.setFontSize(8)
  doc.setFont("helvetica", "bold")
  doc.text("Spine Diagram", startX + spineWidth / 2, currentY, { align: "center" })
  currentY += 5
  
  allVertebrae.forEach((vertebra) => {
    const isSelected = selectedIds.includes(vertebra.id)
    
    if (isSelected) {
      doc.setFillColor(220, 50, 50)
    } else {
      doc.setFillColor(vertebra.color[0], vertebra.color[1], vertebra.color[2])
    }
    
    doc.roundedRect(startX, currentY, spineWidth, vertebraHeight, 1, 1, 'F')
    
    doc.setDrawColor(100, 100, 100)
    doc.setLineWidth(0.3)
    doc.roundedRect(startX, currentY, spineWidth, vertebraHeight, 1, 1)
    
    doc.setFontSize(7)
    doc.setTextColor(255, 255, 255)
    doc.text(vertebra.id, startX + spineWidth / 2, currentY + vertebraHeight / 2 + 1, { align: "center" })
    doc.setTextColor(0, 0, 0)
    
    currentY += vertebraHeight + vertebraSpacing
  })
  
  return currentY
}

export async function generateSubluxationPDF(
  vertebraeData: VertebraData[], 
  carePhases?: CarePhase[], 
  practiceName?: string, 
  clientName?: string,
  clientEmail?: string,
  providerName?: string,
  reportDate?: string,
  logoUrl?: string
): Promise<void> {
  const doc = new jsPDF()
  
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPos = margin

  doc.setFillColor(255, 220, 100)
  doc.rect(0, 0, pageWidth, 50, "F")

  if (logoUrl) {
    try {
      const logoHeight = 20
      const logoWidth = 40
      const logoX = margin
      const logoY = 10
      doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight)
      
      doc.setFontSize(18)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(40, 40, 40)
      doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos + 5, { align: "center" })
      
      yPos += 15
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    } catch (error) {
      console.error("Error adding logo to PDF:", error)
      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(40, 40, 40)
      doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos, { align: "center" })
      
      yPos += 10
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    }
  } else {
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos, { align: "center" })
    
    yPos += 10
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
    doc.setTextColor(0, 0, 0)
  }
  
  yPos += 15
  doc.setLineWidth(0.5)
  doc.setDrawColor(180, 150, 80)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 10

  const spineStartY = yPos
  const spineEndY = drawSpineDiagram(doc, vertebraeData.map(v => v.id), pageWidth - margin - 30, spineStartY)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  
  const formattedDate = reportDate ? new Date(reportDate).toLocaleDateString() : new Date().toLocaleDateString()
  doc.text(`Date: ${formattedDate}`, margin, yPos)
  yPos += 6
  
  if (clientName) {
    doc.text(`Client: ${clientName}`, margin, yPos)
    yPos += 6
  }
  
  if (clientEmail) {
    doc.text(`Email: ${clientEmail}`, margin, yPos)
    yPos += 6
  }
  
  if (providerName) {
    doc.text(`Provider: ${providerName}`, margin, yPos)
    yPos += 6
  }

  doc.setFont("helvetica", "bold")
  doc.text(`Selected Vertebrae: ${vertebraeData.length}`, margin, yPos)
  yPos += 6
  
  doc.setFont("helvetica", "normal")
  const vertebraeList = vertebraeData.map(v => v.name).join(", ")
  const splitText = doc.splitTextToSize(`Pattern: ${vertebraeList}`, contentWidth - 40)
  doc.text(splitText, margin, yPos)
  yPos = Math.max(yPos + splitText.length * 5 + 10, spineEndY + 10)

  for (let i = 0; i < vertebraeData.length; i++) {
    const v = vertebraeData[i]
    
    if (yPos > pageHeight - 60) {
      doc.addPage()
      yPos = margin
    }

    doc.setFillColor(255, 240, 150)
    doc.rect(margin, yPos - 5, contentWidth, 12, "F")
    
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text(v.fullName, margin + 3, yPos + 3)
    doc.setTextColor(0, 0, 0)
    yPos += 15

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const descLines = doc.splitTextToSize(v.description, contentWidth)
    doc.text(descLines, margin, yPos)
    yPos += descLines.length * 5 + 8

    if (yPos > pageHeight - 40) {
      doc.addPage()
      yPos = margin
    }

    doc.setFont("helvetica", "bold")
    doc.text(`Possible/Likely Symptoms (${v.name}):`, margin, yPos)
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

    doc.setFillColor(255, 220, 100)
    doc.rect(margin, yPos - 5, contentWidth, 15, "F")
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("YOUR CHIROPRACTIC CARE JOURNEY", pageWidth / 2, yPos + 5, { align: "center" })
    doc.setTextColor(0, 0, 0)
    yPos += 25

    carePhases.forEach((phase, index) => {
      if (yPos > pageHeight - 60) {
        doc.addPage()
        yPos = margin
      }

      doc.setFillColor(255, 245, 200)
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

      doc.setFillColor(255, 250, 220)
      const expectHeight = 8 + (doc.splitTextToSize(phase.expectations, contentWidth - 10).length * 5)
      doc.rect(margin + 5, yPos, contentWidth - 10, expectHeight, "F")
      doc.setDrawColor(200, 180, 100)
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

  const fileName = `Subluxation_Pattern_${vertebraeData.map(v => v.name).join("_")}_${formattedDate.replace(/\//g, "-")}.pdf`
  doc.save(fileName)
}
