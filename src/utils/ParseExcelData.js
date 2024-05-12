import * as XLSX from "xlsx";
const data = {
  patients: null,
  hbs: null,
};
async function loadExcelToJson(fileName) {
  const file = await (await fetch(`./data/${fileName}`)).arrayBuffer();
  const workbook = XLSX.read(file);
  const hbsData = workbook.Sheets[workbook.SheetNames[0]];
  const data  = XLSX.utils.sheet_to_json(hbsData);
  return data;
}

export const fetchData = async () => {
 
  return new Promise(async (resolve, reject) => {
    try {
      const hbsData = await loadExcelToJson("hbs.xlsx");
      const patientsData = await loadExcelToJson("patients.xlsx");
      data.patients= patientsData;
      data.hbs = hbsData;
      resolve(data);
    } catch (error) {
      console.error("Error fetching Excel files:", error);
      reject(error);
    }

   
  });
};