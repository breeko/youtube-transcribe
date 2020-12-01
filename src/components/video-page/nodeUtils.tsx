
export const sentenceClick = (e: Element) => {
  e.parentElement.parentElement.querySelectorAll(".sentence-action").forEach(a => a.remove())
  
  if (!e.hasAttribute("contenteditable")) {
    e.setAttribute("contenteditable", "true")
  }
  if (e.parentElement.querySelector(".sentence-action") === null) {
    const up = document.createElement("span")
    // merge with above
    up.appendChild(document.createTextNode("⤒"))
    up.className = "sentence-action"
    up.addEventListener("click", () => {
      const curSentence = up.parentElement.querySelector(".inner-sentence")
      const prevSentence = up.parentElement.previousElementSibling.querySelector(".inner-sentence")

      // update end attribute
      const currentEnd = curSentence.parentElement.querySelector(".transcript-link").getAttribute("data-end")
      prevSentence.parentElement.querySelector(".transcript-link").setAttribute("data-end", currentEnd)
      
      // add span nodes
      const nodesToAdd = [...curSentence.childNodes.values()]
      var documentFragment = document.createDocumentFragment()
      nodesToAdd.forEach(n => documentFragment.appendChild(n))
      prevSentence.appendChild(documentFragment)

      curSentence.parentElement.remove()
    })
    e.parentElement.insertBefore(up, e.parentElement.childNodes[0])

    // merge with below
    const down = document.createElement("span")
    down.appendChild(document.createTextNode("⤓"))
    down.className = "sentence-action"
    down.addEventListener("click", () => {
      const curSentence = down.parentElement.querySelector(".inner-sentence")
      const nextSentence = down.parentElement.nextElementSibling.querySelector(".inner-sentence")
      
      // update end attribute
      const currentEnd = curSentence.parentElement.querySelector(".transcript-link").getAttribute("data-start")
      nextSentence.parentElement.querySelector(".transcript-link").setAttribute("data-start", currentEnd)

      const origTranscript = down.parentElement.querySelector(".transcript-link")
      const origTime = origTranscript.textContent.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2}/g)[0]
      if (origTime) {
        const nextTime = down.parentElement.nextElementSibling.querySelector(".transcript-link")
        const updatedTime = nextTime.textContent.replace(/^[0-9]{2}:[0-9]{2}:[0-9]{2}/g, origTime)
        nextTime.textContent = updatedTime
      }
      
      
      const nodesToAdd = [...curSentence.childNodes.values()]
      var documentFragment = document.createDocumentFragment()
      nodesToAdd.forEach(n => documentFragment.appendChild(n))
      nextSentence.insertBefore(documentFragment, nextSentence.childNodes[0])
      curSentence.parentElement.remove()
    })
    e.parentElement.insertBefore(down, e.parentElement.childNodes[0])
    
    const d = document.createElement("span")
    d.appendChild(document.createTextNode("ⓧ"))
    d.className = "sentence-action red"
    d.addEventListener("click", () => {
      e.parentElement.remove()
    })
    e.parentElement.insertBefore(d, e.parentElement.childNodes[0]) 
  }
}