import React from "react";
import clsx from "clsx";

const TextField = React.forwardRef(
    ({ placeholder, label, className, register, name, error, rows = 3 }, ref) => {
        return (
            <div className="w-full flex flex-col gap-1">
                {label && (
                    <label htmlFor={name} className="text-slate-800">
                        {label}
                    </label>
                )}

                <div>
          <textarea
              name={name}
              placeholder={placeholder}
              ref={ref}
              {...register}
              rows={rows}
              aria-invalid={error ? "true" : "false"}
              className={clsx(
                  "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 resize-none",
                  className
              )}
          />
                </div>
                {error && (
                    <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
                )}
            </div>
        );
    }
);

export default TextField;
