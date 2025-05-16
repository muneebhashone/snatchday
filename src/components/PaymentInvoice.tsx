import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import LOGOURL from "../app/images/logo.png";
import { formatCurrency, formatDate } from "@/lib/utils";

const styles = StyleSheet.create({
  // Page-level styling
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  // Header Styling
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  logo: {
    width: 150,
    height: 60,
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: "extrabold",
    color: "#333333",
  },

  // Section Styling
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
    borderBottomWidth: 1,
    borderBottomColor: "#BDC3C7",
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 11,
    color: "#34495E",
    marginBottom: 5,
  },
  boldLabel: {
    fontWeight: "bold",
    color: "#2980B9",
  },

  // Totals Styling
  totalsSection: {
    marginTop: 20,
    alignSelf: "flex-end",
    width: "50%",
    backgroundColor: "#F1F8FF",
    padding: 15,
    borderRadius: 5,
  },
  totalText: {
    fontSize: 12,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  totalValue: {
    color: "#2980B9",
  },
});

interface PaymentInvoiceProps {
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

const PaymentInvoice: React.FC<PaymentInvoiceProps> = ({ paymentDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Logo */}
        <View style={styles.header}>
          <Image src={LOGOURL.src} style={styles.logo} />
          <Text style={styles.invoiceTitle}>PAYMENT RECEIPT</Text>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Order Number: </Text>
            {paymentDetails.orderNumber || "payout_id"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Transaction Type: </Text>
            {paymentDetails.occurance || "withdrawal"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Status: </Text>
            {paymentDetails.status || "completed"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Date: </Text>
            {formatDate(paymentDetails.date) || "2025-04-23T12:12:52.723Z"}
          </Text>
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Name: </Text>
            {paymentDetails.user?.name || "Mr_hamza_123"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>Email: </Text>
            {paymentDetails.user?.email || "hamzadev.hasfone@gmail.com"}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.boldLabel}>User ID: </Text>
            {paymentDetails.user?._id || "lala67f600c82c468632f4fa7e3"}
          </Text>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View
            style={[
              styles.totalText,
              { borderTopWidth: 1, borderTopColor: "#2980B9", paddingTop: 5 },
            ]}
          >
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>
              Total Amount:
            </Text>
            <Text
              style={[
                styles.totalValue,
                { fontSize: 14, fontWeight: "bold", marginLeft: 10 },
              ]}
            >
              {formatCurrency(paymentDetails.amount)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentInvoice;
