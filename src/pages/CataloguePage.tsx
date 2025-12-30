import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function CataloguePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/roots_and_rope_catalogue.pdf';
    link.download = 'Roots_and_Rope_Catalogue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="fixed inset-0 top-20 bg-gray-50">
      <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700 min-w-[70px] text-center">
              {pageNumber} / {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700 min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="bg-[#004606] text-white px-4 py-2 rounded-lg hover:bg-[#006609] transition-colors flex items-center gap-2 text-sm ml-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-14 overflow-auto">
        <div className="flex justify-center py-8">
          <Document
            file="/roots_and_rope_catalogue.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-gray-500 text-sm">Loading catalogue...</div>
              </div>
            }
            error={
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-red-500 text-sm">Failed to load PDF</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              loading={
                <div className="flex items-center justify-center h-[600px] bg-white">
                  <div className="text-gray-500 text-sm">Loading page...</div>
                </div>
              }
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
