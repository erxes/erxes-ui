import React from 'react';
import { AnimatedLoader } from '../..';
import { IAnimatedLoader } from '../loader';
import Spinner from '../spinner';

let _importComponent: any = () => { };
let _loaderStyle: IAnimatedLoader | undefined = undefined;

class AsyncComponent extends React.Component<any, { component: any }> {
  constructor(props) {
    super(props);
    // console.log('constructtttttttttttttr')

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    // console.log('compdidmounttttttttttt', _importComponent)
    const { default: component } = _importComponent ? await _importComponent() : { default: undefined };
    // console.log(component)

    this.setState({ component });
  }

  render() {
    const Comp = this.state.component;
    // console.log('rrrrrrrrrrrrrrrrrrrender', Comp)

    if (Comp) {
      return <Comp {...this.props} />;
    }
    // console.log('rrrrrrrr222222', _loaderStyle)
    if (_loaderStyle) {
      return <AnimatedLoader loaderStyle={_loaderStyle} />;
    }
    // console.log('spppppppppppp')
    return <Spinner />;
  }
}

export default function asyncComponent(
  importComponent: any,
  loaderStyle?: IAnimatedLoader
) {
  _importComponent = importComponent;
  _loaderStyle = loaderStyle;
  // console.log('ffffffffffff', _importComponent, _loaderStyle)
  // return new Promise(resolve => {
  //   console.log(resolve)
  //   AsyncComponent
  // });
  return AsyncComponent

}
