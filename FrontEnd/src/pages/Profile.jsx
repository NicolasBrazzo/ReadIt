import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { LogOut } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { Field } from "../components/ui/Field";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

export const Profile = () => {
  const { user, logout, updateUserProfile, changePassword } = useAuth();

  // Dati personali
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [profileMsg, setProfileMsg] = useState({ text: "", ok: true });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState({
    text: "",
    ok: true,
    details: [],
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ text: "", ok: true });

    const result = await updateUserProfile({ name, avatar_url: avatarUrl });
    if (result.ok) {
      setProfileMsg({ text: "Profile updated successfully!", ok: true });
    } else {
      setProfileMsg({ text: result.message || "Update failed", ok: false });
    }
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg({ text: "", ok: true, details: [] });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        text: "New passwords do not match",
        ok: false,
        details: [],
      });
      return;
    }

    setPasswordLoading(true);
    const result = await changePassword({ currentPassword, newPassword });
    if (result.ok) {
      setPasswordMsg({
        text: "Password changed successfully!",
        ok: true,
        details: [],
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordMsg({
        text: result.message || "Change failed",
        ok: false,
        details: result.details || [],
      });
    }
    setPasswordLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-5 md:px-10 my-8 flex flex-col items-center min-h-[80vh]">
        <div className="w-full max-w-3xl flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-h1 text-text">
              <span className="text-accent">My</span> Profile
            </h1>
            <Button variant="secondary" size="sm" icon={LogOut} onClick={() => logout()}>
              Logout
            </Button>
          </div>

          {/* Personal Data */}
          <Card className="p-6 flex flex-col gap-6">
            <h2 className="text-h2 text-text">Personal Data</h2>

            <div className="flex items-center gap-5">
              <Avatar src={avatarUrl} name={name || user?.email} size="lg" />
              <div className="text-[14px] text-text-2">
                <p>{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <Field label="Name" htmlFor="profile-name">
                <Input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  required
                />
              </Field>
              <Field label="Email" htmlFor="profile-email">
                <Input
                  id="profile-email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="opacity-50 cursor-not-allowed"
                />
              </Field>
              <Field label="Avatar URL" htmlFor="profile-avatar">
                <Input
                  id="profile-avatar"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </Field>

              {profileMsg.text && (
                <Alert kind={profileMsg.ok ? "ok" : "err"}>{profileMsg.text}</Alert>
              )}

              <Button type="submit" loading={profileLoading} className="self-start">
                {profileLoading ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </Card>

          {/* Change Password */}
          <Card className="p-6 flex flex-col gap-6">
            <h2 className="text-h2 text-text">Change Password</h2>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <Field label="Current Password" htmlFor="current-password">
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password..."
                  required
                />
              </Field>
              <Field label="New Password" htmlFor="new-password">
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password..."
                  required
                />
              </Field>
              <Field label="Confirm New Password" htmlFor="confirm-password">
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                  required
                />
              </Field>

              {passwordMsg.text && (
                <Alert kind={passwordMsg.ok ? "ok" : "err"}>
                  {passwordMsg.text}
                  {passwordMsg.details?.length > 0 && (
                    <ul className="mt-1 list-disc list-inside">
                      {passwordMsg.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </Alert>
              )}

              <Button type="submit" loading={passwordLoading} className="self-start">
                {passwordLoading ? "Changing..." : "Change password"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};
