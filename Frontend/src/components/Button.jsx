const Button = ({
  children,
  loading,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full
        py-3
        rounded-lg
        font-semibold
        text-white
        transition

        bg-blue-600 hover:bg-blue-700

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;