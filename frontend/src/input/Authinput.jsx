import React, { useState } from "react"; // إضافة استيراد useState
import { Eye, EyeOff } from "lucide-react";
const Authinput = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="w-full flex justify-between gap-3 text-sm text-purple-900 bg-purple-100 rounded px-4 py-3 mb-4 mt-3 border-slate-200 outline-none">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <Eye size={22} onClick={() => toggleShowPassword()} />
            ) : (
              <EyeOff
                className="text-slate-400"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Authinput;
