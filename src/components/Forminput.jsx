function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />

      {error && (
        <small className="error">{error}</small>
      )}
    </div>
  );
}

export default FormInput;