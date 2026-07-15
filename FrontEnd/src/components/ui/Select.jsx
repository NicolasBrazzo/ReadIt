import { fieldControlClass } from "./fieldStyles";

export const Select = ({ className = "", children, ...rest }) => {
  return (
    <select
      className={`${fieldControlClass} cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
};
