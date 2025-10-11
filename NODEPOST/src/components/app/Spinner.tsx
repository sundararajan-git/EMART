import { FaSpinner } from "react-icons/fa";

type SpinnerPropsType = {
  isLoadingText: boolean;
};

const Spinner: React.FC<SpinnerPropsType> = (props) => {
  const { isLoadingText } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <FaSpinner className="animate-spin text-primary size-6 transition-transform duration-300 ease-in-out" />
      {isLoadingText && <span className="text-sm">Loading...</span>}
    </div>
  );
};
export default Spinner;
