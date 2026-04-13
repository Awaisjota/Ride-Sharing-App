const Input = ({
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      className={`
        w-full
        px-4
        py-3
        border
        border-gray-300
        rounded-lg
        bg-white
        text-gray-800
        placeholder-gray-400
        outline-none
        transition

        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500

        hover:border-gray-400

        disabled:bg-gray-100
        disabled:cursor-not-allowed

        ${className}
      `}
    />
  );
};

export default Input;