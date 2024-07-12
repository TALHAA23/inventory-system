import { Document, Page, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "10px",
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
    width: "25%",
    fontWeight: "bold",
    fontSize: 10,
  },
  cell: {
    width: "25%",
    fontSize: 10,
  },
});

const MonthlyRecordPdf = () => {
  return (
    <Document>
      <Page style={styles.page}></Page>
    </Document>
  );
};

export default MonthlyRecordPdf;
