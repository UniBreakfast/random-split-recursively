debugger

const defaultOptions = {
  display: 'flex',
  boxSizing: 'border-box',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'black',
  padding: 7,
  gap: 7
}

const options = {
  width: innerWidth - 16,
  height: innerHeight - 16,
  borderWidth: 7,
}

try {
  const block = makeBlock(options)
  document.body.append(block)
  splitRecursively(block, options, 30, 4, 0.8)
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
    if (typeof options[prop] == 'number') options[prop] += 'px'
  }
  return options
}

function splitRecursively(block, options, minSpace=defaultOptions.padding*2, depth=Infinity, probability=1) {
  if (!depth) return
  let {width, height, borderWidth, padding} = block.style
  width = parseInt(width)
  height = parseInt(height)
  borderWidth = parseInt(borderWidth)
  padding = parseInt(padding)
  // choose smaller side 
  // decide to split or not
  // recalculate options 
  // make and append block(s)
  // recursive call if depth allows  
  const willSplit = Math.random() < probability 
  if (willSplit) 
}




