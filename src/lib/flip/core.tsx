// Element info required to animate between the 2 states
export type ElementInfo = Omit<DOMRect, 'toJSON'> & {
  scrollTop: number;
  backgroundColor: string;
  color: string;
};

const prevElementInfos: Record<string, ElementInfo> = {};

type RawElementInfo = {
  domRect: DOMRect;
  computedStyle: CSSStyleDeclaration;
  documentScrollTop: number;
};

export const storeInfo = (id: string, info: RawElementInfo) => {
  const { domRect, documentScrollTop, computedStyle } = info;

  prevElementInfos[id] = {
    ...domRect.toJSON(),
    scrollTop: documentScrollTop,

    // Store any additional properties we want to animate here
    backgroundColor: computedStyle.backgroundColor,
    color: computedStyle.color,
  };
};

export const getInfo = (id: string) => {
  return prevElementInfos[id];
};

export const animate = (
  newNode: Element,
  newRect: DOMRect,
  prevInfo: ElementInfo,
) => {
  const currentScrollTop = document.documentElement.scrollTop;
  // To better handle cases where the 2 states have different aspect ratio,
  // we need to find the centerpoint of the element and find the delta between those centerpoints
  // instead of just simply finding deltaX and deltaY
  const prevCenterX = prevInfo.x + prevInfo.width / 2;
  const prevCenterY = prevInfo.y + prevInfo.scrollTop + prevInfo.height / 2;

  const newCenterX = newRect.x + newRect.width / 2;
  const newCenterY = newRect.y + currentScrollTop + newRect.height / 2;

  // Calculate how much the position has changed between the 2 states
  const deltaX = prevCenterX - newCenterX;
  const deltaY = prevCenterY - newCenterY;

  // Calculate how much the size has changed between the 2 states
  const deltaScaleX = prevInfo.width / newRect.width;
  const deltaScaleY = prevInfo.height / newRect.height;

  const newComputedStyle = getComputedStyle(newNode);

  // Using the Web Animation API
  newNode.animate(
    [
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaScaleX}, ${deltaScaleY})`,

        // Add more properties here if we want to animate them
        backgroundColor: prevInfo.backgroundColor,
        color: prevInfo.color,
      },
      {
        transform: 'none',

        // Add more properties here if we want to animate them
        backgroundColor: newComputedStyle.backgroundColor,
        color: newComputedStyle.color,
      },
    ],
    { duration: 400, easing: 'cubic-bezier(0,0,0.32,1)' },
  );
};
