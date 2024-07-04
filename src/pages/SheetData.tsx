import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../@/components/ui/button";
import { Table } from "lucide-react";
import { DataTable } from "../components/DataTable";
import { Order } from "../models/Order";
// import { getHeaders } from "../lib/getHeaders";
// import { getValues } from "../lib/getValues";

const SheetData = () => {
  const [data, setData] = useState<Order[]>([]);
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

  // const orderExample: Order = {
  //   customerName: "DEDEEE",
  //   customerCode: 2,
  //   orderDate: new Date(Date.now()),
  //   docNum: 22,
  //   customerOrder: "344/HH",
  //   total: 1130,
  //   agentName: "goku",
  //   createdBy: "tb",
  //   notes: "nothing",
  //   city: "Haifa",
  //   driver: "hamido",
  //   urgency: "urgenttttt",
  //   hh: "550",
  //   orderSymbol: "32GT",
  //   productionDate: new Date(Date.now()),
  //   supplyDate: new Date(Date.now()),
  //   coordinateDate: new Date(Date.now()),
  //   review: "good",
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(FINAL_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("oauth_token")}`,
          },
        });
        // console.log(response.data.values[0]);
        console.log(response.data.values.length);
        //console.table(response.data.values);

        const rows = response.data.values;
        const orders: Order[] = [];

        if (rows.length) {
          rows.slice(1).forEach((row: any[]) => {
            orders.push({
              customerName: row[0] ? row[0] : "",
              customerCode: row[1] ? row[1] : 0,
              orderDate: new Date(row[2]) ? new Date(row[2]) : new Date(),
              docNum: row[3] ? row[3] : 0,
              customerOrder: row[4] ? row[4] : "",
              total: row[5] ? row[5] : 0,
              agentName: row[6] ? row[6] : "",
              createdBy: row[7] ? row[7] : "",
              notes: row[8] ? row[8] : "",
              city: row[9] ? row[9] : "",
              driver: row[10] ? row[10] : "",
              urgency: row[11] ? row[11] : "",
              hh: row[12] ? row[12] : "",
              orderSymbol: row[13] ? row[13] : "",
              productionDate: new Date(row[14])
                ? new Date(row[14])
                : new Date(),
              supplyDate: new Date(row[15]) ? new Date(row[15]) : new Date(),
              coordinateDate: new Date(row[16])
                ? new Date(row[16])
                : new Date(),
              review: row[17],
            });
          });
          setData(orders);
        }

        // const dataRows = rows.slice(1).map((row: any[]) => {
        //   const order: Order = {
        //     customerName: "DEDEEE",
        //     customerCode: 2,
        //     orderDate: new Date(Date.now()),
        //     docNum: 22,
        //     customerOrder: "344/HH",
        //     total: 1130,
        //     agentName: "goku",
        //     createdBy: "tb",
        //     notes: "nothing",
        //     city: "Haifa",
        //     driver: "hamido",
        //     urgency: "urgenttttt",
        //     hh: "550",
        //     orderSymbol: "32GT",
        //     productionDate: new Date(Date.now()),
        //     supplyDate: new Date(Date.now()),
        //     coordinateDate: new Date(Date.now()),
        //     review: "good",
        //   }
        // }

        // const headers = getHeaders(orderExample);
        // console.log(headers);

        // const dataRows = rows.slice(1).map((row: string[]) => {
        //   const rowData: Order = {
        //     customerName: row["שם לקוח"],
        //     customerCode: 2,
        //     orderDate: new Date(Date.now()),
        //     docNum: 22,
        //     customerOrder: "344/HH",
        //     total: 1130,
        //     agentName: "goku",
        //     createdBy: "tb",
        //     notes: "nothing",
        //     city: "Haifa",
        //     driver: "hamido",
        //     urgency: "urgenttttt",
        //     hh: "550",
        //     orderSymbol: "32GT",
        //     productionDate: new Date(Date.now()),
        //     supplyDate: new Date(Date.now()),
        //     coordinateDate: new Date(Date.now()),
        //     review: "good",
        //   };
        // console.log(headers);

        // headers.forEach((header: string, index: number) => {
        // console.log(rowData[headers[index]]);
        // rowData[headers[index]] = row[index];
        // });
        // console.log(rowData);

        // return rowData;
        // });
        // setData(dataRows);
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
      {data && data.length > 0 ? (
        <div>
          <div>HH-2</div>
          <Button>Click meeee</Button>
          <DataTable data={data} />
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
