import React, { useEffect, useContext, useCallback } from 'react'
import ContextExperiment from './ContextExperiment'

export const useEmitter = (nameExperiment, variablesToTest) => {
  const contextExperiment = useContext(ContextExperiment)
  const execute = useCallback(() => {
    const { experiments, method } = contextExperiment

    console.log('nameExperiment', nameExperiment)
    console.log('experiments[nameExperiment]', experiments[nameExperiment])
    console.log('variablesToTest', variablesToTest)
    return method(nameExperiment, experiments[nameExperiment], variablesToTest);
  }, [])

  return { execute }
}
