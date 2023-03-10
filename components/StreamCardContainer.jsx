import React from 'react'

const StreamCardContainer = ({ children, description }) => {
  return (
    <div className="sm:pt-2 xs:pt-2">
        <h1 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">{description}</h1> 
        <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 space-x-3">
            {children}
        </div>
    </div>
  )
}

export default StreamCardContainer;