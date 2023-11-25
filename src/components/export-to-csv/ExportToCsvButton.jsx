import Papa from "papaparse";
import styles from "./csv-button.module.scss";

export default function ExportToCsvButton({ collectionData }) {
  const handleExportToCSV = () => {
    if (!collectionData || collectionData.length === 0) {
      alert("No data to export");
      return;
    }

    const csvData = [];
    collectionData.forEach((collection) => {
      collection.item.forEach((item) => {
        csvData.push({
          id: item.id,
          name: item.name,
          topic: item.topic,
          description: item.desc,
          tags: item.tags,
          likes: item.likes.length,
          comments: item.comments.length,
          int1name: item.int1name,
          int1value: item.int1value,
          int2name: item.int2name,
          int2value: item.int2value,
          int3name: item.int3name,
          int3value: item.int3value,
          string1name: item.string1name,
          string1value: item.string1value,
          string2name: item.string2name,
          string2value: item.string2value,
          string3name: item.string3name,
          string3value: item.string3value,
          multiline1name: item.multiline1name,
          multiline1value: item.multiline1value,
          multiline2name: item.multiline2name,
          multiline2value: item.multiline2value,
          multiline3name: item.multiline3name,
          multiline3value: item.multiline3value,
          boolean1name: item.boolean1name,
          boolean1value: item.boolean1value,
          boolean2name: item.boolean2name,
          boolean2value: item.boolean2value,
          boolean3name: item.boolean3name,
          boolean3value: item.boolean3value,
          date1name: item.date1name,
          date1value: item.date1value,
          date2name: item.date2name,
          date2value: item.date2value,
          date3name: item.date3name,
          date3value: item.date3value,
        });
      });
    });

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    collectionData.forEach((coll) => {
      if (!coll.item || coll.item.length === 0) {
        alert("No data to export");
        return;
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "exported_data.csv");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  };
  return (
    <button className={styles.csvButton} onClick={handleExportToCSV}>
      Export to CSV
    </button>
  );
}
