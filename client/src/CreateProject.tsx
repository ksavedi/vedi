import { useState } from 'react'
import { requestMsg } from './post'
import type { Id } from '../../interface/basic'
import { ProjectInfo } from '../../class/project'
import { useNavigate } from 'react-router-dom'


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
        <div>
            <div>프로젝트 생성</div>
            <div>
                이름
                <input
                    defaultValue=""
                    onChange={
                        (e) => setProjectName(e.target.value || '')
                    }
                    autoFocus={true}
                />
            </div>
            <div>
                설명
                <textarea
                    defaultValue=""
                    onChange={
                        (e) => setDescription(e.target.value || '')
                    }
                />
            </div>
            <div>
                멤버
                {
                    members.map((mem) => {
                        if (mem === localStorage['id'] as Id) return null
                        return <div>
                            {mem}
                            <span onClick={
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
                }
            </div>
            <div>
                멤버 추가
                <input id="add" value={member} onChange={(e) => setMember(e.target.value)} />
                <button onClick={
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
            <div>
                공개 여부
                <input
                    type="checkbox"
                    onChange={
                        (e) => setIsPublic(e.target.checked)
                    }
                />
            </div>
            <button onClick={() => requestCreateProject(projectName, description, members, isPublic)}>생성</button>
        </div>
    )
}

export default CreateProject