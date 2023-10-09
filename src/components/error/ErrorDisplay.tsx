import ErrorModal from "./ErrorModal";
import useErrors from "@/contexts/useErrors";

export default function ErrorDisplay() {
  const { errors, setErrors } = useErrors();

  function closeModal(index: number) {
    const copyOfErrors = [...errors];
    copyOfErrors.splice(index, 1); // Removes the item at the specified index
    setErrors(copyOfErrors);
  }

  return (
    <div>
      {errors.map((error, index) => (
        <ErrorModal
          closeModal={() => closeModal(index)}
          key={index}
          error={error}
        />
      ))}
    </div>
  );
}
