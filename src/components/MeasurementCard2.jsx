import React from 'react'

export default function MeasurementCard2(props) {
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
          <span className="text-opacity-60 text-themePlaceholder">
            Billable weight
          </span>{" "}
          <span>{props?.billableWeight} lbs</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">
            Subtotal
          </span>{" "}
          <span>{props?.subTotal} $</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">
            Discount
          </span>{" "}
          <span>{props?.discount} %</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Total</span>{" "}
          <span>{props?.total} $</span>
        </p>
      </div>
    </div>
  )
}
