const defaultOptions = {
  display: 'flex',
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'black',
  margin: 7,
}

const options = {
  width: innerWidth - 16,
  height: innerHeight - 16,
  borderWidth: 7,
}

try {
  const b0 = makeBlock(options)
  document.body.append(b0)
  Object.assign(options, {width: 100, height: 130})
  b0.append(makeBlock(options), makeBlock(options))
} catch (err) {
  document.body.append(err.message)
}

function makeBlock(options) {
  const {borderWidth, borderColor, backgroundColor, width, height} = options 
  const block = document.createElement('div')
  Object.assign(block.style, normalize(defaultOptions), normalize(options))
  return block 
}

function normalize(options) {
  for (const prop in options) {
    if (typeof options[prop] = 'number') options[prop] += 'px'
  }
}
