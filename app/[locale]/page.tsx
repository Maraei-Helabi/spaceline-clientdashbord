import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { ModeToggle } from '@/components/ModeToggle';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <ModeToggle/>
      </div>
  );
}

