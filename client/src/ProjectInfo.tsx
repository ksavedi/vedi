import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { requestMsg } from './post'
import { ServerResProject } from '../../interface/serverRes'
import { Project } from '../../class/project'

interface FileInfo {
    [key: string]: FileInfo | string;
}

const buildFileInfo = (curDir: FileInfo, path: string[], value: string, depth = 0) => {
    const dirName = path[depth]
    if (dirName.includes(".")) {
        curDir[dirName] = value
        return
    }
    buildFileInfo((curDir[dirName] ??= {}) as FileInfo, path, value, depth + 1)
}

const ProjectInfo = () => {
    const name = useParams().name as string

    const [ projectInfo, setProjectInfo ] = useState<Project>()
    const [ fileInfo, setFileInfo ] = useState<FileInfo>({})

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'openProject',
                content: {
                    projectName: name
                },
                sessionKey: localStorage['sessionKey']
            }) as ServerResProject
            const { project } = result.content
            setProjectInfo(project)
            
            const fileInfoRaw = {}
            for (const path in project.files) {
                buildFileInfo(fileInfoRaw, path.slice(1).split("/"), project.files[path])
            }
            setFileInfo(fileInfoRaw)
        })()
    }, [])

    return (
        <div>
            <div id="explorer">
                <div id="project-name-container">
                    {projectInfo?.name}  
                </div>
                <div>
                    {JSON.stringify(fileInfo, null, 4)} 
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo