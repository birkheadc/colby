export function areRectsOverlapping(rect1: DOMRect, rect2: DOMRect): boolean {
  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}