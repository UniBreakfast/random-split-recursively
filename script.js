const duration = 1000;
const maxDepth = undefined //|| 2;
const lineWidth = 6;
const minSize = lineWidth * 4;

let pause = false;
let timerId;

body.style.setProperty('--line', `${lineWidth}px`);
body.style.setProperty('--time', `${duration}ms`);

splitRecursively(body, maxDepth);

body.onclick = handleClick;

function handleClick(e) {
  if (e.target === body) return;
  
  const parent = e.target.parentElement;

  pause = true;

  clearTimeout(timerId);

  timerId = setTimeout(() => {
    pause = false;

    const leaves = document.querySelectorAll(':empty');
console.log(leaves);
    for (const leave of leaves) {
      splitRecursively(leave);
    }
  }, duration * 3);
  
  for (el of parent.children) {
    el.classList.add('transparent');
  }
  setTimeout(() => parent.replaceChildren(), duration);
}

function splitRecursively(el, depth = Infinity) {
  if (depth <= 0) return;

  const { width, height } = getContentSize(el);
  const gap = parseFloat(getComputedStyle(el).gap);
  const vertical = width > height;
  const longSide = vertical ? width : height;
  const shortSide = vertical ? height : width;
  const willSplit = longSide > minSize * 2 + gap
    && shortSide > minSize;

  if (willSplit) {
    if (vertical) splitVertically(el, width - gap);
    else splitHorizontally(el, height - gap);

    for (const child of el.children) {
      child.classList.add('transparent');
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          child.classList.remove('transparent')
  
          setTimeout(() => {
            if (pause) return;

            splitRecursively(child, depth - 1);
          }, duration);
        });
      });
    }
  }
}

function splitVertically(el, width) {
  const child1 = document.createElement('div');
  const child2 = document.createElement('div');
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
