const defaultOptions = {
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'black',
}

const options = {
  width: innerWidth - 16 + 'px',
  height: innerHeight - 16 + 'px',
  borderWidth: '3px',
}

document.body.append(makeBlock(options))

function makeBlock(options) {
  const {borderWidth, borderColor, backgroundColor, width, height} = options 
  const block = document.createElement('div')
  Object.assign(block.style, defaultOptions, options)
  return block 
}