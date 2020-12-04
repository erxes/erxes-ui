import React from 'react';
import { AnimatedLoader } from '../..';
import { IAnimatedLoader } from '../loader';
import Spinner from '../spinner';

let _importComponent: any = () => { };
let _loaderStyle: IAnimatedLoader | undefined = undefined;

class AsyncComponent extends React.Component<any, { component: any }> {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    const { default: component } = _importComponent ? await _importComponent() : { default: undefined };

    this.setState({ component });
  }

  render() {
    const Comp = this.state.component;

    if (Comp) {
      return <Comp {...this.props} />;
    }
    if (_loaderStyle) {
      return <AnimatedLoader loaderStyle={_loaderStyle} />;
    }
    return <Spinner />;
  }
}

export default async function asyncComponent(
  importComponent: any,
  loaderStyle?: IAnimatedLoader
) {
  _importComponent = importComponent;
  _loaderStyle = loaderStyle;

  const ac = await AsyncComponent;
  _importComponent = function () { };
  _loaderStyle = undefined;
  return ac;

}
