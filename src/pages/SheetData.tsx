import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../@/components/ui/button";
import { Table } from "lucide-react";
import { DataTable } from "../components/DataTable";

const SheetData = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const SPREADSHEETID = import.meta.env.VITE_SPREADSHEET_ID as string;
  const SHEET_NAME = "MH-מהדי";
  let range = `${SHEET_NAME}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`;
  const FINAL_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${range}`;
  const FINAL_URL_TEST = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/Sheet2?key=${
    import.meta.env.VITE_API_KEY as string
  }`;

  // useEffect(() => {
  //   const func = async () => {
  //     try {
  //       const response = await fetch(FINAL_URL, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       console.log(data);

  //       return data.values || [];
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       return [];
  //     }
  //   };
  //   func();
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FINAL_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("oauth_token")}`,
          },
        });
        console.log(response.data.values[0]);
        console.log(response.data.values.length);
        //console.table(response.data.values);

        const rows = response.data.values;
        if (rows.length) {
          const headers = rows[0];
          const dataRows = rows.slice(1).map((row: string[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index];
            });
            return rowData;
          });
          setData(dataRows);
        }
      } catch (error) {
        setError("Error fetching data from Google Sheets");
      }
    };

    fetchData();
  }, [range]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Google Sheets Data</h1>
      {data.length > 0 ? (
        <div>
          <div>HH</div>
          <Button>Click meeee</Button>
          <DataTable />
        </div>
      ) : (
        //   <table>
        //     <thead>
        //       <tr>
        //         {Object.keys(data[0]).map((key) => (
        //           <th key={key}>{key}</th>
        //         ))}
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {data.map((row, index) => (
        //         <tr key={index}>
        //           {Object.values(row).map((value, idx) => (
        //             <td key={idx}>{value}</td>
        //           ))}
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        <p>No data available</p>
      )}
    </div>
  );
};

export default SheetData;
