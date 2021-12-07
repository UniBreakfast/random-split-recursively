const defaultOptions = {
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'black',
  padding: '3px',
}

const options = {
  width: innerWidth - 16 + 'px',
  height: innerHeight - 16 + 'px',
  borderWidth: '3px',
}

const b0 = makeBlock(options)
document.body.append(b0)

Object.assign(options, {width: '100px', height: '130px'})

b0.append(makeBlock(options), makeBlock(options))

function makeBlock(options) {
  const {borderWidth, borderColor, backgroundColor, width, height} = options 
  const block = document.createElement('div')
  Object.assign(block.style, defaultOptions, options)
  return block 
}
