declare module "stack-styled" {
  export interface IStackStyledProps {
    alignItems: string[];
    justifyContent: string[];
    gridAutoFlow: string[];
    gridTemplateColumns?: string;
    width?: string;
    gap: number;
  }

  import styled from "styled-components";
  import * as React from "react";

  const Stack: React.ComponentType<IStackStyledProps>;

  export default Stack;
}
