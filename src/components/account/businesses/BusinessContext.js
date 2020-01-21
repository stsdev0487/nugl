import React from 'react'

const BusinessTypeContext = React.createContext({})

export const BusinessTypeProvider = BusinessTypeContext.Provider
export const BusinessTypeConsumer = BusinessTypeContext.Consumer

export default BusinessTypeContext
