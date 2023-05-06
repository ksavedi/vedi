import { useEffect, useState } from 'react'
import { Project } from '../../class/project'
import { auth, bindQuery, send } from './socket'
import { ServerMsgProjectList } from '../../interface/serverMsg'
import "./ViewProject.css"

const ViewProject = () => {
    const [projectList, setProjectList] = useState<Project[]>([])

    bindQuery.projectList = (content: ServerMsgProjectList['content']) => {
        setProjectList(content.projectList)
    }

    useEffect(() => {
        send({
            query: 'getProjectList',
            content: null,
            auth
        })
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