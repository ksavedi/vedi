import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { requestMsg } from './post'
import { ServerResProject } from '../../interface/serverRes'
import { Project } from '../../class/project'

import "./ProjectInfo.css"
import { Editor, useMonaco } from '@monaco-editor/react'
import { Directory } from './Directory'

interface FileInfo {
    type: "file";
    name: string;
    content: string;
    depth: number;
}

interface FolderInfo {
    type: "folder",
    name: string;
    child: (FolderInfo | FileInfo)[];
    depth: number;
}

const buildFileInfo = (curDir: FolderInfo, path: string[], value: string, depth = 0) => {
    const dirName = path[depth]
    if (dirName.includes(".")) {
        curDir.child.push({
            type: "file",
            name: dirName,
            content: value,
            depth
        })
        return
    }
    if (curDir.child.findIndex((v) => v.name === dirName) === -1) {
        curDir.child.push({
            type: "folder",
            name: dirName,
            child: [],
            depth
        })
    }
    buildFileInfo(curDir.child.find((v) => v.name === dirName) as FolderInfo, path, value, depth + 1)
}

const ProjectInfo = () => {
    const name = useParams().name as string
    const monaco = useMonaco()

    const [projectInfo, setProjectInfo] = useState<Project>()
    const [folderInfo, setFolderInfo] = useState<FolderInfo>({
        type: "folder",
        name: "root",
        child: [],
        depth: -1
    })
    const [explorer, setExplorer] = useState<(FolderInfo | FileInfo)[]>([])
    const [lang, setLang] = useState("typescript")
    const [text, setText] = useState("")

    const buildExplorer = (curDir: FolderInfo, dirList: (FolderInfo | FileInfo)[]) => {
        for (const element of curDir.child) {
            dirList.push(element)
            if (element.type === "folder") {
                buildExplorer(element, dirList)
            }
        }
        return dirList
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
            const { project } = result.content
            setProjectInfo(project)

            const folderInfoRaw: FolderInfo = {
                type: "folder",
                name: "root",
                child: [],
                depth: -1
            }
            for (const path in project.files) {
                buildFileInfo(folderInfoRaw, path.slice(1).split("/"), project.files[path])
            }
            setFolderInfo(folderInfoRaw)
            setExplorer(buildExplorer(folderInfoRaw, []))
        })()
    }, [name])

    return (
        <div id="editor-container">
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
                                        setText(v.content)
                                        setLang("typescript" /* v.name */)
                                    }
                                }
                            />
                        )
                    })}
                </div>
            </div>
            <div id="editor-wrapper">
                <Editor
                    height="100vh"
                    theme="vs-dark"
                    language={lang}
                    value={text}
                />
            </div>
        </div>
    )
}

export default ProjectInfo