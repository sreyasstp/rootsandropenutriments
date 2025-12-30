import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function CataloguePage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [pageWidth, setPageWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById('pdf-container');
      if (container) {
        const maxWidth = Math.min(container.clientWidth - 32, 900);
        setPageWidth(maxWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2ecdc] via-[#faf8f0] to-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-[#004606]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-[#004606] text-sm font-semibold uppercase tracking-wide flex items-center gap-2 justify-center">
              <FileText className="w-4 h-4" />
              Product Catalogue
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#004606] mb-4">
            Roots & Rope Catalogue
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our complete range of natural, preservative-free products
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-white border-b border-gray-200 sticky top-20 z-10">
            <div className="flex items-center justify-between px-3 sm:px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-700">
                  {numPages} {numPages === 1 ? 'page' : 'pages'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-xs sm:text-sm text-gray-700 min-w-[40px] sm:min-w-[50px] text-center hidden sm:block">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-[#004606] text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-[#006609] transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
          </div>

          <div
            id="pdf-container"
            className="bg-[#f5f5f5] flex flex-col items-center py-6 sm:py-8 px-4 max-h-[800px] overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#004606 #e5e5e5'
            }}
          >
            <Document
              file="/roots_and_rope_catalogue.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-[500px]">
                  <div className="text-gray-500 text-sm">Loading catalogue...</div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-[500px]">
                  <div className="text-red-500 text-sm">Failed to load PDF</div>
                </div>
              }
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="mb-4 last:mb-0">
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth > 0 ? pageWidth : undefined}
                    scale={window.innerWidth >= 640 ? scale : undefined}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div className="flex items-center justify-center h-[500px] bg-white">
                        <div className="text-gray-500 text-sm">Loading page {index + 1}...</div>
                      </div>
                    }
                    className="shadow-lg"
                  />
                </div>
              ))}
            </Document>
          </div>
        </div>

        <div className="text-center pb-8">
          <p className="text-gray-600 mb-4">
            Want to order from our catalogue?
          </p>
          <a
            href="https://wa.me/917012426181?text=Hi,%20I%20want%20to%20order%20from%20your%20catalogue"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
