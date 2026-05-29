import './globals.css';
import { LearningLevelProvider } from '@/src/context/LearningLevelContext';
import { RootLayoutClient } from './RootLayoutClient';

export const metadata = {
  title: 'Astronomy DM-DE Portal',
  description: 'Understanding Dark Matter, Dark Energy, and the Structure of the Dark Universe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LearningLevelProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </LearningLevelProvider>
      </body>
    </html>
  );
}
