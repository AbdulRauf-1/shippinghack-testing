import React from "react";
import { inputStyle } from "../utilities/Style";
import Select from "react-select";

export default function ProfileComponent(props) {
  return (
    <>
      <p className="font-medium col-span-2 text-lg md:text-xl text-themePlaceholder py-4 border-t">
        {props?.text1}
      </p>
      <div className="col-span-2">
        {props?.show && props?.detail === props?.text1.toLowerCase() ? (
          <div className="py-4 space-y-1 bt-0 border-t">
            <label
              htmlFor={props?.name}
              className="font-light text-lg md:text-xl text-themePlaceholder py-4  text-center"
            >
              {props?.text1}
            </label>
            {props?.options ? (
              <Select
                value={props?.value}
                onChange={props?.onChange}
                options={props?.options}
                placeholder="type"
              />
            ) : (
              <input
                type="text"
                value={props?.value}
                onChange={props?.onChange}
                name={props?.name}
                id={props?.name}
                placeholder={props?.placeholderText}
                className={`${inputStyle}`}
              />
            )}
          </div>
        ) : (
          <p className="font-light text-lg md:text-xl text-themePlaceholder py-4 border-t">
            {props?.text2}
          </p>
        )}
      </div>
      <div className="py-4 text-end  border-t">
        {props?.show && props?.detail === props?.text1.toLowerCase() ? (
          <div className="flex flex-col items-end justify-between h-full">
            <button
              className="text-theme text-lg md:text-xl"
              onClick={() => props?.handleShow(!props?.show)}
            >
              Cancel
            </button>
            <button
              onClick={props?.handleUpdateData}
              className="md:w-20 text-white bg-theme border border-theme hover:text-theme hover:bg-themeText text-lg md:text-xl rounded-md px-2 py-1 mt-12"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className={`text-theme text-xl ${props?.edit ? "block" : "hidden"}`}
            onClick={() => {
              props?.handleShow(!props?.show);
              props?.handleDetail(props?.matchedText.toLowerCase());
            }}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}
