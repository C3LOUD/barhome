import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
    this.setState({ hasError: true });
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex w-full flex-col gap-4 pt-24 font-primary text-white-100">
          <p className="heading-h2 text-error">Something went wrong!</p>
          <p className="heading-h4">{this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
