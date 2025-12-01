interface FormInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};
