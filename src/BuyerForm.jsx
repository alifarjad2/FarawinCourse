import { useState, useContext } from "react";
import FormInput from "./FormInput";
import { ThemeContext } from "./App";

function BuyerForm({ setPage }) {
  const [theme] = useContext(ThemeContext);

  const [form, setForm] = useState({
    code: "",
    name: "",
    mobile: "",
  });

  return (
    <div className="bg-[#f1f1f1] h-full p-6 py-8">
      <div className="flex">
        <span className="flex-1">آدرس گیرنده</span>
        <button onClick={() => setPage("home")} className="text-[#9E9292]">
          بازگشت
        </button>
      </div>

      <div className="mt-4">
        <FormInput
          value={form.code}
          onInput={(e) => setForm({ ...form, code: e.target.value })}
          label="کد ملی"
          type="number"
          text={
            form.code == ""
              ? "کد ملی اجباری می باشد!"
              : form.code.length != 10
              ? "کد ملی باید ۱۰ رقمی باشد"
              : ""
          }
        />

        <FormInput
          label="نام و نام خانوادگی"
          value={form.name}
          onInput={(e) => setForm({ ...form, name: e.target.value })}
        />
        <FormInput
          label="شماره تماس"
          value={form.mobile}
          type="tel"
          inputClass="text-red-500"
          onInput={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        {/* <FormInput /> */}
        {/* <FormInput /> */}
        <h4>{form.code}</h4>
        <h4>{form.name}</h4>
        <h4>{form.mobile}</h4>
      </div>
    </div>
  );
}
export default BuyerForm;
