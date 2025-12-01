import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import { Alert } from '../components/Forms/Alert';
import { FormInput } from '../components/Forms/FormInput';
import { FormWrapper } from '../components/Forms/FormWrapper';
import { registerApi } from '../services/authService';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  // const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors(['Les mots de passe ne correspondent pas']);
      return;
    }

    try {
      await registerApi(name, email, password);
      // setIsVerificationSent(true);
      navigate('/login');
    } catch (err) {
      let newErrors = ['Erreur serveur'];
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{
          errors?: { message: string }[];
          msg?: string;
        }>;
        if (axiosErr.response?.data?.errors)
          newErrors = axiosErr.response.data.errors.map((e) => e.message);
        else if (axiosErr.response?.data?.msg)
          newErrors = [axiosErr.response.data.msg];
      }
      setErrors(newErrors);
    }
  };

  return (
    <FormWrapper title="Register" onSubmit={handleRegister}>
      {/* {isVerificationSent && (
        <Alert
          messages={['Un lien de vérification a été envoyé à votre email']}
          type="success"
        />
      )} */}
      <Alert messages={errors} />
      <FormInput placeholder="Name" value={name} onChange={setName} />
      <FormInput placeholder="Email" value={email} onChange={setEmail} />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <FormInput
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <Button className="w-full bg-green-500 hover:bg-green-600">
        Register
      </Button>
    </FormWrapper>
  );
};
