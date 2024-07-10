import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../@/components/ui/accordion";
import "./Sidebar.css";
import Checkbox from "../Checkbox";
import { Order } from "../../models/Order";
import { useEffect, useState } from "react";
// import { useFilter } from "../../context/FilterContext";

interface SidebarProps {
  data: Order[];
}

const Sidebar = ({ data }: SidebarProps) => {
  const [uniqueDriversArray, setUniqueDriversArray] = useState<string[]>([]);

  useEffect(() => {
    //drivers
    const drivers = data
      .map((order) => order.driver?.trim())
      .filter((driver) => driver !== "")
      .filter((driver) => driver !== undefined);
    const uniqueDrivers = new Set(drivers);
    const uniqueDriversArr = Array.from(uniqueDrivers);
    const sortedUniqueDriversArr = uniqueDriversArr.sort((a, b) =>
      a.localeCompare(b)
    );
    setUniqueDriversArray(sortedUniqueDriversArr);
  }, []);

  return (
    <div dir="rtl" className="sidebarCotainer text-center">
      <h3 className="underline font-bold font-mono mt-8 pt-6 pb-2 text-stone-500">
        סינון נתונים
      </h3>
      <div className="accordionContainer px-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={"item-1"}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>בחר מרכיב</AccordionTrigger>
            <AccordionContent>
              <div>
                {uniqueDriversArray.map((driver, index) => (
                  <Checkbox category="component" id={driver} key={index} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
