import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { getParentUrl } from "./helpers/getParentUrl"
import './App.css'

const baseURL = "http://localhost:3101/"

interface FsItem {
  name: string
  type: string
}

function App() {
  const [fs, setFs] = useState<FsItem[] | null>(null)
  const [currentUrl, setCurrentUrl] = useState<URL>(new URL(window.location.href))

  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    setCurrentUrl(currentUrl)

    axios.get(baseURL + currentUrl.pathname).then((response) => {
      setFs(response.data)
    })
  }, [])

  function FsItem(fsItem: FsItem, index: number) {
    if (fsItem.type === "directory")
      return <li key={index} className={fsItem.type}><a href={`${currentUrl?.href.replace(/\/$/, '')}/${fsItem.name}`}>{fsItem.name}</a></li>
    else
      return <li key={index} className={fsItem.type}>{fsItem.name}</li>
  }

  if (!fs) return <>No data</>

  return (
    <div>
      <div>Current path: {currentUrl?.pathname}</div>
      <ul>
        {currentUrl?.pathname !== "/" && <li><a href={getParentUrl(currentUrl)}>..</a></li>}
        {fs.map((fsItem, index) => (
          FsItem(fsItem, index)
        )
        )}
      </ul>
    </div>
  )
}

export default App
