import Footer from '../components/Footer';
import Header from '../components/Header';

interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="grow flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
