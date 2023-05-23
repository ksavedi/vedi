import { useEffect, useState } from "react"
import { requestMsg } from "./post"
import { ServerResReadme } from "../../interface/serverRes"
import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown'

const ProjectReadme = () => {
    const name = useParams().name as string

    const [readme, setReadme] = useState("")

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'openReadme',
                content: {
                    projectName: name
                },
                sessionKey: localStorage['sessionKey']
            }) as ServerResReadme
            setReadme(result.content.document)
        })()
    }, [])

    return (
        <div>
            <ReactMarkdown>
                {readme}
            </ReactMarkdown>
        </div>
    )
}

export { ProjectReadme }