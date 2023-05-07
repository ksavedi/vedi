import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { requestMsg } from './post'
import { ServerMsgProject } from '../../interface/serverMsg'
import { Project } from '../../class/project'

const ProjectInfo = () => {
    const name = useParams().name as string

    const [projectInfo, setProjectInfo] = useState<Project>()

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'openProject',
                content: {
                    projectName: name
                },
                sessionKey: localStorage['sessionKey']
            }) as ServerMsgProject
            setProjectInfo(result.content.project)
        })()
    }, [])

    return (
        <div>
            {projectInfo?.name}
        </div>
    )
}

export default ProjectInfo