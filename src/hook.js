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
  console.info(ContextExperiment)
  const execute = useCallback(() => {
    const { experiments, method } = ctx

    console.log('nameExperiment', nameExperiment)
    console.log('experiments[nameExperiment]', experiments[nameExperiment])
    console.log('variablesToTest', variablesToTest)
    return method(nameExperiment, experiments[nameExperiment], variablesToTest);
  }, [])

  return { execute }
}
