import React from 'react'

export default function NoInternet() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-white">
      <div>
        <img
        loading="lazy"
          src="/images/no-internet.webp"
          alt="No Internet"
          className="w-96 h-96 object-contain"
        />
      </div>
      <p className="font-medium text-xl text-center">
        Please check your internet connection!
      </p>
    </section>
  )
}
