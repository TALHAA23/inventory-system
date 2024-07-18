// Use JSX syntax for React components
"use client";
import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<any>; // Optional error component
  errorMessage?: string; // Optional error message
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.error("Error in Component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI based on props
      if (this.props.FallbackComponent) {
        return <this.props.FallbackComponent />;
      } else if (this.props.errorMessage) {
        return (
          <div>
            <h2>Error: {this.props.errorMessage}</h2>
          </div>
        );
      } else {
        return (
          <div>
            <h2>Oops, there is an error!</h2>
          </div>
        );
      }
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
