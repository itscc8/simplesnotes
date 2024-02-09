const editableDiv = document.getElementById('editableDiv')

editableDiv.innerText = localStorage.getItem('content') || '...'

editableDiv.addEventListener('input', () => {
  localStorage.setItem('content', editableDiv.innerText)
})

editableDiv.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const lines = editableDiv.innerText.split('\n')
    const lastLine = lines.pop()

    if (lastLine.startsWith('@')) {
      try {
        const code = lastLine.substring(1)
        const result = eval(code)
        editableDiv.innerText = lines.join('\n') + '\nRES: ' + result + '\n'
      } catch (error) {
        console.error('Evaluation error:', error)
        editableDiv.innerText =
          lines.join('\n') + '\n' + 'Error: ' + error.message
      }
    } else {
      editableDiv.innerText = lines.join('\n') + '\n' 
    }
  }
})
