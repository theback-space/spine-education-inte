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

const drawSpineDiagram = (doc: jsPDF, selectedIds: string[], centerX: number, startY: number) => {
  const allVertebrae = [
    { id: 'C1', region: 'Cervical', color: [180, 120, 200], width: 12, height: 3 },
    { id: 'C2', region: 'Cervical', color: [180, 120, 200], width: 13, height: 3 },
    { id: 'C3', region: 'Cervical', color: [180, 120, 200], width: 13.5, height: 3 },
    { id: 'C4', region: 'Cervical', color: [180, 120, 200], width: 14, height: 3 },
    { id: 'C5', region: 'Cervical', color: [180, 120, 200], width: 14.5, height: 3 },
    { id: 'C6', region: 'Cervical', color: [180, 120, 200], width: 15, height: 3 },
    { id: 'C7', region: 'Cervical', color: [180, 120, 200], width: 15.5, height: 3 },
    { id: 'T1', region: 'Thoracic', color: [100, 150, 180], width: 16, height: 3 },
    { id: 'T2', region: 'Thoracic', color: [100, 150, 180], width: 16.5, height: 3 },
    { id: 'T3', region: 'Thoracic', color: [100, 150, 180], width: 17, height: 3 },
    { id: 'T4', region: 'Thoracic', color: [100, 150, 180], width: 17.5, height: 3 },
    { id: 'T5', region: 'Thoracic', color: [100, 150, 180], width: 18, height: 3 },
    { id: 'T6', region: 'Thoracic', color: [100, 150, 180], width: 18.5, height: 3 },
    { id: 'T7', region: 'Thoracic', color: [100, 150, 180], width: 19, height: 3 },
    { id: 'T8', region: 'Thoracic', color: [100, 150, 180], width: 19, height: 3 },
    { id: 'T9', region: 'Thoracic', color: [100, 150, 180], width: 18.5, height: 3 },
    { id: 'T10', region: 'Thoracic', color: [100, 150, 180], width: 18, height: 3 },
    { id: 'T11', region: 'Thoracic', color: [100, 150, 180], width: 17.5, height: 3 },
    { id: 'T12', region: 'Thoracic', color: [100, 150, 180], width: 17, height: 3 },
    { id: 'L1', region: 'Lumbar', color: [120, 180, 100], width: 18, height: 3.5 },
    { id: 'L2', region: 'Lumbar', color: [120, 180, 100], width: 19, height: 3.5 },
    { id: 'L3', region: 'Lumbar', color: [120, 180, 100], width: 20, height: 3.5 },
    { id: 'L4', region: 'Lumbar', color: [120, 180, 100], width: 21, height: 3.5 },
    { id: 'L5', region: 'Lumbar', color: [120, 180, 100], width: 22, height: 3.5 },
    { id: 'SACRUM', region: 'Sacral', color: [220, 160, 80], width: 23, height: 8 },
    { id: 'COCCYX', region: 'Coccygeal', color: [200, 140, 100], width: 10, height: 4 }
  ]
  
  let currentY = startY
  
  doc.setFillColor(245, 240, 230)
  doc.ellipse(centerX, currentY, 8, 6, 'F')
  doc.setDrawColor(100, 100, 100)
  doc.setLineWidth(0.4)
  doc.ellipse(centerX, currentY, 8, 6)
  
  doc.setFillColor(250, 245, 235)
  doc.ellipse(centerX, currentY - 1, 6, 4.5, 'F')
  doc.setLineWidth(0.3)
  doc.ellipse(centerX, currentY - 1, 6, 4.5)
  
  doc.setFontSize(5)
  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "bold")
  doc.text("SKULL", centerX, currentY - 7, { align: "center" })
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  
  currentY += 10
  
  let lastRegion = ''
  
  allVertebrae.forEach((vertebra, index) => {
    const isSelected = selectedIds.includes(vertebra.id)
    
    if (vertebra.region !== lastRegion) {
      doc.setFontSize(5)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(60, 60, 60)
      doc.text(vertebra.region.toUpperCase(), centerX - vertebra.width / 2 - 8, currentY + vertebra.height / 2, { align: "right" })
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "normal")
      lastRegion = vertebra.region
    }
    
    if (isSelected) {
      doc.setFillColor(220, 38, 38)
      doc.setDrawColor(180, 30, 30)
    } else {
      doc.setFillColor(vertebra.color[0], vertebra.color[1], vertebra.color[2])
      doc.setDrawColor(vertebra.color[0] - 40, vertebra.color[1] - 40, vertebra.color[2] - 40)
    }
    
    doc.setLineWidth(0.3)
    
    if (vertebra.id === 'SACRUM') {
      doc.roundedRect(centerX - vertebra.width / 2, currentY, vertebra.width, vertebra.height, 1.5, 1.5, 'FD')
    } else if (vertebra.id === 'COCCYX') {
      doc.ellipse(centerX, currentY + vertebra.height / 2, vertebra.width / 2, vertebra.height / 2, 'FD')
    } else {
      doc.roundedRect(centerX - vertebra.width / 2, currentY, vertebra.width, vertebra.height, 0.8, 0.8, 'FD')
    }
    
    doc.setFontSize(4)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text(vertebra.id, centerX, currentY + vertebra.height / 2 + 0.5, { align: "center" })
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "normal")
    
    currentY += vertebra.height + 0.3
  })
  
  currentY += 2
  
  doc.setFillColor(245, 240, 230)
  doc.ellipse(centerX, currentY + 8, 12, 8, 'F')
  doc.setDrawColor(100, 100, 100)
  doc.setLineWidth(0.4)
  doc.ellipse(centerX, currentY + 8, 12, 8)
  
  doc.setFillColor(250, 245, 235)
  doc.ellipse(centerX - 6, currentY + 10, 4, 5, 'F')
  doc.setLineWidth(0.3)
  doc.ellipse(centerX - 6, currentY + 10, 4, 5)
  doc.ellipse(centerX + 6, currentY + 10, 4, 5, 'F')
  doc.ellipse(centerX + 6, currentY + 10, 4, 5)
  
  doc.setFillColor(245, 240, 230)
  doc.circle(centerX - 6, currentY + 7, 2, 'F')
  doc.setDrawColor(100, 100, 100)
  doc.circle(centerX - 6, currentY + 7, 2)
  doc.circle(centerX + 6, currentY + 7, 2, 'F')
  doc.circle(centerX + 6, currentY + 7, 2)
  
  doc.setFontSize(5)
  doc.setTextColor(80, 80, 80)
  doc.setFont("helvetica", "bold")
  doc.text("PELVIS", centerX, currentY + 19, { align: "center" })
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  
  return currentY + 22
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
  doc.rect(0, 0, pageWidth, 24, "F")

  if (logoUrl) {
    try {
      const logoHeight = 10
      const logoWidth = 20
      const logoX = (pageWidth - logoWidth) / 2
      const logoY = 4
      doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight)
      
      yPos += 12
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(40, 40, 40)
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    } catch (error) {
      console.error("Error adding logo to PDF:", error)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(40, 40, 40)
      doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos + 3, { align: "center" })
      
      yPos += 8
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
      doc.setTextColor(0, 0, 0)
    }
  } else {
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(40, 40, 40)
    doc.text("SUBLUXATION PATTERN REPORT", pageWidth / 2, yPos + 3, { align: "center" })
    
    yPos += 8
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(practiceName || "THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
    doc.setTextColor(0, 0, 0)
  }
  
  yPos += 4
  doc.setLineWidth(0.3)
  doc.setDrawColor(180, 150, 80)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 3

  doc.setFontSize(7)
  doc.setFont("helvetica", "normal")
  
  const formattedDate = reportDate ? new Date(reportDate).toLocaleDateString() : new Date().toLocaleDateString()
  doc.text(`Date: ${formattedDate}`, pageWidth / 2, yPos, { align: "center" })
  yPos += 3
  
  if (clientName) {
    doc.text(`Client: ${clientName}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 3
  }
  
  if (clientEmail) {
    doc.text(`Email: ${clientEmail}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 3
  }
  
  if (providerName) {
    doc.text(`Provider: ${providerName}`, pageWidth / 2, yPos, { align: "center" })
    yPos += 3
  }

  yPos += 2
  const spineStartY = yPos
  const spineEndY = drawSpineDiagram(doc, vertebraeData.map(v => v.id), pageWidth / 2, spineStartY)
  yPos = spineEndY + 3
  
  doc.setFont("helvetica", "bold")
  doc.setFontSize(7)
  const vertebraeList = vertebraeData.map(v => v.name).join(", ")
  doc.text(`Subluxation Pattern: ${vertebraeList}`, pageWidth / 2, yPos, { align: "center" })
  yPos += 5

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
