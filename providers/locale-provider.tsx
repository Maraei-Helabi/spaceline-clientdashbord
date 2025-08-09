import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const LocaleProvider = async ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export { LocaleProvider };
