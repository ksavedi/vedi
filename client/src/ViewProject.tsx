import { useEffect, useState } from 'react'
import { Project } from '../../class/project'
import { requestMsg } from './post'
import { ServerMsgProjectList } from '../../interface/serverMsg'
import "./ViewProject.css"

const ViewProject = () => {
    const [projectList, setProjectList] = useState<Project[]>([])

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'getProjectList',
                content: null,
                sessionKey: localStorage['sessionKey']
            }) as ServerMsgProjectList
            setProjectList(result.content.projectList)
        })()
    }, [])

    return (
        <div id="projects-container">
            <div className="project-container">
                <div className="project-list-title">내 프로젝트</div>
                <div className="project-list-container">
                    {projectList.map((project) =>
                        <div className="project-info-container">
                            <div className="project-name-container">
                                {project.name}
                            </div>
                            <div className="project-description-container">
                                {project.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="project-container">
                <div className="project-list-title">공개 프로젝트</div>
                <div className="project-list-container">
                    {projectList.map((project) =>
                        <div className="project-info-container">
                            <div className="project-name-container">
                                {project.name}
                            </div>
                            <div className="project-description-container">
                                {project.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewProject