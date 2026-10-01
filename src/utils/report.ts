import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Problem } from '../data/problems';

export const generateReport = (userName: string, problems: Problem[], solvedProblemIds: Set<string>, attemptedProblemIds: Set<string>, userEmail?: string) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Francis Xavier Engineering College', 14, 18);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('PS Portal Practice - Student Performance Report', 14, 26);
  
  doc.setFontSize(11);
  doc.text(`Student: ${userName}`, 14, 34);
  if (userEmail) {
    doc.text(`Email: ${userEmail}`, 14, 40);
  }
  doc.text(`Total Solved: ${solvedProblemIds.size} / ${problems.length}`, 14, userEmail ? 46 : 40);
  
  const tableData = problems.map(p => {
    let status = 'Unsolved';
    if (solvedProblemIds.has(p.id)) {
      status = 'Solved';
    } else if (attemptedProblemIds.has(p.id)) {
      status = 'Attempted';
    }
    
    return [
      p.title,
      p.difficulty,
      status
    ];
  });
  
  autoTable(doc, {
    startY: userEmail ? 52 : 46,
    head: [['Problem', 'Difficulty', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 }
    }
  });
  
  // Add detailed sections for Solved/Attempted problems
  let yPos = (doc as any).lastAutoTable.finalY + 20;
  
  problems.forEach(p => {
    if (solvedProblemIds.has(p.id) || attemptedProblemIds.has(p.id)) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      const status = solvedProblemIds.has(p.id) ? 'Solved' : 'Attempted';
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${p.title} (${status})`, 14, yPos);
      yPos += 10;
      
      const passedCount = localStorage.getItem(`passed_count_${userName}_${p.id}`) || '0';
      const totalCount = p.testCases.length;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Test Cases Passed: ${passedCount} / ${totalCount}`, 14, yPos);
      yPos += 10;
      
      const code = localStorage.getItem(`code_${userName}_${p.id}`) || 'No code provided';
      
      doc.text('Code:', 14, yPos);
      yPos += 5;
      
      doc.setFont('courier', 'normal');
      doc.setFontSize(9);
      
      const splitCode = doc.splitTextToSize(code, 180);
      
      // Handle page breaks for code
      for (let i = 0; i < splitCode.length; i++) {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(splitCode[i], 14, yPos);
        yPos += 5;
      }
      
      yPos += 15;
      doc.setFont('helvetica', 'normal');
    }
  });
  
  doc.save(`${userName}-coding-report.pdf`);
};
