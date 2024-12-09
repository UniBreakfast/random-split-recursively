const maxDepth = undefined //|| 2;
const lineWidth = 6;
const minSize = lineWidth * 4;

body.style.setProperty('--line', `${lineWidth}px`);

splitRecursively(body, maxDepth);

function splitRecursively(el, depth = Infinity) {
  if (depth <= 0) return;

  const { width, height } = getContentSize(el);
  const gap = parseFloat(getComputedStyle(el).gap);
  const vertical = width > height;
  const longSide = vertical ? width : height;
  const shortSide = vertical ? height : width;
  const willSplit = longSide > minSize * 2 + gap
    && shortSide > minSize;

  el.dataset.sizes = `longside ${longSide}px shortside ${shortSide}px`;

  if (willSplit) {
    if (vertical) splitVertically(el, width - gap);
    else splitHorizontally(el, height - gap);

    for (const child of el.children) {
      splitRecursively(child, depth - 1);
    }
  }
}

function splitVertically(el, width) {
  const child1 = document.createElement('div');
  const child2 = document.createElement('div');
  // const width1 = width * 0.5;
  const maxWidth = width - 2 * minSize;
  const width1 = Math.floor(Math.random() * maxWidth) + minSize;
  const width2 = width - width1;

  child1.style.width = `${width1}px`;
  child2.style.width = `${width2}px`;

  el.append(child1, child2);
  el.classList.add('row');
  el.dataset.width = width;
}

function splitHorizontally(el, height) {
  const child1 = document.createElement('div');
  const child2 = document.createElement('div');
  // const height1 = height * 0.5;
  const maxHeight = height - 2 * minSize;
  const height1 = Math.floor(Math.random() * maxHeight) + minSize;
  const height2 = height - height1;

  child1.style.height = `${height1}px`;
  child2.style.height = `${height2}px`;

  el.append(child1, child2);
  el.dataset.height = height;
}

function getContentSize(el) {
  const {
    paddingTop, paddingRight, paddingBottom, paddingLeft
  } = getComputedStyle(el);

  const width = el.clientWidth 
    - parseFloat(paddingLeft) - parseFloat(paddingRight);

  const height = el.clientHeight 
    - parseFloat(paddingTop) - parseFloat(paddingBottom);

  return { width, height };
}
