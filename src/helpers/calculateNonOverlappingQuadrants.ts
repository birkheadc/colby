export interface ISimpleRect {
  top: number,
  bottom: number,
  left: number,
  right: number
}

export function calculateNonOverlappingQuadrants(outer: DOMRect, inner: DOMRect): ISimpleRect[] {
  const quadrants: ISimpleRect[] = [];

  // LEFT QUADRANT
  if (outer.left < inner.left) {
    quadrants.push({
      top: outer.top,
      bottom: outer.bottom,
      left: outer.left,
      right: inner.left
    })
  }

  // RIGHT QUADRANT
  if (outer.right > inner.right) {
    quadrants.push({
      top: outer.top,
      bottom: outer.bottom,
      left: inner.right,
      right: outer.right
    })
  }

  // TOP QUADRANT
  if (outer.top > inner.top) {
    quadrants.push({
      top: outer.top,
      bottom: inner.top,
      left: outer.left,
      right: outer.right
    })
  }

  // BOTTOM QUADRANT
  if (outer.bottom < inner.bottom) {
    quadrants.push({
      top: inner.bottom,
      bottom: outer.bottom,
      left: outer.left,
      right: outer.right
    })
  }

  return quadrants;
}