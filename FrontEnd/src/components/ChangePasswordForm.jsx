import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Card } from "./ui/Card";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Alert } from "./ui/Alert";

export const ChangePasswordForm = () => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", ok: true, details: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", ok: true, details: [] });

    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match", ok: false, details: [] });
      return;
    }

    setIsSubmitting(true);
    const result = await changePassword({ currentPassword, newPassword });
    if (result.ok) {
      setMessage({ text: "Password changed successfully!", ok: true, details: [] });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setMessage({
        text: result.message || "Change failed",
        ok: false,
        details: result.details || [],
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 flex flex-col gap-6">
      <h2 className="text-h2 text-text">Change Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {message.text && (
          <Alert kind={message.ok ? "ok" : "err"}>
            {message.text}
            {message.details?.length > 0 && (
              <ul className="mt-1 list-disc list-inside">
                {message.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </Alert>
        )}

        <Button type="submit" loading={isSubmitting} className="self-start">
          {isSubmitting ? "Changing..." : "Change password"}
        </Button>
      </form>
    </Card>
  );
};
