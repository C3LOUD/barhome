import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-white-100 mx-auto font-primary flex flex-col gap-4 pt-24 w-full">
          <p className="heading-h2 text-error">Something went wrong!</p>
          <p className="heading-h4">{this.state.error.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
