import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";

const Text = styledTS<{}>(styled.span)`
  font-size: 10px;
  color: red
`;

type ErrorMsgProps = {
  children: string;
};

class ErrorMsg extends React.PureComponent<ErrorMsgProps> {
  render() {
    const { children } = this.props;

    const content = children.replace("GraphQL error: ", "");

    return <Text {...this.props}>{content}</Text>;
  }
}

export default ErrorMsg;
