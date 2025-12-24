import jsPDF from "jspdf"
import { VertebraData } from "./spineData"

export async function generateSubluxationPDF(vertebraeData: VertebraData[]): Promise<void> {
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
  doc.text("THE-BACK.SPACE", pageWidth / 2, yPos, { align: "center" })
  
  yPos += 15
  doc.setLineWidth(0.5)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  
  const date = new Date().toLocaleDateString()
  doc.text(`Date: ${date}`, margin, yPos)
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
    doc.text("Possible Symptoms When Subluxated:", margin, yPos)
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
