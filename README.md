# vedi
very efficient develop implement.
for IDEV.

# first thing you should do

## node_modules 다운로드

```sh
npm run set
```

터미널에 위와 같이 입력하면 알아서 다운로드 해줌

## 없는 파일 생성

- .env: api key 있는 파일
- log/project.log: 로그 관리 파일

생성하기

## 규칙 읽어보기

아래 규칙을 읽어보세요.

# rules

## common rules

push 하기 전에 pull 먼저\
자기가 바꾼거 있으면 commit msg에 적고, 카톡방에도 올리기

## coding style

4칸 space indent\
줄바꿈 CRLF\
변수이름 알아볼 수 있게 짓기\
네이밍과 코딩스타일 일관적으로

## js/ts

세미콜론 안 씀\
문자열 쓸 때 single quote\
var 지양\
built-in 쓸 때 window.func() 처럼 window 붙이기\
npm 사용

```js
alert('DO NOT USE LIKE THIS')
window.alert('USE LIKE THIS') //use global instead of window at node.js
```

https://standardjs.com/rules-kokr.html

## html

client 폴더에만 생성

기본 템플릿

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VEDI</title>
</head>
<body>
    
</body>
</html>
```

## css

css 파일보다는 @emotion/react module 이용하기를 권장함

```tsx
/*example*/
import { css } from '@emotion/react';

const Page = () => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
        `}>
            <p>로그인</p>
            <label>ID: <input /></label>
            <label>PW: <input type="password"/></label>
        </div>
    )
}

export default Page;
```

한 번 사용하는 element는 무조건 id 쓰기