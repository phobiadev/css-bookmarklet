import { useState } from "react"
import Head from "next/head"

import Editor from "@monaco-editor/react";

function bookMarklet(code) {
  let url = `
    javascript: let customStyleContent = document.createTextNode("${code}"); let styleElement = document.createElement("style"); styleElement.appendChild(customStyleContent); document.getElementsByTagName("head")[0].appendChild(styleElement);

  `
  return url
}

export default function App() {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [buttonText, setButtonText] = useState("Copy javascript")

  function handleCopy() {
    navigator.clipboard.writeText(bookMarklet(code));
    setButtonText("copied!")
    setTimeout(() => setButtonText("Copy javascript"), 400)

  }

  return (
    <div className="App">
      <Head>
        <title>CSS Bookmarklet</title>
      </Head>
      <div className="left half">
        <input value={name} onChange={e => setName(e.target.value)} className="name-input" placeholder="Enter bookmarklet name"></input>
        <div className="editor-container">
          <Editor
            className="editor"
            defaultLanguage="css"
            defaultValue={``}
            onChange={c => setCode(c)}
          />
        </div>
      </div>
      <div className="right half">
        <div className="right-container">
          <p>Drag to bookmark bar</p>
          <div className="bookmarklet">
            <a href={bookMarklet(code)}>{name}</a>
          </div>
          <button onClick={handleCopy}>{buttonText}</button>
        </div>
        
      </div>
      
    </div>
  )
}