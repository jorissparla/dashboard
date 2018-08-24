import React from "react";
import styled from "styled-components";

const Dots = styled.span`
  font-size: 200px;
  display: block;
  text-align: center;
  color: white;
`;

class LoadingDots extends React.Component {
  static defaultProps = {
    interval: 300,
    dots: 3
  };

  state = { frame: 1 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = "";
    while (dots > 0) {
      text += ".";
      dots--;
    }
    return <Dots>{text}&nbsp;</Dots>;
  }
}

export default LoadingDots;
