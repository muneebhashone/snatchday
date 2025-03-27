import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 12 },
});

interface InvoiceProps {
  orderDetails: any;
}

const InvoicePDF: React.FC<InvoiceProps> = ({ orderDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice {orderDetails?.orders?.orderNumber}</Text>
          <Text style={styles.text}>
            Customer: {orderDetails?.orders?.billingDetails?.firstName}{" "}
            {orderDetails?.orders?.billingDetails?.lastName}
          </Text>
          <Text style={styles.text}>
            Address: {orderDetails?.orders?.billingDetails?.street},{" "}
            {orderDetails?.orders?.billingDetails?.city},{" "}
            {orderDetails?.orders?.billingDetails?.zip}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Order Summary</Text>
          {orderDetails?.orders?.cartObject?.cart?.map((item: any, index: number) => (
            <Text key={index} style={styles.text}>
              {item?.name} - {item?.price} x {item?.quantity}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Subtotal: {orderDetails?.orders?.cartObject?.subTotal}</Text>
          <Text style={styles.text}>VAT ({orderDetails?.orders?.vat}%): {orderDetails?.orders?.cartObject?.vat}</Text>
          <Text style={styles.text}>Total: {orderDetails?.orders?.cartObject?.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
