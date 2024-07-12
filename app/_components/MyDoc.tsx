import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    border: "2px solid black",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    height: "30px",
    alignItems: "center",
    gap: "2px",
    borderBottom: "1px",
    borderStyle: "solid",
    borderColor: "black",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "20px",
    flexGrow: 1,
  },
  cell: {
    flexGrow: 1,
  },
  img: {
    height: "100%",
    aspectRatio: 1 / 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Image style={styles.img} src="/images/shoe.jpg" />
          <Text style={styles.heading}>Heading</Text>
          <Text style={styles.heading}>Heading</Text>
          <Text style={styles.heading}>Heading</Text>
        </View>
      </View>
    </Page>
  </Document>
);
export default MyDocument;
