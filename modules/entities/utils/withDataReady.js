import React, { Component } from 'react';
import _ from 'lodash';

const defaultIsDataReady = () => false;

const withDataReady = (isDataReady, dataFetcher) => {
  const finalIsDataReady = isDataReady || defaultIsDataReady;

  return (BaseComponent) =>
    class DataReadyComponent extends Component {
      componentDidMount() {
        if (!finalIsDataReady(this.props) && _.isFunction(dataFetcher)) {
          dataFetcher(this.props);
        }
      }

      render() {
        return (
          <BaseComponent
            {...this.props}
          />
        );
      }
    };
};

export default withDataReady;
