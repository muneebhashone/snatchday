import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import { File } from "lucide-react";
const InvoiceButton = ({ orderDetails }: { orderDetails: any }) => {
  return (
    <div>
    

      {/* Download PDF Button */}
      <PDFDownloadLink
        document={<InvoicePDF orderDetails={orderDetails} />}
        fileName={`invoice-${orderDetails?.orderNumber}.pdf`}
      >
        {({ loading }) => (
          <button className="btn">
            {loading ? "Loading..." : <File className="w-4 h-4" /> } 
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceButton;
