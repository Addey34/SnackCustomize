import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../components/Forms/FormInput';
import { FormWrapper } from '../components/Forms/FormWrapper';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';

export const AdminPage = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const { title, logo, colorTheme, updateSettings } = useSettings();

  // Initialisez tous les champs avec les valeurs actuelles
  const [newSettings, setNewSettings] = useState({
    title,
    logo,
    colorTheme,
  });

  const [loading, setLoading] = useState(false);

  if (role !== 'admin') {
    navigate('/');
    return null;
  }

  // Gérer la modification de l'un des champs
  const handleChange = (field: string, value: string) => {
    setNewSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value, // Met à jour uniquement le champ modifié
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Passer l'objet complet au backend
      await updateSettings(newSettings);
      alert('Paramètres mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres :', error);
      alert('Échec de la mise à jour des paramètres.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Admin Dashboard" onSubmit={handleSubmit}>
      <div className="font-bold pb-2">Title</div>
      <FormInput
        type="text"
        placeholder="Nouveau nom du site"
        value={newSettings.title}
        onChange={(value: string) => handleChange('title', value)}
      />
      <div className="font-bold pb-2">Logo</div>
      <FormInput
        type="text"
        placeholder="Nouvel URL du logo"
        value={newSettings.logo}
        onChange={(value: string) => handleChange('logo', value)}
      />
      <div className="font-bold pb-2">Color Theme</div>
      <FormInput
        type="text"
        placeholder="Nouveau thème (light/dark)"
        value={newSettings.colorTheme}
        onChange={(value: string) => handleChange('colorTheme', value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        disabled={
          loading ||
          !newSettings.title ||
          !newSettings.logo ||
          !newSettings.colorTheme
        }
      >
        {loading ? 'Mise à jour...' : 'Mettre à jour'}
      </button>
    </FormWrapper>
  );
};;
