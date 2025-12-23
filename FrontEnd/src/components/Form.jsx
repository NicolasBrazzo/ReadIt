// inputs = [{name: "name", text: "Name", inputType: "text", placeholder: "Enter Name"}]
// onChange =

export const Form = ({ inputs = [], onChange, state }) => {
  return (
    <div className="flex flex-col w-full gap-3 max-w-[500px]">
      {inputs.map((input, index) => {
        const inputName = input.name;
        return (
          <div key={index} className="flex flex-col p-3 w-full gap-3">
            <label htmlFor={input.name} className="text-[18px]">
              {input.text}
            </label>
            <input
              type={input.inputType}
              placeholder={input.placeholder}
              value={state[inputName]} // ✅ CORRETTO - usa le parentesi quadre
              onChange={(e) => {
                onChange(input.name, e.currentTarget.value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
