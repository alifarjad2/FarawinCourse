function FormInput(props) {
  const { className, inputClass, label, text, ...others } = props;

  return (
    //wraper
    <div className={className}>
      <div className="relative rounded-md border-[#30303A] border-[1px] flex p-4 mt-3">
        <label className="absolute bg-[#f1f1f1] top-[-12px] px-2">
          {label}
        </label>
        <input
          {...others}
          className={
            "w-full bg-transparent h-8 border-none outline-none " + inputClass
          }
        />
      </div>
      <p className="text-[#9E9292] px-4 py-1 "> {text} </p>
    </div>
  );
}
export default FormInput;
