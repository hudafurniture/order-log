import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DataTable } from "../components/DataTable";
import { Order } from "../models/Order";
import { useNavigate } from "react-router-dom";

export function isDate(variable: any): boolean {
  return variable instanceof Date;
}

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
  const CACHE_DATA_EXP_TIME = 600000; // 10 Minutes (in milliseconds)

  const getDataFromLocalStorage = () => {
    console.log("Getting cached data");
    const dataStorage = localStorage.getItem("sheetsData");
    if (!dataStorage) return null;

    try {
      const { combinedData, timestamp } = JSON.parse(dataStorage);

      if (Date.now() - timestamp > CACHE_DATA_EXP_TIME) {
        localStorage.removeItem("sheetsData");
        return null;
      }

      if (combinedData && combinedData.length > 0) {
        console.log("Cached data found");
        return combinedData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error parsing JSON data", error);
      return null;
    }
  };

  const fetchDataFromGoogle = async () => {
    const combinedData: Order[] = [];
    const SPREADSHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEETID}`;
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
            rows.slice(1).forEach((row: any[]) => {
              orders.push({
                customerName: row[0] ? row[0] : "",
                customerCode: row[1] ? row[1] : 0,
                orderDate: new Date(row[2]) ? new Date(row[2]) : "",
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
                productionDate: new Date(row[14]) ? new Date(row[14]) : "",
                supplyDate: new Date(row[15]) ? new Date(row[15]) : "",
                coordinateDate: new Date(row[16]) ? new Date(row[16]) : "",
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
      const timestamp = Date.now();
      setData(combinedData);
      localStorage.setItem(
        "sheetsData",
        JSON.stringify({ combinedData, timestamp })
      );
    } catch (error) {
      setError("Error fetching data from Google Sheets");
      console.error(error);
    }
  };

  useEffect(() => {
    const cachedData = getDataFromLocalStorage();
    if (
      cachedData !== null &&
      Array.isArray(cachedData) &&
      cachedData.length > 0
    ) {
      console.log("Data found in cache");
      const ordersArr: Order[] = [];
      cachedData.forEach((cachedOrder) => {
        ordersArr.push({
          customerName: cachedOrder.customerName
            ? cachedOrder.customerName
            : "",
          customerCode: cachedOrder.customerCode ? cachedOrder.customerCode : 0,
          orderDate: isDate(new Date(cachedOrder.orderDate))
            ? new Date(cachedOrder.orderDate)
            : "",
          docNum: cachedOrder.docNum ? cachedOrder.docNum : 0,
          customerOrder: cachedOrder.customerOrder
            ? cachedOrder.customerOrder
            : "",
          total: cachedOrder.total ? cachedOrder.total : 0,
          agentName: cachedOrder.agentName ? cachedOrder.agentName : "",
          createdBy: cachedOrder.createdBy ? cachedOrder.createdBy : "",
          notes: cachedOrder.notes ? cachedOrder.notes : "",
          city: cachedOrder.city ? cachedOrder.city : "",
          driver: cachedOrder.driver ? cachedOrder.driver : "",
          urgency: cachedOrder.urgency ? cachedOrder.urgency : "",
          hh: cachedOrder.hh ? cachedOrder.hh : "",
          orderSymbol: cachedOrder.orderSymbol ? cachedOrder.orderSymbol : "",
          productionDate: isDate(new Date(cachedOrder.productionDate))
            ? new Date(cachedOrder.productionDate)
            : "",
          supplyDate: isDate(new Date(cachedOrder.supplyDate))
            ? new Date(cachedOrder.supplyDate)
            : "",
          coordinateDate: isDate(new Date(cachedOrder.coordinateDate))
            ? new Date(cachedOrder.coordinateDate)
            : "",
          review: cachedOrder.review ? cachedOrder.review : "",
        });
      });
      setData(ordersArr);
    } else {
      console.log("Data not found in cache. Continue fetching from Google");
      fetchDataFromGoogle();
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center mt-3 font-bold text-sm">
        הזמנות פתוחות לפי מחסן
      </h1>
      {data && data.length > 0 ? (
        <div>
          <DataTable data={data} />
        </div>
      ) : (
        <div className="text-center">
          <h1>No data available</h1>
        </div>
      )}
      ;
    </div>
  );
};

export default SheetData;
