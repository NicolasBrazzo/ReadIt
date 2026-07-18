import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Alert } from "./ui/Alert";

export const PersonalDataForm = () => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [message, setMessage] = useState({ text: "", ok: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", ok: true });

    const result = await updateUserProfile({ name, avatar_url: avatarUrl });
    if (result.ok) {
      setMessage({ text: "Profile updated successfully!", ok: true });
    } else {
      setMessage({ text: result.message || "Update failed", ok: false });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 flex flex-col gap-6">
      <h2 className="text-h2 text-text">Personal Data</h2>

      <div className="flex items-center gap-5">
        <Avatar src={avatarUrl} name={name || user?.email} size="lg" className="ring-2 ring-accent-soft" />
        <div className="text-[14px] text-text-2">
          <p>{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {message.text && (
          <Alert kind={message.ok ? "ok" : "err"}>{message.text}</Alert>
        )}

        <Button type="submit" loading={isSubmitting} className="self-start">
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Card>
  );
};
