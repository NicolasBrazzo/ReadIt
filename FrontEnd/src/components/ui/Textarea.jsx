import { fieldControlClass } from "./fieldStyles";

export const Textarea = ({ className = "", rows = 3, ...rest }) => {
  return (
    <textarea
      rows={rows}
      className={`${fieldControlClass} resize-y ${className}`}
      {...rest}
    />
  );
};
