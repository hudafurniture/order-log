import { useFilter } from "../context/FilterContext";

interface CheckboxProps {
  category: string;
  id: string;
}

const Checkbox = ({ category, id }: CheckboxProps) => {
  const { filteredDrivers, setFilteredDrivers } = useFilter();

  const handleCheckedBox = (e: any) => {
    if (filteredDrivers.includes(e.target.value)) {
      setFilteredDrivers(
        filteredDrivers.filter((driver) => driver !== e.target.value)
      );
      return;
    }
    setFilteredDrivers([...filteredDrivers, e.target.value]);
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
