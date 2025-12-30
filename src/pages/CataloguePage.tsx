import { Download } from 'lucide-react';

export function CataloguePage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/roots_and_rope_catalogue.pdf';
    link.download = 'Roots_and_Rope_Catalogue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 top-20 bg-white">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleDownload}
          className="bg-[#004606] text-white px-4 py-2 rounded-lg hover:bg-[#006609] transition-colors flex items-center gap-2 text-sm shadow-lg"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      <iframe
        src="/roots_and_rope_catalogue.pdf"
        className="w-full h-full border-0"
        title="Roots & Rope Product Catalogue"
      />
    </div>
  );
}
