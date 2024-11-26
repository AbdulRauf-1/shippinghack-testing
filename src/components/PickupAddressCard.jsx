import React from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function PickupAddressCard() {
  return (
    <div className="gap-x-4 border border-themePlaceholder border-opacity-20 p-4 rounded-md space-y-2">
      <div className="flex justify-between items-center ">
        <p className="font-semibold text-themeTeal text-xl">Puerto Rico Warehouse</p>
        <div className="flex items-center gap-x-2">
          <MdOutlineModeEdit size={30} />
          <RiDeleteBin6Line size={30} />
        </div>
      </div>
      <p className="font-switzer font-medium text-themePlaceholder text-lg">
        Sigi Tech
      </p>
      <div>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          c/o Torrance, California Will Call
        </p>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          444 Alaska Avenue
        </p>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          Torrance, CA, 90503USA
        </p>
      </div>
      <p className='text-themePlaceholder font-switzer font-medium'>Phone:<span className="text-opacity-60 text-themePlaceholder">(310) 349-1172</span></p>
    </div>
  )
}
