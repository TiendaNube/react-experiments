import React from 'react'
import PropTypes from 'prop-types';
import ContextExperiment from './ContextExperiment';

const ProviderExperiment = ({ experimentsParams, methodParams, children }) => {
  return (
    <ContextExperiment.Provider value={{
      experiments: experimentsParams,
      method: methodParams
    }}
    >
      {children}
    </ContextExperiment.Provider>
  )
}

ProviderExperiment.propTypes = {
  experimentsParams: PropTypes.object,
  methodParams: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.object
  ]),
}

export default ProviderExperiment
