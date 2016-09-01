import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Works_ from './Works_.styl';
import Container from '../component/Container';
import withAttendees from 'modules/entities/composers/withAttendees';

@withAttendees
class Works extends Component {
  static propTypes = {
    push: PropTypes.func,
    goBack: PropTypes.func,
    location: PropTypes.object,
    kongfu: PropTypes.array,
  };

  render() {
    const { kongfu } = this.props;
    return (
      <div className={Works_.background} >
        <Container>
          OK
        </Container>
      </div>
    );
  }
}

export default Works;
