type ButtonProps = {
  label: string;
};

export default function Button({ label }: ButtonProps) {
  return (
    <button
      className="bg-red-500 px-4 py-2 rounded-xl"
    >
      {label}
    </button>
  );
}