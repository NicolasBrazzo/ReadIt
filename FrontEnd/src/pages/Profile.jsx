import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { User, Loader2, LogOut } from "lucide-react";

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
            <h1 className="text-3xl md:text-5xl zen-dots text-white">
              <span className="text-primary">My</span> Profile
            </h1>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 border border-white/20 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Personal Data */}
          <section className="border border-white/20 bg-white/3 p-6 flex flex-col gap-6">
            <h2 className="text-xl zen-dots text-white">Personal Data</h2>

            <div className="flex items-center gap-5">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border border-primary"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white/40">
                  <User size={32} />
                </div>
              )}
              <div className="text-sm text-white/60">
                <p>{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="opacity-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Avatar URL</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {profileMsg.text && (
                <p
                  className={
                    profileMsg.ok
                      ? "text-green-400 text-sm"
                      : "text-red-400 text-sm"
                  }
                >
                  {profileMsg.text}
                </p>
              )}

              <button
                type="submit"
                disabled={profileLoading}
                className="self-start flex items-center gap-2 bg-primary text-white px-4 py-2 hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {profileLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </form>
          </section>

          {/* Change Password */}
          <section className="border border-white/20 bg-white/3 p-6 flex flex-col gap-6">
            <h2 className="text-xl zen-dots text-white">Change Password</h2>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                  required
                />
              </div>

              {passwordMsg.text && (
                <div>
                  <p
                    className={
                      passwordMsg.ok
                        ? "text-green-400 text-sm"
                        : "text-red-400 text-sm"
                    }
                  >
                    {passwordMsg.text}
                  </p>
                  {passwordMsg.details?.length > 0 && (
                    <ul className="mt-1 text-red-400 text-xs list-disc list-inside">
                      {passwordMsg.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordLoading}
                className="self-start flex items-center gap-2 bg-primary text-white px-4 py-2 hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Changing...
                  </>
                ) : (
                  "Change password"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};
