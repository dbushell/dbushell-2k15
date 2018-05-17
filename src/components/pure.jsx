import React, {PureComponent} from 'react';

const pure = SFComponent => {
  class PureSFComponent extends PureComponent {
    render() {
      return <SFComponent {...this.props} />;
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    PureSFComponent.displayName = `pure(${SFComponent.name})`;
  }
  return PureSFComponent;
};

export default pure;
