"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface ErrorInterface {
  title: string;
  description: string;
}

export type ErrorType = ErrorInterface[];

// define the props
type ErrorState = {
  errors: ErrorType;
  // eslint-disable-next-line no-unused-vars
  setErrors(errors: ErrorType): void;
};

// 1. create a context with AuthState and initialize it to null
const ErrorContext = createContext<ErrorState | null>(null);

const useErrors = (): ErrorState => {
  // 2. use the useContext hook
  const context = useContext(ErrorContext);

  // 3. Make sure it's not null!
  if (!context) {
    throw new Error("Please use ErrorProvider in parent component");
  }

  return context;
};

export const ErrorProvider = (props: PropsWithChildren) => {
  const [errors, setErrors] = useState<ErrorType>([]);

  return (
    <ErrorContext.Provider value={{ errors, setErrors }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export default useErrors;
