interface AlertProps {
  messages: string[];
  type?: 'error' | 'success';
}

export const Alert = ({ messages, type = 'error' }: AlertProps) => {
  if (!messages.length) return null;

  const color = type === 'error' ? 'text-red-500' : 'text-green-500';

  return (
    <div className="mb-4">
      {messages.map((msg, i) => (
        <p key={i} className={`${color} text-center font-medium`}>
          {msg}
        </p>
      ))}
    </div>
  );
};
