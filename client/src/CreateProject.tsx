import { useState } from 'react'
import { requestMsg } from './post'
import type { Id } from '../../interface/basic'
import { ProjectInfo } from '../../class/project'
import { useNavigate } from 'react-router-dom'


const requestCreateProject = async (projectName: string, description: string, isPublic: boolean) => {
    const projectInfo: ProjectInfo = {
        owner: localStorage['id'] as Id,
        description,
        members: [localStorage['id'] as Id],
        files: {},
        requests: [],
        isPublic
    }
    const res = await requestMsg({
        query: 'createProject',
        content: { projectName, projectInfo },
        sessionKey: localStorage['sessionKey']
    })
}

const CreateProject = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

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
                공개 여부
                <input
                    type="checkbox"
                    onChange={
                        (e) => setIsPublic(e.target.checked)
                    }
                />
            </div>
            <button onClick={() => requestCreateProject(projectName, description, isPublic)}>생성</button>
        </div>
    )
}

export default CreateProject