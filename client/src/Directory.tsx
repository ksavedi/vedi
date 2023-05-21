/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react"

interface DirectoryProps {
    name: string;
    depth: number;
    action: () => void;
}

const Directory: React.FC<DirectoryProps> = (props) => {
    return (
        <div
            css={css`
                margin-left: ${props.depth * 10}px;
            `}
            onClick={props.action}>
            {props.name}
        </div>
    )
}

export { Directory }