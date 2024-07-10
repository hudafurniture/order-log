import { useFilter } from "../context/FilterContext";

interface CheckboxProps {
  category: string;
  id: string;
}

const Checkbox = ({ category, id }: CheckboxProps) => {
  const zkryaArr = ["אבו זכריה", "אבו בקריא", "אבו זקריא", "אבו זקריה"];
  const { filteredDrivers, setFilteredDrivers } = useFilter();

  const handleCheckedBox = (e: any) => {
    const targetDriver = e.target.value;

    if (filteredDrivers.includes(targetDriver)) {
      if (targetDriver === "אבו זכריא") {
        setFilteredDrivers(
          filteredDrivers.filter(
            (driver) => !zkryaArr.includes(driver) && driver !== targetDriver
          )
        );
      } else {
        setFilteredDrivers(
          filteredDrivers.filter((driver) => driver !== targetDriver)
        );
      }
      return;
    }

    if (targetDriver === "אבו זכריא") {
      setFilteredDrivers([...filteredDrivers, ...zkryaArr, targetDriver]);
    } else {
      setFilteredDrivers([...filteredDrivers, targetDriver]);
    }
  };

  return (
    <div dir="rtl" className="flex mr-2">
      <input
        type="checkbox"
        id={category + id}
        name={category + id}
        value={id}
        className="float-right text-lg w-5 h-5 mb-2"
        onChange={(e) => handleCheckedBox(e)}
        checked={filteredDrivers?.includes(id) ? true : false}
      />
      <label htmlFor={category + id} className="mx-2 float-right">
        {id}
      </label>
    </div>
  );
};

export default Checkbox;
