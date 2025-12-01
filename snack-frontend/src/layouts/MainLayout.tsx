import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const categories = ['Tout', 'Snacks', 'Boissons', 'Chocolats', 'Sodas'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Category categories={categories} />
      <main className="grow p-8">{children}</main>
      <Footer />
    </div>
  );
}
