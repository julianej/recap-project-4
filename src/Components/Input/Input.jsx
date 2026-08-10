export default function ColorInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}