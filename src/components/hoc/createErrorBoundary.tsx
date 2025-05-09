import React, {Component} from "react"
import {View} from "@tarojs/components";

const createErrorBoundary = (Page: React.JSXElementConstructor<any>) => {
  return class ErrorBoundary extends Component {
    state = {
      hasError: null,
    }

    static getDerivedStateFromError() {
      return {
        hasError: true,
      }
    }

    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo)
    }

    render() {
      return this.state.hasError ? <View>Something went wrong.</View> : <Page />
    }
  }
}

export default createErrorBoundary;
