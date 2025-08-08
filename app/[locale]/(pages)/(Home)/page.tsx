import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      Home Page
      <h1>{t("title")}</h1>
    </div>
  );
}
