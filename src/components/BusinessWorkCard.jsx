import React from 'react'
export default function BusinessWorkCard(props) {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-y-8  gap-x-32 max-xl:gap-x-16 place-items-center">
      <div className={`flex gap-x-2 ${props?.reverse && 'order-last'} `}>
        <div className="text-themePlaceholder text-opacity-60 border border-themePlaceholder rounded-full px-2.5 h-8 flex items-center justify-center text-lg">
          {props?.count}
        </div>
        <div className="space-y-6">
          <p className="font-helvetica font-bold text-3xl ">{props?.heading}</p>
          <p className="font-switzer text-lg text-themePlaceholder text-opacity-60 leading-tight">
            {props?.desc}
          </p>
          <button className="border border-theme text-theme rounded-md py-2 px-8 font-medium font-switzer ">Learn More</button>
        </div>
      </div>
      <div className="h-72 w-full rounded-md overflow-hidden">
        <img
          loading="lazy"
          src={props?.url}
          alt="purchase your membership"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}