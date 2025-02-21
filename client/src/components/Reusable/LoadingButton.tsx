const LoadingButton = ({
  className,
  name,
}: {
  className: string;
  name: string;
}) => {
  return (
    <button
      type="button"
      className={className}
    >
      {name}
    </button>
  );
};

export default LoadingButton;
