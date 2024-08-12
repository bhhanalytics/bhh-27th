import { Parser } from '@json2csv/plainjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToCSV(data, filename = 'data.csv') {


    try {
        const opts = {};
        const parser = new Parser(opts);
        const csv = parser.parse(data);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error(err);
      }

}
export function exportToExcel(data, filename = 'data.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
}

export function exportToPDF(data, filename = 'data.pdf') {
  const doc = new jsPDF();

  const tableColumn = Object.keys(data[0]); // Extract column names
  const tableRows = data.map(item => Object.values(item));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save(filename);
}
