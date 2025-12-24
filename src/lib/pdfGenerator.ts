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
  const vertebraHeight = 2.5
  const vertebraSpacing = 0.5
  const spineWidth = 18
  
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
  
  doc.setFontSize(6)
  doc.setFont("helvetica", "bold")
  doc.text("Spine", startX + spineWidth / 2, currentY, { align: "center" })
  currentY += 3
  
  allVertebrae.forEach((vertebra) => {
    const isSelected = selectedIds.includes(vertebra.id)
    
    if (isSelected) {
      doc.setFillColor(220, 50, 50)
    } else {
      doc.setFillColor(vertebra.color[0], vertebra.color[1], vertebra.color[2])
    }
    
    doc.roundedRect(startX, currentY, spineWidth, vertebraHeight, 0.5, 0.5, 'F')
    
    doc.setDrawColor(100, 100, 100)
    doc.setLineWidth(0.2)
    doc.roundedRect(startX, currentY, spineWidth, vertebraHeight, 0.5, 0.5)
    
    doc.setFontSize(5)
    doc.setTextColor(255, 255, 255)
    doc.text(vertebra.id, startX + spineWidth / 2, currentY + vertebraHeight / 2 + 0.8, { align: "center" })
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
  const margin = 12
  const contentWidth = pageWidth - (margin * 2)
  let yPos = margin

  doc.setFillColor(255, 220, 100)
  doc.rect(0, 0, pageWidth, 32, "F")

  if (logoUrl) {
    try {
      const logoHeight = 12
      const logoWidth = 24
      const logoX = margin
      const logoY = 8
      doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight)
      
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(40, 40, 40)
      doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos + 3, { align: "center" })
      
      yPos += 10
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    } catch (error) {
      console.error("Error adding logo to PDF:", error)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(40, 40, 40)
      doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos, { align: "center" })
      
      yPos += 7
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    }
  } else {
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos, { align: "center" })
    
    yPos += 7
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
    doc.setTextColor(0, 0, 0)
  }
  
  yPos += 10
  doc.setLineWidth(0.3)
  doc.setDrawColor(180, 150, 80)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 5

  const spineStartY = yPos
  const spineEndY = drawSpineDiagram(doc, vertebraeData.map(v => v.id), pageWidth - margin - 20, spineStartY)

  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  
  const formattedDate = reportDate ? new Date(reportDate).toLocaleDateString() : new Date().toLocaleDateString()
  doc.text(`Date: ${formattedDate}`, margin, yPos)
  yPos += 4
  
  if (clientName) {
    doc.text(`Client: ${clientName}`, margin, yPos)
    yPos += 4
  }
  
  if (clientEmail) {
    doc.text(`Email: ${clientEmail}`, margin, yPos)
    yPos += 4
  }
  
  if (providerName) {
    doc.text(`Provider: ${providerName}`, margin, yPos)
    yPos += 4
  }

  doc.setFont("helvetica", "bold")
  doc.text(`Selected Vertebrae: ${vertebraeData.length}`, margin, yPos)
  yPos += 4
  
  doc.setFont("helvetica", "normal")
  const vertebraeList = vertebraeData.map(v => v.name).join(", ")
  const splitText = doc.splitTextToSize(`Pattern: ${vertebraeList}`, contentWidth - 25)
  doc.text(splitText, margin, yPos)
  yPos = Math.max(yPos + splitText.length * 4 + 5, spineEndY + 3)

  const columnWidth = (contentWidth - 4) / 2
  const leftColumnX = margin
  const rightColumnX = margin + columnWidth + 4
  
  let leftYPos = yPos
  let rightYPos = yPos
  let currentColumn: 'left' | 'right' = 'left'

  for (let i = 0; i < vertebraeData.length; i++) {
    const v = vertebraeData[i]
    const columnX = currentColumn === 'left' ? leftColumnX : rightColumnX
    let columnY = currentColumn === 'left' ? leftYPos : rightYPos

    doc.setFillColor(255, 240, 150)
    doc.rect(columnX, columnY - 2, columnWidth, 6, "F")
    
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text(v.fullName, columnX + 1, columnY + 1.5)
    doc.setTextColor(0, 0, 0)
    columnY += 7

    doc.setFontSize(6)
    doc.setFont("helvetica", "normal")
    const descLines = doc.splitTextToSize(v.description, columnWidth - 2)
    doc.text(descLines, columnX + 1, columnY)
    columnY += descLines.length * 3 + 2

    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text(`Symptoms (${v.name}):`, columnX + 1, columnY)
    doc.setFont("helvetica", "normal")
    columnY += 3
    
    const symptomsText = v.commonSymptoms.join("; ")
    const symptomLines = doc.splitTextToSize(symptomsText, columnWidth - 2)
    doc.text(symptomLines, columnX + 1, columnY)
    columnY += symptomLines.length * 3 + 3
    
    if (currentColumn === 'left') {
      leftYPos = columnY
      currentColumn = 'right'
    } else {
      rightYPos = columnY
      currentColumn = 'left'
    }
  }

  yPos = Math.max(leftYPos, rightYPos) + 2

  if (carePhases && carePhases.length > 0) {
    yPos += 2

    doc.setFillColor(255, 220, 100)
    doc.rect(margin, yPos - 2, contentWidth, 6, "F")
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("YOUR CHIROPRACTIC CARE JOURNEY", pageWidth / 2, yPos + 2, { align: "center" })
    doc.setTextColor(0, 0, 0)
    yPos += 7

    const phaseColumnWidth = (contentWidth - 4) / 2
    let phaseLeftY = yPos
    let phaseRightY = yPos
    let phaseColumn: 'left' | 'right' = 'left'

    carePhases.forEach((phase, index) => {
      const phaseX = phaseColumn === 'left' ? leftColumnX : rightColumnX
      let phaseY = phaseColumn === 'left' ? phaseLeftY : phaseRightY

      doc.setFillColor(255, 245, 200)
      doc.rect(phaseX, phaseY - 1, phaseColumnWidth, 5, "F")
      
      doc.setFontSize(7)
      doc.setFont("helvetica", "bold")
      doc.text(`${index + 1}. ${phase.name}`, phaseX + 1, phaseY + 2)
      phaseY += 6

      doc.setFontSize(6)
      doc.setFont("helvetica", "bold")
      doc.text("Frequency: ", phaseX + 2, phaseY)
      doc.setFont("helvetica", "normal")
      const freqText = doc.splitTextToSize(phase.frequency, phaseColumnWidth - 20)
      doc.text(freqText, phaseX + 18, phaseY)
      phaseY += freqText.length * 3 + 0.5

      doc.setFont("helvetica", "bold")
      doc.text("Duration: ", phaseX + 2, phaseY)
      doc.setFont("helvetica", "normal")
      const durText = doc.splitTextToSize(phase.duration, phaseColumnWidth - 20)
      doc.text(durText, phaseX + 18, phaseY)
      phaseY += durText.length * 3 + 1

      doc.setFontSize(6)
      doc.setFont("helvetica", "italic")
      const descLines = doc.splitTextToSize(phase.description, phaseColumnWidth - 3)
      doc.text(descLines, phaseX + 2, phaseY)
      phaseY += descLines.length * 2.5 + 1

      doc.setFillColor(255, 250, 220)
      const expectLines = doc.splitTextToSize(phase.expectations, phaseColumnWidth - 5)
      const expectHeight = 4 + expectLines.length * 2.5
      doc.rect(phaseX + 1, phaseY, phaseColumnWidth - 2, expectHeight, "F")
      doc.setDrawColor(200, 180, 100)
      doc.setLineWidth(0.1)
      doc.rect(phaseX + 1, phaseY, phaseColumnWidth - 2, expectHeight)
      
      doc.setFontSize(6)
      doc.setFont("helvetica", "bold")
      doc.text("Expect:", phaseX + 2, phaseY + 2.5)
      doc.setFont("helvetica", "normal")
      doc.text(expectLines, phaseX + 2, phaseY + 5)
      phaseY += expectHeight + 2

      if (phaseColumn === 'left') {
        phaseLeftY = phaseY
        phaseColumn = 'right'
      } else {
        phaseRightY = phaseY
        phaseColumn = 'left'
      }
    })

    yPos = Math.max(phaseLeftY, phaseRightY) + 1
    doc.setFillColor(255, 250, 230)
    const boxHeight = 10
    doc.rect(margin, yPos, contentWidth, boxHeight, "F")
    doc.setDrawColor(200, 180, 100)
    doc.setLineWidth(0.15)
    doc.rect(margin, yPos, contentWidth, boxHeight)
    
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text("Important:", margin + 1.5, yPos + 3)
    doc.setFont("helvetica", "normal")
    const importantText = "This care plan is tailored to your specific subluxation pattern and health goals. Consistency is key. We'll reassess your progress regularly."
    const importantLines = doc.splitTextToSize(importantText, contentWidth - 3)
    doc.text(importantLines, margin + 1.5, yPos + 5.5)
    yPos += boxHeight
  }

  doc.setFontSize(5)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(128, 128, 128)
  
  const disclaimerText = "This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment."
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth)
  doc.text(disclaimerLines, pageWidth / 2, pageHeight - 6, { align: "center" })
  
  doc.text("Page 1 of 1", pageWidth / 2, pageHeight - 4, { align: "center" })

  const fileName = `Subluxation_Pattern_${vertebraeData.map(v => v.name).join("_")}_${formattedDate.replace(/\//g, "-")}.pdf`
  doc.save(fileName)
}
