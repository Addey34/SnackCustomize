import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import { Alert } from '../components/Forms/Alert';
import { FormInput } from '../components/Forms/FormInput';
import { FormWrapper } from '../components/Forms/FormWrapper';
import { useAuth } from '../hooks/useAuth';
import { loginApi } from '../services/authService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const data = await loginApi(email, password);
      login(data.token);
      navigate('/');
    } catch (err) {
      let newErrors = ['Erreur serveur'];
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ msg?: string }>;
        if (axiosErr.response?.data?.msg)
          newErrors = [axiosErr.response.data.msg];
      }
      setErrors(newErrors);
    }
  };

  return (
    <FormWrapper title="Login" onSubmit={handleLogin}>
      <Alert messages={errors} />
      <FormInput placeholder="Email" value={email} onChange={setEmail} />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <Button className="w-full bg-blue-500 hover:bg-blue-600">Login</Button>
    </FormWrapper>
  );
};
