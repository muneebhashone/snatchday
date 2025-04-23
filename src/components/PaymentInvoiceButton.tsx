import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentInvoice from "./PaymentInvoice";
import { FileDown, Loader } from "lucide-react";

interface PaymentInvoiceButtonProps {
  paymentDetails: {
    amount: number;
    createdAt: string;
    date: string;
    occurrence: string;
    orderNumber: string;
    status: string;
    updatedAt: string;
    user: {
      email: string;
      name: string;
      _id: string;
    };
    v: number;
    _id: string;
  };
}

const PaymentInvoiceButton: React.FC<PaymentInvoiceButtonProps> = ({
  paymentDetails,
}) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PaymentInvoice paymentDetails={paymentDetails} />}
        fileName={`payment-receipt-${paymentDetails?.orderNumber}.pdf`}
      >
        {({ loading }) => (
          <button className="flex items-center justify-center w-full">
            {loading ? (
              <Loader className="h-4 w-4 text-primary animate-spin" />
            ) : (
              <FileDown className="h-5 w-5 text-foreground" />
            )}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PaymentInvoiceButton;
