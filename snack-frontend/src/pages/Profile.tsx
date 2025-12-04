import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { useContext, useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import { FormWrapper } from '../components/Forms/FormWrapper';
import { AuthContext } from '../contexts/AuthContext';
import { getUserApi, updateUserApi } from '../services/userService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  const [editField, setEditField] = useState<keyof User | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [loading, setLoading] = useState(false);

  const placeholders: Record<
    Exclude<keyof User, '_id'>,
    { main: string; confirm: string }
  > = {
    name: {
      main: 'Nouveau nom',
      confirm: 'Confirmez le nom',
    },
    email: {
      main: 'Nouvel e-mail',
      confirm: 'Confirmez l’e-mail',
    },
    role: { main: '', confirm: '' },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserApi('user');
        if (!data) {
          logout();
          return;
        }
        setUser(data);
      } catch {
        setMsg('Impossible de charger le profil ❌');
      }
    };
    fetchUser();
  }, [logout]);

  // Gestion de l'édition des champs
  const handleEdit = (field: Exclude<keyof User, '_id'>) => {
    setEditField(field);
    setTempValue('');
    setConfirmValue('');
  };

  // Annuler l'édition
  const handleCancel = () => {
    setEditField(null);
    setTempValue('');
    setConfirmValue('');
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    if (!user || !editField) return;
    if (tempValue !== confirmValue) {
      setMsg('Les valeurs ne correspondent pas ❌');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await updateUserApi(user._id, editField, tempValue);
      setUser((prevUser) => ({
        ...prevUser!,
        [editField]: updatedUser[editField],
      }));
      setMsg('Profil mis à jour ✅');
    } catch {
      setMsg('Erreur lors de la mise à jour ❌');
    } finally {
      setLoading(false);
      handleCancel();
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  const editableFields: Exclude<keyof User, '_id'>[] = [
    'name',
    'email',
    'role',
  ];

  const fieldLabels: Record<Exclude<keyof User, '_id'>, string> = {
    name: 'Nom',
    email: 'E-mail',
    role: 'Rôle',
  };

  return (
    <FormWrapper title="Mon Profil">
      {msg && (
        <p
          className={`text-center mb-4 font-medium ${
            msg.includes('✅') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {msg}
        </p>
      )}

      <div className="space-y-6">
        {editableFields.map((field) => (
          <div key={field} className="border-b border-gray-200 pb-4 ">
            <p className="text-sm text-gray-500 mb-1">{fieldLabels[field]}</p>

            <div className="flex items-center justify-between">
              {editField === field ? (
                <div className="flex gap-2 w-full">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder={placeholders[field].main}
                    className="border border-gray-300 rounded-lg px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                  />
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={confirmValue}
                    onChange={(e) => setConfirmValue(e.target.value)}
                    placeholder={placeholders[field].confirm}
                    className="border border-gray-300 rounded-lg px-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/2"
                  />
                </div>
              ) : (
                <p className="font-medium text-xl text-gray-800 w-full h-10 flex items-center">
                  {user[field]}
                </p>
              )}

              {field !== 'role' && (
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {editField === field ? (
                    <>
                      <CheckIcon
                        className={`h-6 w-6 cursor-pointer ${
                          tempValue &&
                          confirmValue &&
                          tempValue === confirmValue
                            ? 'text-green-500 hover:text-green-600'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (tempValue && tempValue === confirmValue)
                            handleSave();
                        }}
                      />
                      <XMarkIcon
                        className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-600"
                        onClick={handleCancel}
                      />
                    </>
                  ) : (
                    <PencilIcon
                      className="h-6 w-6 text-gray-400 cursor-pointer hover:text-blue-500"
                      onClick={() => handleEdit(field)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button
          onClick={() => window.location.reload()}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Rafraîchir les infos
        </Button>
      </div>
    </FormWrapper>
  );
};
