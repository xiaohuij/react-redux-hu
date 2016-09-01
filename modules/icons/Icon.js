import { cloneElement, PropTypes, Component } from 'react';
import classNames from 'classnames';
import * as IconMaps from './IconMaps';

import Icon_ from './Icon_.styl';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(IconMaps)),
    className: PropTypes.string,
  };

  render() {
    const { name, className } = this.props;
    return cloneElement(IconMaps[name], {
      className: classNames(Icon_.root, className),
    });
  }
}

export default Icon;
