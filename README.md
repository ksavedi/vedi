# vedi
very efficient develop implement.

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
var 지양\
built-in 쓸 때 window.func() 처럼 window 붙이기

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

한 번 사용하는 element는 무조건 id 쓰기