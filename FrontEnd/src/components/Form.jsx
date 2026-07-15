// inputs = [{name: "name", text: "Name", inputType: "text", placeholder: "Enter Name"}]
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";

export const Form = ({ inputs = [], onChange, state }) => {
  return (
    <div className="flex flex-col w-full gap-4 max-w-[500px]">
      {inputs.map((input, index) => (
        <Field key={index} label={input.text} htmlFor={input.name}>
          <Input
            id={input.name}
            type={input.inputType}
            placeholder={input.placeholder}
            value={state[input.name]}
            onChange={(e) => {
              onChange(input.name, e.currentTarget.value);
            }}
          />
        </Field>
      ))}
    </div>
  );
};
