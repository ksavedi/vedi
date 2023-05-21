import { useEffect, useState } from 'react'
import { Project } from '../../class/project'
import { requestMsg } from './post'
import { ServerResProjectList } from '../../interface/serverRes'
import "./ViewProject.css"
import { useNavigate } from 'react-router-dom'
import { Id } from '../../interface/basic'

const ViewProject = () => {
    const [projectList, setProjectList] = useState<Project[]>([])

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'getProjectList',
                content: null,
                sessionKey: localStorage['sessionKey']
            }) as ServerResProjectList
            setProjectList(result.content.projectList)
        })()
    }, [])

    const navigate = useNavigate()

    return (
        <>
            <div id="create-project-button"
                onClick={() => navigate('../create')}>
                프로젝트 생성
            </div>
            <div id="projects-container">
                <div className="project-container">
                    <div className="project-list-title">내 프로젝트</div>
                    <div className="project-list-container">
                        {projectList
                            .filter((v) => v.members.includes(localStorage["id"] as Id))
                            .map((project) =>
                                <div className="project-info-container"
                                    onClick={() => navigate(`./${project.name}`)}
                                >
                                    <div className="project-name-container">
                                        {project.name}
                                    </div>
                                    <div className="project-description-container">
                                        {project.description}
                                    </div>
                                    <div>
                                        <span style={{textDecoration: 'underline'}} onClick={
                                            (event) => {
                                                event.stopPropagation()
                                                navigate(`./${project.name}/changeInfo`)
                                            }
                                        }>수정</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="project-container">
                    <div className="project-list-title">공개 프로젝트</div>
                    <div className="project-list-container">
                        {projectList
                            .filter((v) => v.isPublic)
                            .map((project) =>
                                <div className="project-info-container"
                                    onClick={() => navigate(`./${project.name}`)}
                                >
                                    <div className="project-name-container">
                                        {project.name}
                                    </div>
                                    <div className="project-description-container">
                                        {project.description}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProject