import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const { title } = useSettings();
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      {title} © {new Date().getFullYear()} - Tous droits réservés
    </footer>
  );
}
