import { AppHeader } from "@/components/app-header";
import { ErrorSection } from "@/components/ErrorSection";
import { PagesNavigation } from "@/components/pages-navigation";

const NotFoundPage = () => {
  return (
    <>
      <AppHeader />
      <div className="min-h-[80vh] flex items-start md:items-center justify-center">
        <ErrorSection isNotFound className="max-w-[500px] mx-auto" />
      </div>
      <PagesNavigation />
    </>
  );
};

export default NotFoundPage;
