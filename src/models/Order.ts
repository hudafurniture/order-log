export type Order = {
    customerName?: string | ""; 
    customerCode?: number;
    orderDate?: Date | ""; 
    docNum?: number | "";
    customerOrder?: string | "";
    total?: number | "";
    agentName?: string | "";
    createdBy?: string | "";
    notes?: string | "";
    city?: string | "";
    driver?: string | "";
    urgency?: string | "";
    hh?: string | "";
    orderSymbol?: string | "";
    productionDate?: Date | "";
    supplyDate?: Date | "";
    coordinateDate?: Date | "";
    review?: string | "";
  };

  const columnMapping: Record<string, keyof Order> = {
    "שם לקוח": "customerName",
    "קוד לקוח": "customerCode",
    "ת.הפקה": "orderDate",
    "מס` מסמך": "docNum",
    "הז.לקוח": "customerOrder",
    'סה"כ': "total",
    "שם סוכן": "agentName",
    'הופק ע"י': "createdBy",
    "הערות": "notes",
    "עיר": "city",
    "מרכיב": "driver",
    "דחיפות ": "urgency",
    'ה"ה': "hh",
    "סימון הזמנה": "orderSymbol",
    "תאריך כניסה ליצור ": "productionDate",
    "תאריך משלוח למחסן ": "supplyDate",
    "תאריך תיאום ": "coordinateDate",
    "חוות דעת /שביעות רצון ": "review",
  };

  export function mapSheetToOrders(excelData: any[]): Order[] {
    return excelData.map(row => ({
      customerName: row[columnMapping["customerName"]],
      customerCode: row[columnMapping["customerCode"]],
      orderDate: new Date(row[columnMapping["orderDate"]]),
      docNum: row[columnMapping["docNum"]],
      customerOrder: row[columnMapping["customerOrder"]],
      total: row[columnMapping["total"]],
      agentName: row[columnMapping["agentName"]],
      createdBy: row[columnMapping["createdBy"]],
      notes: row[columnMapping["notes"]],
      city: row[columnMapping["city"]],
      driver: row[columnMapping["driver"]],
      urgency: row[columnMapping["urgency"]],
      hh: row[columnMapping["hh"]],
      orderSymbol: row[columnMapping["orderSymbol"]],
      productionDate: new Date(row[columnMapping["productionDate"]]),
      supplyDate: new Date(row[columnMapping["supplyDate"]]),
      coordinateDate: new Date(row[columnMapping["coordinateDate"]]),
      review: row[columnMapping["review"]],
    }));
  }