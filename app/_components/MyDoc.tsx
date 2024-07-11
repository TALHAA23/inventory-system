import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  flexbox: {
    display: "flex",
    flexDirection: "row",
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.flexbox}>
        <Text>Hello this is me</Text>
        <Text>Hello this is me</Text>
        <Text>Hello this is me</Text>
      </View>
    </Page>
  </Document>
);
export default MyDocument;
