import { css } from '@emotion/react';
import React from 'react'

const App = () => {
    return (
        <div css={css`
            border: none;
            
        `}>
        <header className="App-header">
            <p>
            Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

export default App;