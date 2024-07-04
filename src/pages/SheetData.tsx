import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DataTable } from "../components/DataTable";
import { Order } from "../models/Order";
import { useNavigate } from "react-router-dom";

const SheetData = () => {
  const [data, setData] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const SPREADSHEETID = import.meta.env.VITE_SPREADSHEET_ID as string;

  useEffect(() => {
    const combinedData: Order[] = [];

    const SPREADSHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(SPREADSHEET_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("oauth_token")}`,
          },
        });
        const allSheets = response.data.sheets;
        const filtedSheets = allSheets.filter(
          (sheet: any) =>
            !sheet.properties.title.toLowerCase().includes("search") &&
            !sheet.properties.title.toLowerCase().includes("חנויות")
        );

        for (const sheet of filtedSheets) {
          const SHEET_NAME = sheet.properties.title;
          // console.log(SHEET_NAME);
          let range = `${SHEET_NAME}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`;
          const FINAL_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}/values/${range}`;
          try {
            const response = await axios.get(FINAL_URL, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("oauth_token")}`,
              },
            });
            // console.log(response.data.values.length);
            const rows = response.data.values;
            const orders: Order[] = [];

            if (rows.length) {
              rows.slice(1).forEach((row: any[], index: number) => {
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
                  supplyDate: new Date(row[15])
                    ? new Date(row[15])
                    : new Date(),
                  coordinateDate: new Date(row[16])
                    ? new Date(row[16])
                    : new Date(),
                  review: row[17],
                });
              });
            }
            combinedData.push(...orders);
          } catch (error) {
            setError("Error fetching data from sheet" + SHEET_NAME);
            console.error(error);
          }
        }
        setData(combinedData);
      } catch (error) {
        setError("Error fetching data from Google Sheets");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Google Sheets Data</h1>
      {data && data.length > 0 ? (
        <div>
          <DataTable data={data} />
        </div>
      ) : (
        <div>
          <h1>No data available</h1>
        </div>
      )}
      ;
    </div>
  );
};

export default SheetData;
