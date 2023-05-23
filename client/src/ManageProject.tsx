import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { requestMsg } from './post'
import type { Id } from '../../interface/basic'
import { ProjectInfo } from '../../class/project'
import { useNavigate } from 'react-router-dom'
import { ServerResProject } from '../../interface/serverRes'
import "./createProject.css"
import "./manageProject.css"

const ManageProject = () => {
    const [projectName, setProjectName] = useState(useParams().name as string)
    const [description, setDescription] = useState('')
    const [members, setMembers] = useState<Id[]>([localStorage['id'] as Id])
    const [member, setMember] = useState('')
    const [requests, setRequests] = useState<Id[]>([])
    const [isPublic, setIsPublic] = useState(false)

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'openProject',
                content: {
                    projectName
                },
                sessionKey: localStorage['sessionKey']
            }) as ServerResProject
            const { project } = result.content
            
            const { name, description, members, requests, isPublic } = project
            setProjectName(name)
            setDescription(description)
            setMembers(members)
            setRequests(requests)
            setIsPublic(isPublic)
        })()
    }, [ projectName ])

    const navigate = useNavigate()

    const requestDeleteProject = async (projectName: string) => {
        await requestMsg({
            query: 'deleteProject',
            content: { projectName },
            sessionKey: localStorage['sessionKey']
        })
        navigate('../project')
    }

    const requestSaveProjectInfo = async (projectName: string, description: string, members: Id[], requests: Id[], isPublic: boolean) => {
        const projectInfo: ProjectInfo = {
            owner: localStorage['id'] as Id,
            description,
            members,
            files: {},
            requests,
            isPublic
        }
        await requestMsg({
            query: 'saveProjectInfo',
            content: { projectName, projectInfo },
            sessionKey: localStorage['sessionKey']
        })
        navigate('../project')
    }

    return (
        <div id="container">
            <div id="maintitle">프로젝트 수정</div>
            <div className="divs">
                <h1 className="titles">이름:</h1>
                <input className="inputtexts" value={ projectName } readOnly />
            </div>
            <div className="divs" style={{height: '120px'}}>
                <h1 className="titles">설명</h1>
                <textarea className="inputtexts"
                    defaultValue={description}
                    onChange={
                        (e) => setDescription(e.target.value || '')
                    }
                />
            </div>
            <div className="divs" style={{height: 'fit-content'}}>
                <h1 className="titles">멤버</h1>
                <div className="memberlist">
                {
                    members.map((mem) => {
                        if (mem === localStorage['id'] as Id) return ''
                        return <div className="eachmember">{mem}<span onClick={
                            () => {
                                setMembers((members) => {
                                    const copied = [...members]
                                    copied.splice(copied.indexOf(mem), 1)
                                    return copied
                                })
                            }
                        } style={{ color: 'red', marginLeft: '10px',  textDecoration: 'underline' }}>삭제</span></div>
                    })
                }
                </div>
            </div>
            {
                (isPublic && requests.length > 0)
                ? <div className="divs" style={{height: 'fit-content'}}>
                <h1 className="titles">신청</h1>
                <div className="memberlist">
                {
                    requests.map((mem) => {
                        return <div className="eachmember">
                            {mem}
                            <span onClick={
                                () => {
                                    setMembers((members) => [...members, mem as Id])
                                    setRequests((requests) => {
                                        const copied = [...requests]
                                        copied.splice(copied.indexOf(mem), 1)
                                        return copied
                                    })
                                }
                            } style={{ color: 'green', marginLeft: '10px', textDecoration: 'underline' }}>수락</span>
                            <span onClick={
                                () => {
                                    setRequests((requests) => {
                                        const copied = [...requests]
                                        copied.splice(copied.indexOf(mem), 1)
                                        return copied
                                    })
                                }
                            } style={{ color: 'red', marginLeft: '10px', textDecoration: 'underline' }}>거절</span>
                        </div>
                    })
                }
                </div></div> : null
            }
            <div className="divs">
                <h1 className="titles">멤버 추가</h1>
                <input className="inputtexts" value={member} onChange={(e) => setMember(e.target.value)} />
                <button id="addmemberbutton"
                onClick={
                    () => {
                        if (!/^(19|20|21|22|23|24|25)-\d{3}$/.test(member)) {
                            window.alert('형식에 맞지 않는 학번입니다.')
                            return
                        }
                        if (members.includes(member as Id)) {
                            window.alert('이미 해당 멤버가 존재합니다.')
                            return
                        }
                        setMembers((members) => [...members, member as Id])
                        setMember('')
                    }
                }>추가</button>
            </div>
            <div className="divs">
                <h1 className="titles">공개 여부</h1>
                <input
                    id="check"
                    type="checkbox"
                    checked={isPublic}
                    onChange={
                        (e) => setIsPublic(e.target.checked)
                    }
                />
            </div>
            <button className="delete-project button" onClick={() => requestDeleteProject(projectName)}>삭제</button>
            <button className="button" onClick={() => requestSaveProjectInfo(projectName, description, members, requests, isPublic)}>저장</button>
        </div>
    )
}

export default ManageProject