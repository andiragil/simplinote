import React from 'react'

export const metadata = {
    title: "Notes"
}

const Notelayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='p-10'>{children}</div>
  )
}

export default Notelayout