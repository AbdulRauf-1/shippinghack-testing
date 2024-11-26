import React from "react";

export default function MeasurementCard(props) {
  return (
    <div
      className={`p-2 border ${
        props?.borderColor ? props?.borderColor : "border-borderColor"
      } ${
        props?.borderOpacity ? props?.borderOpacity : "border-opacity-100"
      } rounded-md`}
    >
      <div className="space-y-1 font-switzer text-themePlaceholder [&>p]:flex [&>p]:justify-between">
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Width</span>{" "}
          <span>{props?.width} inch</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Length</span>{" "}
          <span>{props?.length} inch</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Height</span>{" "}
          <span>{props?.height} inch</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Weight</span>{" "}
          <span>{props?.weight} lbs</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">
            Category
          </span>{" "}
          <span>{props?.category}</span>
        </p>
      </div>
    </div>
  );
}
