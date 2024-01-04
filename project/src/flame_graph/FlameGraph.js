import React, { Component } from "react";
import styles from "./styles";

class FlameGraphNode extends Component {
  constructor() {
    super();
  }


  render() {
    const {
      name,
      stack,
      basis = 100,
      level = 0,
      scale = 1,
    } = this.props;
    const borderBottomWidth = level ? 0 : "1px";
    return (
      <div
        style={{
          flexBasis: `${basis * scale}%`,
          width: `${basis * scale}%`,
          flexGrow: 1,
          ...styles.wrapItem,
        }}
      >
        <div
          style={{
            ...styles.item,
            borderBottomWidth,
            background: level % 2 ? "#836" : "#3a3",
          }}
        >
          <p type="caption" style={styles.innerItem} component="p">
            {name}
          </p>
        </div>
        {
          // we stop recursion in case there's no stack
          stack ? (
            <div style={styles.wrapStack}>
              {stack.map(item => (
                <FlameGraphNode
                  {...{
                    name: item.name,
                    stack: item.stack,
                    basis: item.value * scale,
                    level: level + 1,
                  }}
                />
              ))}
            </div>
          ) : null
        }
      </div>
    );
  }
}

class FlameGraph extends Component {
  constructor() {
    super();
    this.state = {
      scale: 1,
    };
  }

  divWhell(e) {
    this.setState({ scale: Math.max(this.state.scale - e.deltaY / 100, 1) });
    console.log(this.state.scale);
  }

  render() {
    const { flameData } = this.props;
    const stack = flameData.stack;
    return (
        <div
          style={{
            flexBasis: `${100 * this.state.scale}%`,
            width: `${100 * this.state.scale}%`,
            flexGrow: 1,
            ...styles.wrapItem,
          }}
          onWheel={(e) => {this.divWhell(e)}}>
          <div style={styles.wrapStack}>
            {
              stack.map(item => (
                <FlameGraphNode
                  {...{
                    name: item.name,
                    stack: item.stack,
                    basis: item.value * this.state.scale,
                    scale: this.state.scale,
                  }}
                />
              ))

            }
          </div>
          </div>
    );
  }
}

export default FlameGraph;
