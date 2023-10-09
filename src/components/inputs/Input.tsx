interface LoanInputProps {
  title: string;
  id: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  infoText?: string;
  startingText?: string;
  endingText?: string;
  placeholder: string;
  className?: string;
}

export default function LoanInput({
  title,
  id,
  value,
  onChange,
  startingText,
  endingText,
  infoText,
  className,
  placeholder,
}: LoanInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {title}
      </label>
      <div className="border rounded-md py-2 px-3 w-fit flex focus:outline-none focus:ring focus:border-blue-300">
        {startingText}
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`outline-none w-full ${className}`}
        />
        {endingText}
      </div>
      {infoText && <p className="text-sm text-gray-500 mt-1">{infoText}</p>}
    </div>
  );
}
