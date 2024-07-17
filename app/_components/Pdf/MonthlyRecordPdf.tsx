import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "20px",
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

interface Data {
  month: string;
  data: { income: number; revenue: number; sales: number };
}

const MonthlyRecordPdf = ({ data }: { data: Data[][] }) => {
  return (
    <Document>
      <Page style={styles.page}></Page>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.heading}>Month</Text>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.heading}>Income</Text>
          <Text style={styles.heading}>Sales</Text>
        </View>
        {data.map((year) =>
          year.map((month) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{month?.month}</Text>
              <Text style={styles.cell}>
                {month?.data?.revenue?.toFixed(2) || "Nil"}
              </Text>
              <Text style={styles.cell}>
                {month?.data?.income?.toFixed(2) || "Nil"}
              </Text>
              <Text style={styles.cell}>
                {month?.data?.sales?.toFixed(2) || "Nil"}
              </Text>
            </View>
          ))
        )}
      </View>
    </Document>
  );
};

export default MonthlyRecordPdf;
