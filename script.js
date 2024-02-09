const editableDiv = document.getElementById('editableDiv')

const storedValue = localStorage.getItem('content')
if (storedValue !== null && storedValue.length > 3) {
  editableDiv.innerText = storedValue
} else {
  editableDiv.innerText = '...'
}

editableDiv.addEventListener('input', () => {
  localStorage.setItem('content', editableDiv.innerText)
})

editableDiv.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const lines = editableDiv.innerText.split('\n')
    const lastLine = lines[lines.length - 2]

    if (lastLine.startsWith('@')) {
      try {
        const code = lastLine.substring(2)
        const result = eval(code)
        editableDiv.innerText =
          lines.join('\n') + '\n' + 'RES: ' + result + '\n'
      } catch (error) {
        console.error('Evaluation error:', error)
        editableDiv.innerText =
          lines.join('\n') + '\n' + 'Error: ' + error.message + '\n'
      }
    }
  }
})
