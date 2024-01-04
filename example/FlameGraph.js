import React, { Component } from "react";
import { withProps } from "recompose";
import styles from "./styles";

class FlameGraphNode extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  hoverHandle(entering) {
    return (e) => {
      if (entering) {
        this.setState({ hover: true });
        return;
      }
      this.setState({ hover: false });
    };
  }
  render() {
    const {
      name,
      stack,
      basis = 100,
      index = 0,
      level = 0,
      scale = 1,
    } = this.props;
    const borderBottomWidth = level ? 0 : "1px";
    return (
      <div
        key={index}
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
          onMouseEnter={this.hoverHandle(true)}
          onMouseLeave={this.hoverHandle()}
        >
          <p type="caption" style={styles.innerItem} component="p">
            {name}
          </p>
        </div>
        {
          // we stop recursion in case there's no stack
          stack ? (
            <div style={styles.wrapStack}>
              {Object.keys(stack).map((k, i) => (
                <FlameGraphNode
                  {...{
                    name: k,
                    stack: stack[k].stack,
                    basis: stack[k].value * scale,
                    key: i,
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
    if (e.deltaY < 0) {
      e.preventDefault();
      console.log("up");
    } else {
      e.preventDefault();
      console.log("down");
    }
    this.setState({ scale: Math.max(this.state.scale - e.deltaY / 800, 1) });
    console.log(this.state.scale);
  }

  render() {
    const { flameData } = this.props;
    const k = Object.keys(flameData)[0];
    return (
      <div style={styles.root} onWheel={(e) => this.divWhell(e)}>
        <FlameGraphNode
          {...{
            name: k,
            stack: flameData[k].stack,
            basis: flameData[k].value,
            scale: this.state.scale,
          }}
        />
      </div>
    );
  }
}

export default FlameGraph;
