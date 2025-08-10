import { CompanyProfile } from "./CompanyProfile";
import { PersonalProfile } from "./PersonalProfile";

export default async function ProfilePage() {
  return (
    <div className="flex flex-col items-center gap-6 mx-auto mt-8 p-6 rounded-lg border text-card-foreground shadow-sm">
      {true ? <PersonalProfile /> : <CompanyProfile />}
    </div>
  );
}
