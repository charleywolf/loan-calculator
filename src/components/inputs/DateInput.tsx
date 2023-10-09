import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

interface LoanInputProps {
  title: string;
  id: string;
  selected: Date;
  // eslint-disable-next-line no-unused-vars
  onChange: (newDate: Date) => void;
  infoText?: string;
}

export default function LoanInputDate({
  title,
  id,
  selected,
  onChange,
  infoText,
}: LoanInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {title}
      </label>
      <DatePicker
        id={id}
        selected={selected}
        allowSameDay={false}
        onChange={onChange}
        className="border rounded-md py-2 px-3 w-full outline-none"
      />
      {infoText && <p className="text-sm text-gray-500 mt-1">{infoText}</p>}
    </div>
  );
}
