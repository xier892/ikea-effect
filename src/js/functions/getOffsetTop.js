function getOffsetTop(element) {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    // eslint-disable-next-line no-param-reassign
    element = element.offsetParent;
  }
  return offsetTop;
}
