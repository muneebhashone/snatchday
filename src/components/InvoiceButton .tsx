import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import { File } from "lucide-react";
const InvoiceButton = ({ orderDetails }: { orderDetails: any }) => {
    console.log(orderDetails, "orderDetails-pdf")
  return (
    <div>
    {/* <PDFViewer width="100%" height="600px">
        <InvoicePDF orderDetails={orderDetails} />
      </PDFViewer> */}

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
