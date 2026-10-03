import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Problem } from '../data/problems';

export interface ReportConfig {
  userId?: string;
  userName: string;
  problems: Problem[];
  solvedProblemIds: Set<string>;
  attemptedProblemIds: Set<string>;
  userEmail?: string;
  rollNumber?: string;
  department?: string;
}

/**
 * Generates an official, publication-quality PDF report for Francis Xavier Engineering College.
 * Supports both options object and positional arguments for backwards compatibility.
 */
export const generateReport = async (
  optionsOrName: ReportConfig | string,
  problemsArg?: Problem[],
  solvedProblemIdsArg?: Set<string>,
  attemptedProblemIdsArg?: Set<string>,
  userEmailArg?: string,
  rollNumberArg?: string,
  departmentArg?: string,
  userIdArg?: string
): Promise<{ success: boolean; fileName: string }> => {
  let config: ReportConfig;

  if (typeof optionsOrName === 'string') {
    config = {
      userName: optionsOrName,
      problems: problemsArg || [],
      solvedProblemIds: solvedProblemIdsArg || new Set(),
      attemptedProblemIds: attemptedProblemIdsArg || new Set(),
      userEmail: userEmailArg,
      rollNumber: rollNumberArg,
      department: departmentArg,
      userId: userIdArg
    };
  } else {
    config = optionsOrName;
  }

  const {
    userName,
    problems,
    solvedProblemIds,
    attemptedProblemIds,
    userEmail,
    rollNumber,
    department,
    userId
  } = config;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39); // neutral-900
  doc.text('FRANCIS XAVIER ENGINEERING COLLEGE', margin, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128); // neutral-500
  doc.text('Autonomous Institution · Tirunelveli, Tamil Nadu · Affiliated to Anna University', margin, 23);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // blue-800
  doc.text('PS Portal Practice · Student Evaluation & Code Report', margin, 31);

  // Hairline divider
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(margin, 35, pageWidth - margin, 35);

  // Student Information Grid
  let curY = 42;
  doc.setFontSize(9.5);
  doc.setTextColor(55, 65, 81); // neutral-700

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.text('Student Name:', margin, curY);
  doc.setFont('helvetica', 'normal');
  doc.text(userName || 'FXEC Student', margin + 30, curY);

  if (rollNumber) {
    curY += 5.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Roll / Reg No:', margin, curY);
    doc.setFont('helvetica', 'normal');
    doc.text(rollNumber, margin + 30, curY);
  }

  if (department) {
    curY += 5.5;
    doc.setFont('helvetica', 'bold');
    doc.text('Department:', margin, curY);
    doc.setFont('helvetica', 'normal');
    doc.text(department, margin + 30, curY);
  }

  // Right Column (Align at margin + 105)
  let rightY = 42;
  if (userEmail) {
    doc.setFont('helvetica', 'bold');
    doc.text('College Email:', margin + 95, rightY);
    doc.setFont('helvetica', 'normal');
    doc.text(userEmail, margin + 125, rightY);
    rightY += 5.5;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Generated on:', margin + 95, rightY);
  doc.setFont('helvetica', 'normal');
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  doc.text(dateStr, margin + 125, rightY);

  curY = Math.max(curY, rightY) + 7;

  // Summary Metrics Banner Box
  const totalCount = problems.length;
  const solvedCount = solvedProblemIds.size;
  const attemptedCount = attemptedProblemIds.size;
  const successRate = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(margin, curY, contentWidth, 14, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);

  const colStep = contentWidth / 4;
  const metrics = [
    { label: 'TOTAL CHALLENGES', value: `${totalCount}` },
    { label: 'SOLVED', value: `${solvedCount}` },
    { label: 'ATTEMPTED', value: `${attemptedCount}` },
    { label: 'COMPLETION RATE', value: `${successRate}%` }
  ];

  metrics.forEach((m, idx) => {
    const x = margin + idx * colStep + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, x, curY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(m.value, x, curY + 11);
  });

  curY += 20;

  // Filter problems to Active (Solved or Attempted)
  const activeProblems = problems.filter(
    p => solvedProblemIds.has(p.id) || attemptedProblemIds.has(p.id)
  );

  // Section 1: Summary Table of Active Challenges
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('1. Evaluated Challenges Summary', margin, curY);

  curY += 3;

  if (activeProblems.length === 0) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(107, 114, 128);
    doc.text('No coding challenges have been solved or attempted yet in this session.', margin, curY + 6);
    curY += 14;
  } else {
    const summaryTableData = activeProblems.map((p, index) => {
      const isSolved = solvedProblemIds.has(p.id);
      const statusText = isSolved ? 'Solved' : 'Attempted';
      
      // Determine passed count
      let passedCount = p.testCases.length.toString();
      if (!isSolved) {
        passedCount = (
          (userId && localStorage.getItem(`passed_count_${userId}_${p.id}`)) ||
          localStorage.getItem(`passed_count_${userName}_${p.id}`) ||
          '0'
        );
      }

      return [
        (index + 1).toString(),
        p.title,
        `Level ${p.level}`,
        p.difficulty,
        `${passedCount} / ${p.testCases.length}`,
        statusText
      ];
    });

    autoTable(doc, {
      startY: curY,
      head: [['#', 'Challenge Title', 'Level', 'Difficulty', 'Test Cases', 'Status']],
      body: summaryTableData,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59], // slate-800
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      bodyStyles: {
        fontSize: 8,
        textColor: [30, 41, 59]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 22, halign: 'center' },
        4: { cellWidth: 24, halign: 'center' },
        5: { cellWidth: 26, halign: 'center' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 5) {
          if (data.cell.raw === 'Solved') {
            data.cell.styles.textColor = [16, 185, 129]; // emerald-600
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [217, 119, 6]; // amber-600
          }
        }
      }
    });

    curY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 12 : curY + 30;
  }

  // Section 2: Detailed Code Submissions
  if (activeProblems.length > 0) {
    if (curY > pageHeight - 45) {
      doc.addPage();
      curY = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text('2. Source Code Submissions & Test Case Results', margin, curY);

    curY += 8;

    activeProblems.forEach((p, idx) => {
      const isSolved = solvedProblemIds.has(p.id);
      const statusText = isSolved ? 'Solved' : 'Attempted';

      // Look up saved code from localStorage across possible key formats
      let submittedCode = '';
      if (userId) {
        submittedCode = (
          localStorage.getItem(`passed_code_${userId}_${p.id}`) ||
          localStorage.getItem(`code_${userId}_${p.id}`) ||
          ''
        );
      }
      if (!submittedCode) {
        submittedCode = (
          localStorage.getItem(`passed_code_${userName}_${p.id}`) ||
          localStorage.getItem(`code_${userName}_${p.id}`) ||
          localStorage.getItem(`code_guest_${p.id}`) ||
          ''
        );
      }
      if (!submittedCode.trim()) {
        submittedCode = p.starterCode || '// No code submitted yet';
      }

      // Passed count
      let passedCount = isSolved 
        ? p.testCases.length.toString()
        : ((userId && localStorage.getItem(`passed_count_${userId}_${p.id}`)) || 
           localStorage.getItem(`passed_count_${userName}_${p.id}`) || '0');

      // Check remaining space on current page
      if (curY > pageHeight - 55) {
        doc.addPage();
        curY = 20;
      }

      // Problem Header Bar
      doc.setFillColor(241, 245, 249); // slate-100
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.roundedRect(margin, curY, contentWidth, 8, 1, 1, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${p.title}`, margin + 3, curY + 5.5);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const metaStr = `Level ${p.level} · ${p.difficulty} · Tests: ${passedCount}/${p.testCases.length} Passed (${statusText})`;
      doc.text(metaStr, pageWidth - margin - 3, curY + 5.5, { align: 'right' });

      curY += 11;

      // Source Code Container
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);

      const splitCode = doc.splitTextToSize(submittedCode, contentWidth - 6);

      // Render lines with pagination guard
      for (let i = 0; i < splitCode.length; i++) {
        if (curY > pageHeight - 18) {
          doc.addPage();
          curY = 20;

          // Continuation banner on new page
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(148, 163, 184);
          doc.text(`(continued) ${p.title} - main.c`, margin, curY);
          curY += 5;
          doc.setFont('courier', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(30, 41, 59);
        }

        doc.text(splitCode[i], margin + 3, curY);
        curY += 4;
      }

      curY += 8;
    });
  }

  // Footer Numbering on all pages
  const totalPages = doc.getNumberOfPages();
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    doc.setPage(pageNum);

    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175); // neutral-400
    doc.text('Francis Xavier Engineering College · PS Portal Practice', margin, pageHeight - 8);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  // Sanitize file name
  const cleanName = (rollNumber || userName || 'FXEC-Student')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `${cleanName}_Code_Report.pdf`;

  // Resilient save with blob fallback
  try {
    doc.save(fileName);
  } catch (saveErr) {
    console.warn('Standard doc.save failed, falling back to Blob anchor:', saveErr);
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  }

  return { success: true, fileName };
};
