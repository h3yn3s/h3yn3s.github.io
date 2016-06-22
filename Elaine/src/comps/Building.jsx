import React, { PropTypes } from 'react';

const styles = {
  building: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 200,
  },
};

class Building extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    name: PropTypes.string,
  }

  handleIncrease = () => {
    this.props.increase(this.props.name);
  }

  handleDecrease = () => {
    this.props.decrease();
  }

  render = () => {
    return (
      <div style={styles.building}>
        <div>
          {this.props.name}
        </div>
        <div>
          {this.props.count}
        </div>
        <div
          onTouchTap={this.handleIncrease}
        >+</div>
        <div
          onTouchTap={this.handleDecrease}
        >-</div>
      </div>
    );
  }
}

export default Building;
