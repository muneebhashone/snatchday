import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import LOGOURL from "../app/images/logo.png";
import { formatDate } from "date-fns";

const styles = StyleSheet.create({
  // Page-level styling
  page: { 
    padding: 40, 
    fontFamily: 'Helvetica', 
    backgroundColor: '#FFFFFF' 
  },
  
  // Header Styling
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  logo: { 
    width: 150, 
    height: 60 
  },
  invoiceTitle: { 
    fontSize: 22, 
    fontWeight: 'extrabold', 
    color: '#333333' 
  },

  // Section Styling
  section: { 
    marginBottom: 20, 
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 5
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#2C3E50',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    paddingBottom: 5
  },
  detailText: { 
    fontSize: 11, 
    color: '#34495E',
    marginBottom: 5 
  },
  boldLabel: { 
    fontWeight: 'bold', 
    color: '#2980B9' 
  },

  // Table Styling
  table: { 
    width: "100%", 
    marginTop: 20, 
    borderWidth: 1, 
    borderColor: '#95A5A6',
    borderRadius: 5,
    overflow: 'hidden'
  },
  tableHeader: { 
    flexDirection: "row", 
    backgroundColor: '#3498DB', 
    color: 'white',
    padding: 8 
  },
  tableHeaderText: { 
    flex: 1, 
    textAlign: "center", 
    fontWeight: 'bold' ,
    fontSize: 10 

  },
  tableRow: { 
    flexDirection: "row", 
    borderBottomWidth: 1, 
    borderBottomColor: '#BDC3C7', 
    padding: 8 
  },
  tableRowText: { 
    flex: 1, 
    textAlign: "right", 
    fontSize: 10 
  },

  // Totals Styling
  totalsSection: { 
    marginTop: 20, 
    alignSelf: 'flex-end', 
    width: '50%',
    backgroundColor: '#F1F8FF',
    padding: 15,
    borderRadius: 5
  },
  totalText: { 
    fontSize: 12, 
    marginBottom: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  totalLabel: { 
    fontWeight: 'bold', 
    color: '#2C3E50' 
  },
  totalValue: { 
    color: '#2980B9' 
  },
  tableRowImage: {
    width: 30,
    height: 30
  }
});

interface InvoiceProps {
  orderDetails: any;
}

const InvoicePDF: React.FC<InvoiceProps> = ({ orderDetails }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Logo */}
        <View style={styles.header}>
          <Image src={LOGOURL.src} style={styles.logo} />
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>

        {/* Customer & Order Info */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Details</Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Customer Name: </Text>
              {orderDetails?.billingDetails?.firstName} {orderDetails?.billingDetails?.lastName}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Country: </Text>
              {orderDetails?.billingDetails?.country}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Street: </Text>
              {orderDetails?.billingDetails?.street}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Federal State: </Text>
              {orderDetails?.billingDetails?.federalState}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Details</Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Customer Name: </Text>
              {orderDetails?.shippingDetails?.firstName} {orderDetails?.shippingDetails?.lastName}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Country: </Text>
              {orderDetails?.shippingDetails?.country}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Street: </Text>
              {orderDetails?.shippingDetails?.street}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldLabel}>Federal State: </Text>
              {orderDetails?.shippingDetails?.federalState}
            </Text>
          </View>
        </View>

        {/* Order Summary Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Image</Text>
            <Text style={styles.tableHeaderText}>Product Name</Text>
            <Text style={styles.tableHeaderText}>Qty</Text>
            <Text style={styles.tableHeaderText}>Unit Price</Text>
            <Text style={styles.tableHeaderText}>Total Price</Text>
            <Text style={styles.tableHeaderText}>Created</Text>
          </View>
          {orderDetails?.cartObject?.cart?.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
                <Image src={item?.product?.images[0]} style={styles.tableRowImage} />
              <Text style={styles.tableRowText}>{item?.product?.name || "N/A"}</Text>
              <Text style={styles.tableRowText}>{item?.quantity || "N/A"}</Text>
              <Text style={styles.tableRowText}>{item?.unitPrice || "N/A"} €</Text>
              <Text style={styles.tableRowText}>{(item?.totalPrice) || "N/A"} €</Text>
              <Text style={styles.tableRowText}>{formatDate(item?.product?.createdAt || "", "dd/MM/yyyy") || "N/A"}</Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalText}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{orderDetails?.cartObject?.subTotal?.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalText}>
            <Text style={styles.totalLabel}>SnapPoints:</Text>
            <Text style={styles.totalValue}>{orderDetails?.cartObject?.snapPoints?.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalText}>
            <Text style={styles.totalLabel}>DiscountPoints:</Text>
            <Text style={styles.totalValue}>{orderDetails?.cartObject?.discountPoints} €</Text>
          </View>
          <View style={styles.totalText}>
            <Text style={styles.totalLabel}>VAT ({orderDetails?.cartObject?.vat}%):</Text>
            <Text style={styles.totalValue}>{orderDetails?.cartObject?.vat} €</Text>
          </View>
          <View style={[styles.totalText, { borderTopWidth: 1, borderTopColor: '#2980B9', paddingTop: 5 }]}>
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total:</Text>
            <Text style={[styles.totalValue, { fontSize: 14, fontWeight: 'bold' }]}>
              {orderDetails?.cartObject?.total?.toFixed(2)} €
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;