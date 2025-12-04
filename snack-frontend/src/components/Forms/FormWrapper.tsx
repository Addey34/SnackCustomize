interface FormWrapperProps {
  title: string;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const FormWrapper = ({
  title,
  onSubmit,
  children,
}: FormWrapperProps) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 w-full">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        {children}
      </form>
    </div>
  );
};
