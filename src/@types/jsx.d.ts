/// <reference types="preact" />

import { JSX as PreactJSX } from 'preact';

declare global {
  namespace JSX {
    interface Element extends PreactJSX.Element {}
    interface IntrinsicElements extends PreactJSX.IntrinsicElements {}
  }
}

// Re-export common types for convenience
export type ComponentChildren = PreactJSX.Element | PreactJSX.Element[] | string | number | null | undefined;
export type ComponentChild = PreactJSX.Element | string | number | null | undefined;
export type VNode = PreactJSX.Element;