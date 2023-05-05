import { useEffect, useState } from 'react'
import { Project } from '../../class/project'
import { auth, bindQuery, send } from './socket'
import { ServerMsgProjectList } from '../../interface/serverMsg'

const ViewProject = () => {
    const [projectList, setProjectList] = useState<Project[]>([])

    useEffect(() => {
        bindQuery.projectList = (content: ServerMsgProjectList['content']) => {
            setProjectList(content.projectList)
        }
    })

    send({
        query: 'getProjectList',
        content: null,
        auth
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