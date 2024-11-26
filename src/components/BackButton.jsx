import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function BackButton(props) {
  return (
    <button onClick={props?.onClick}><IoMdArrowRoundBack /></button>
  )
}
