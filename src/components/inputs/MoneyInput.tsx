interface LoanInputProps {
  title: string;
  id: string;
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  infoText?: string;
}

export default function LoaninputMoney({
  title,
  id,
  value,
  onChange,
  placeholder,
  infoText,
}: LoanInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {title}
      </label>

      <div className="border rounded-md py-2 px-3 w-fit focus:outline-none focus:ring focus:border-blue-300">
        $
        <input
          type="text"
          id={id}
          className="outline-none w-fit"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      {infoText && <p className="text-sm text-gray-500 mt-1">{infoText}</p>}
    </div>
  );
}
