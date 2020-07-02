import React, { useEffect, useContext, useCallback } from 'react'
import ContextExperiment from './ContextExperiment'

export const useExperimentContext = () => {
  const ctx = useContext(ContextExperiment)

  if (process.env.NODE_ENV !== 'production' && !ctx) {
    throw new Error(
      'could not find react-experiment context value; please ensure the component is wrapped in a <Provider>'
    )
  }

  return ctx
}

export const useEmitter = (nameExperiment, variablesToTest) => {
  const ctx = useExperimentContext()
  const execute = useCallback(() => {
    const { experiments, method } = ctx
    if (!experiments || !experiments[nameExperiment]) return false
    return method(nameExperiment, experiments[nameExperiment], variablesToTest);
  }, [variablesToTest])

  return { execute }
}
