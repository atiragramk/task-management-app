import { Component, ReactNode } from "react";
import { ErrorMessage } from "../ErrorMessage";

type TProps = {
  children?: ReactNode;
}
type  TState = {
  error: boolean;
}


export class ErrorBoundary extends Component<TProps, TState> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error) {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}
