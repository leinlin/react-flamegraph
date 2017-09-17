import React, { Component } from "react";
import { withProps } from "recompose";

import { flameData } from "./flamedata.json";
import styles from "./styles";

class FlameGraphNode extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  hoverHandle(entering) {
    return e => {
      if (entering) {
        this.setState({ hover: true });
        return;
      }
      this.setState({ hover: false });
    };
  }
  render() {
    const { name, stack, basis = 100, index = 0, level = 0 } = this.props;
    const borderBottomWidth = level ? 0 : "1px";
    return (
      <div
        key={index}
        style={{
          flexBasis: `${basis}%`,
          width: `${basis}%`,
          flexGrow: this.state.hover ? 1 : 0,
          ...styles.wrapItem
        }}
      >
        <div
          style={{
            ...styles.item,
            borderBottomWidth,
            background: level % 2 ? "#fff" : "#eee"
          }}
          onMouseEnter={this.hoverHandle(true)}
          onMouseLeave={this.hoverHandle()}
        >
          <p type="caption" style={styles.innerItem} component="p">
            {name}
          </p>
        </div>
        {// we stop recursion in case there's no stack
        stack ? (
          <div style={styles.wrapStack}>
            {Object.keys(stack).map((k, i) => (
              <FlameGraphNode
                {...{
                  name: k,
                  stack: stack[k].stack,
                  basis: stack[k].value,
                  key: i,
                  level: level + 1
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const FlameGraph = ({ c, flameData }) => {
  const k = Object.keys(flameData)[0];
  return (
    <div style={styles.root}>
      <FlameGraphNode
        {...{ name: k, stack: flameData[k].stack, basis: flameData[k].value }}
      />
    </div>
  );
};

export default withProps({ flameData })(FlameGraph);
