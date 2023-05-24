import { useState } from 'react'
import { requestMsg } from './post'
import type { Id } from '../../interface/basic'
import { ProjectInfo } from '../../class/project'
import { useNavigate } from 'react-router-dom'
import "./createProject.css"


const CreateProject = () => {
    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [members, setMembers] = useState<Id[]>([localStorage['id'] as Id])
    const [member, setMember] = useState('')
    const [isPublic, setIsPublic] = useState(false)

    const navigate = useNavigate()

    const requestCreateProject = async (projectName: string, description: string, members: Id[], isPublic: boolean) => {
        const projectInfo: ProjectInfo = {
            owner: localStorage['id'] as Id,
            description,
            members,
            files: {},
            requests: [],
            isPublic
        }
        await requestMsg({
            query: 'createProject',
            content: { projectName, projectInfo },
            sessionKey: localStorage['sessionKey']
        })
        navigate(`../project/${projectName}`)
    }

    return (
        <div id="container">
            <div id="maintitle">프로젝트 생성</div>
            <div id="name" className="divs"><h1 id="nametitle" className="titles">
                제목</h1>
                <input className="inputtexts"
                    defaultValue=""
                    onChange={
                        (e) => setProjectName(e.target.value || '')
                    }
                    autoFocus={true}
                    placeholder='프로젝트 제목'
                />
            </div>
            <div id="description" className="divs"><h1 id="descriptiontitle" className="titles">
                설명</h1>
                <textarea className="inputtexts"
                    defaultValue=""
                    onChange={
                        (e) => setDescription(e.target.value || '')
                    }
                    placeholder='프로젝트에 대한 설명을 자유롭게 적어주세요!'
                />
            </div>
            <div id="members" className="divs"><h1 id="membertitle" className="titles">
                멤버</h1>
                <div id="memberlist">
                {
                    members.map((mem) => {
                        if (mem === localStorage['id'] as Id) return null
                        return <div className="eachmember">
                            {mem}
                            <span className="delete" onClick={
                                () => {
                                    setMembers((members) => {
                                        const copied = [...members]
                                        copied.splice(copied.indexOf(mem), 1)
                                        return copied
                                    })
                                }
                            } style={{ color: 'red', textDecoration: 'underline' }}>삭제</span>
                        </div>
                    })
                }</div>
            </div>
            <div id="addmembers" className="divs"><h1 id="addmemberstitle" className="titles">
                멤버 추가</h1>
                <input className="inputtexts" id="add" value={member} onChange={(e) => setMember(e.target.value)} placeholder='새 멤버의 학번 (예시 : 23-031)' />
                <button id="addmemberbutton" onClick={
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
            <div id="public" className="divs"><h1 id="publictitle" className="titles">
                공개 여부</h1>
                <input
                    id="check"
                    type="checkbox"
                    onChange={
                        (e) => setIsPublic(e.target.checked)
                    }
                />
                <label htmlFor="check"></label>
            </div>
            <button id="createbutton" onClick={() => requestCreateProject(projectName, description, members, isPublic)}>생성</button>
        </div>
    )
}

export default CreateProject