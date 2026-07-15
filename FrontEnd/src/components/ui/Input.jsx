import { fieldControlClass } from "./fieldStyles";

export const Input = ({ className = "", ...rest }) => {
  return <input className={`${fieldControlClass} ${className}`} {...rest} />;
};
