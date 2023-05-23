import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { requestMsg } from './post'
// import { directory } from '../../interface/basic'
import { ServerResProject } from '../../interface/serverRes'
import { Project } from '../../class/project'
import { Editor } from '@monaco-editor/react'
import { Directory } from './Directory'

import './ProjectFile.css'

// eslint-disable-next-line prefer-named-capture-group
const directory = /\/([ㄱ-ㅎㅏ-ㅣ가-힣\w\s.]+\/)*([ㄱ-ㅎㅏ-ㅣ가-힣\w\s.]*\.)+([ㄱ-ㅎㅏ-ㅣ가-힣\w\s.]*)$/gim

interface FileInfo {
    type: 'file';
    name: string;
    language: string;
    content: string;
    depth: number;
    path: string;
}

interface FolderInfo {
    type: 'folder',
    name: string;
    child: (FolderInfo | FileInfo)[];
    depth: number;
}

const language: Record<string, string> = {
    txt: 'plaintext',
    js: 'javascript',
    ts: 'typescript',
    md: 'markdown',
    kt: 'kotlin',
    cs: 'csharp',
    py: 'python',
    rs: 'rust',
    rb: 'ruby',
    htm: 'html'
}

const buildFileInfo = (curDir: FolderInfo, path: string[], value: string, depth = 0) => {
    const dirName = path[depth]
    const extension = dirName.split('.').at(-1)
    if (extension === undefined) throw new Error('no file extension')
    if (dirName.includes(".")) {
        curDir.child.push({
            type: 'file',
            name: dirName,
            language: language[extension] ?? extension,
            content: value,
            depth,
            path: '/' + path.join('/')
        })
        return
    }
    if (curDir.child.findIndex((v) => v.name === dirName) === -1) {
        curDir.child.push({
            type: 'folder',
            name: dirName,
            child: [],
            depth
        })
    }
    buildFileInfo(curDir.child.find((v) => v.name === dirName) as FolderInfo, path, value, depth + 1)
}

const ProjectFile = () => {
    const name = useParams().name as string

    const [projectInfo, setProjectInfo] = useState<Project>()
    const [folderInfo, setFolderInfo] = useState<FolderInfo>({
        type: 'folder',
        name: 'root',
        child: [],
        depth: -1
    })
    const [explorer, setExplorer] = useState<(FolderInfo | FileInfo)[]>([])
    const [path, setPath] = useState('')
    const [fileName, setFileName] = useState('')
    const [lang, setLang] = useState('')
    const [text, setText] = useState('')
    const [newDirectory, setNewDirectory] = useState<string | null>(null)
    const [onFile, setOnFile] = useState<'block' | 'none'>('none')

    const buildExplorer = (curDir: FolderInfo, dirList: (FolderInfo | FileInfo)[]) => {
        for (const element of curDir.child) {
            dirList.push(element)
            if (element.type === 'folder') {
                buildExplorer(element, dirList)
            }
        }
        return dirList
    }

    const loadFile = (project: Project) => {
        setProjectInfo(project)
        
        const folderInfoRaw: FolderInfo = {
            type: 'folder',
            name: 'root',
            child: [],
            depth: -1
        }
        for (const path in project.files) {
            buildFileInfo(folderInfoRaw, path.slice(1).split('/'), project.files[path])
        }
        setFolderInfo(folderInfoRaw)
        setExplorer(buildExplorer(folderInfoRaw, []))
    }

    useEffect(() => {
        (async () => {
            const result = await requestMsg({
                query: 'openProject',
                content: {
                    projectName: name
                },
                sessionKey: localStorage['sessionKey']
            }) as ServerResProject
            const original = result.content.project
            loadFile(original)
        })()
    }, [name])

    return (
        <div id="editor-container">
            <div id="path-controller">
                <input id="path-input" value={newDirectory??path}
                onFocus={() => { setNewDirectory(path) }}
                onChange={
                    (e) => {
                        setNewDirectory(e.target.value)
                    }
                }
                onBlur={
                    () => {
                        if (!projectInfo || !newDirectory) return
                        if (!directory.test(newDirectory)) {
                            alert('Error: Invalid directory\ndirectory should start with / and it must include . for file extension')
                            return
                        }

                        delete projectInfo.files[path]
                        projectInfo.files[newDirectory] = text
                        loadFile(projectInfo)

                        setFileName(newDirectory.split('/').at(-1)!)
                        const extension = fileName.split('.').at(-1)
                        setLang(language[extension!] ?? extension)
                        setPath(newDirectory)

                        setNewDirectory(null)
                    }
                }/>
                <button id="new-file" onClick={
                    () => {
                        if (!projectInfo) return
                        projectInfo.files[`/newFile${Object.keys(projectInfo.files).length}.txt`] = ''
                        loadFile(projectInfo)
                        setFileName(`newFile${Object.keys(projectInfo.files).length - 1}.txt`)
                        setText('')
                        setLang('plaintext')
                        setPath(`/newFile${Object.keys(projectInfo.files).length - 1}.txt`)
                        setOnFile('block')
                    }
                }>+</button>
                <button id="delete-file" onClick={
                    () => {
                        if (!projectInfo) return
                        delete projectInfo.files[path]
                        loadFile(projectInfo)
                        setFileName('')
                        setText('')
                        setLang('')
                        setPath('')
                        setOnFile('none')
                    }
                }>-</button>
            </div>
            <div id="explorer">
                <div id="project-name-wrapper">
                    {projectInfo?.name}
                </div>
                <div id="directory-container">
                    {explorer.map((v) => {
                        if (v.type === "folder") {
                            return (
                                <Directory
                                    name={v.name}
                                    depth={v.depth}
                                    action={() => { }}
                                />
                            )
                        }
                        return (
                            <Directory
                                name={v.name}
                                depth={v.depth}
                                action={
                                    () => {
                                        setFileName(v.name)
                                        setText(v.content)
                                        setLang(v.language)
                                        setPath(v.path)
                                        setOnFile('block')
                                    }
                                }
                            />
                        )
                    })}
                </div>
            </div>
            <div id="editor-wrapper" style={{ display: onFile }}>
                <Editor
                    height="100vh"
                    theme="vs-dark"
                    language={lang}
                    value={text}
                    onChange={(value) => {
                        if (!value || !projectInfo) return
                        projectInfo.files[path] = value
                        setText(value)
                    }}
                />
                열려 있는 파일이 없습니다.
            </div>
            <button id="save-button"
                onClick={async () => {
                    if (!projectInfo) return
                    const result = await requestMsg({
                        query: 'openProject',
                        content: {
                            projectName: name
                        },
                        sessionKey: localStorage['sessionKey']
                    }) as ServerResProject
                    const original = result.content.project
                    const changedFileInfo: Record<string, string | null> = {}
                    
                    for (const path in { ...original.files, ...projectInfo.files }) {
                        if (original.files[path] !== projectInfo.files[path]) {
                            changedFileInfo[path] = projectInfo.files[path] ?? null
                        }
                    }

                    requestMsg({
                        query: "saveProjectFiles",
                        content: {
                            projectName: name,
                            changedFiles: changedFileInfo,  
                        },
                        sessionKey: localStorage['sessionKey']
                    })
                }}
            >
                파일 저장
            </button>
        </div>
    )
}

export default ProjectFile