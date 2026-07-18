import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { Button } from "../components/ui/Button";
import { PersonalDataForm } from "../components/PersonalDataForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";

export const Profile = () => {
  const { logout } = useAuth();

  return (
    <div className="flex-1 px-5 md:px-10 my-8 flex flex-col items-center min-h-[80vh]">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-h1 text-text">
            <span className="text-accent">My</span> Profile
          </h1>
          <Button variant="secondary" size="sm" icon={LogOut} onClick={() => logout()}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-6">
          <PersonalDataForm />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};
