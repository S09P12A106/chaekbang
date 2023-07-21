import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	
  // 폰트 순차적으로 선택 > 추후 폰트 바꾸겠습니다.
	* {
    font-family: 'Pretendard', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

  // 리스트의 동그라미 지운다.
  ul, ol {
    list-style: none;
  }

  // 링크에 밑줄 없앤다. link에도 적용됨
  a {
    color: inherit;
    text-decoration: none
  }

  // 링크 및 버튼에 마우스 올리면 손가락 모양
  a,
  button {
    cursor: pointer;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
  }


  // 전체 컨테이너 가로 넓이
  .container {
    max-width: 960px; 
    margin: 0 auto;
  }

`

export default GlobalStyle
