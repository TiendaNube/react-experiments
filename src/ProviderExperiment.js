import React from 'react'
import PropTypes from 'prop-types';
import ContextExperiment from './ContextExperiment';

const ProviderExperiment = ({ experimentsParams, methodParams, children }) => (
  <ContextExperiment.Provider value={{
    experiments: experimentsParams,
    method: methodParams
  }}
  >
    {children}
  </ContextExperiment.Provider>
)

export default ProviderExperiment

ProviderExperiment.propTypes = {
  experimentsParams: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.object
  ]),
  methodParams: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
    PropTypes.object
  ]),
}
