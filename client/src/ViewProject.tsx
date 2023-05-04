import { useEffect, useState } from "react"
import { Project } from "../../class/project"
import { socket } from "./socket"
import { ServerMsg } from "../../interface"

const ViewProject = () => {
    const [projectList, setProjectList] = useState<Project[]>([])

    useEffect(() => {
        socket.addEventListener("message", (event: MessageEvent<string>) => {
            const serverMsg = JSON.parse(event.data) as ServerMsg
            const { query, content } = serverMsg
            if (query === "projectList") {
                setProjectList(content.projectList)
            }
        })
    })

    return (
        <>
            {projectList.map((project) =>
                <div>
                    <p>
                        name: {project.name}
                    </p>
                    <p>
                        owner: {project.owner}
                    </p>
                    <p>
                        description: {project.description}
                    </p>
                    <p>
                        members: {project.members.join(", ")}
                    </p>
                </div>
            )}
        </>
    )
}

export default ViewProject