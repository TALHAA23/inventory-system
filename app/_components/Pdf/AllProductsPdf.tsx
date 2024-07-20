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
  numberCell: {
    width: "5%",
    fontWeight: "bold",
    fontSize: 10,
  },
  heading: {
    width: "13.57%",
    fontWeight: "bold",
    fontSize: 10,
  },
  cell: {
    width: "13.57%",
    fontSize: 10,
  },
  img: {
    width: "13.57%",
    height: "100%",
    objectFit: "contain",
  },
});

// Create Document Component
const AllProductsPdf = ({ data }: { data: any }) => {
  const headers = [
    "#",
    "Image",
    "Name",
    "Category",
    "Original Price",
    "Sale Price",
    "Discount(%)",
    "Stock",
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            {headers.map((head, index) => (
              <Text
                key={index}
                style={index == 0 ? styles.numberCell : styles.heading}
              >
                {head}
              </Text>
            ))}
          </View>
          {Array.isArray(data) &&
            data.map((item, index) => {
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.numberCell}>{index + 1}</Text>
                  <Image style={styles.img} src="/images/shoe.jpg" />
                  <Text style={styles.cell}>{item?.name}</Text>
                  <Text style={styles.cell}>{item?.category}</Text>
                  <Text style={styles.cell}>{item.originalPrice}</Text>
                  <Text style={styles.cell}>{item.salesPrice}</Text>
                  <Text style={styles.cell}>{item.discount}</Text>
                  <Text style={styles.cell}>{item.qty}</Text>
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};
export default AllProductsPdf;
