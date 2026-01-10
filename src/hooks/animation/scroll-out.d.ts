declare module 'scroll-out' {
  export default ScrollOut as ScrollOut;

  export interface IScrollOutOptions {
    cssProps?: boolean | CSSPropOptions;
    offset?: ValueOrProvider<number>;
    onChange?: TargetEventCallback;
    onHidden?: TargetEventCallback;
    onShown?: TargetEventCallback;
    onScroll?: (
      // eslint-disable-next-line unused-imports/no-unused-vars
      el: HTMLElement,
      // eslint-disable-next-line unused-imports/no-unused-vars
      scrollingElementCtx: ScrollingElementContext,
      // eslint-disable-next-line unused-imports/no-unused-vars
      ctx: ElementContext[]
    ) => void;
    once?: false;
    scope?: Node | string | null;
    scrollingElement?: Node | string;
    targets?: Node | NodeList | Node[] | string;
    threshold?: ValueOrProvider<number>;
  }

  export type TargetEventCallback = (
    // eslint-disable-next-line unused-imports/no-unused-vars
    el: HTMLElement,
    // eslint-disable-next-line unused-imports/no-unused-vars
    ctx: ElementContext,
    // eslint-disable-next-line unused-imports/no-unused-vars
    doc: HTMLElement
  ) => void;
  export type ValueProvider<T> = (
    // eslint-disable-next-line unused-imports/no-unused-vars
    el: HTMLElement,
    // eslint-disable-next-line unused-imports/no-unused-vars
    ctx: ElementContext,
    // eslint-disable-next-line unused-imports/no-unused-vars
    doc: HTMLElement
  ) => T;
  export type ValueOrProvider<T extends string | number> = T | ValueProvider<T>;

  export interface CSSPropOptions {
    elementHeight?: boolean;
    elementWidth?: boolean;
    intersectX?: boolean;
    intersectY?: boolean;
    offsetX?: boolean;
    offsetY?: boolean;
    visible?: boolean;
    visibleX?: boolean;
    visibleY?: boolean;
  }

  export interface ElementContext {
    element: HTMLElement;
    elementHeight: number;
    elementWidth: number;
    index: number;
    intersectX: -1 | 0 | 1;
    intersectY: -1 | 0 | 1;
    offsetX: number;
    offsetY: number;
    viewportX: number;
    viewportY: number;
    visible: 0 | 1;
    visibleX: number;
    visibleY: number;
  }

  export interface ElementContextInternal extends ElementContext {
    _changed: boolean;
    _visibleChanged: boolean;
  }

  export interface ScrollingElementContext {
    scrollDirX: number;
    scrollDirY: number;
    scrollPercentX: number;
    scrollPercentY: number;
  }

  export interface ScrollingElementContextInternal
    extends ScrollingElementContext {
    __changed__: boolean;
  }

  export interface ScrollOut {
    // eslint-disable-next-line unused-imports/no-unused-vars
    (options: IScrollOutOptions): ScrollOut;
  }

  export interface ScrollOut {
    index(): void;
    teardown(): void;
    update(): void;
  }
}
