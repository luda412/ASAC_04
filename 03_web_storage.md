# 01. Stateless VS Stateful

[앞선 글](https://velog.io/@luda412/01.-웹-구성과-흐름)에서 CGI를 설명하며, "초기의 CGI는 stateless 하였다." 라고 하고 설명을 덧 붙이지는 않았다. 이번 글에서 Web storage에 대해 다룰 예정이기 때문에 stateless와 stateful의 개념을 간략하게 설명하고 Cookie와 Session에 대해 알아보겠다.

>- statelss: 불연속성, 무상태성, 웹 서버 입장에서는 매 요청이 어떤 웹 브라우저에서 비롯된 것인지 알 수가 없다.
>- stateful: 연속성, 상태성, 웹 서버 입장에서 어떤 웹 브라우저에서 들어온 요청인지 알 수 있다. 

가장 흔한 예시는 로그인 계정 정보가 있다. 예를 들어 로그인 계정 정보의 흐름을 stateless하게 처리 된다면, 우리는 사실 로그인을 한 의미가 없을 것이다.

_왜?_ 

로그인을 했음에도 불구하고 웹 서버는 불연속하여 요청을 할 때마다 누구인지 물어봐야 할 것이다. 
반면 stateful하면 우리가 일상에서 사용하듯이 최초 로그인을 하면 많은 작업과 요청을 보내도, 어느 계정에서 들어온 요청이구나 하며 연산을 하고 반환을 해 줄 것이다.

---
# 02. Cookie
웹 서버가 최초의 응답 반환 시 요청자 정보를 포함하여 반환하고 웹 브라우저가 웹 서버에 요청을 보낼 때 마다 받은 요청자 정보를 마치 주민등록번호 처럼 사용한다면 연속성을 가지지 않겠는가?

>- Cookie: 요청자의 정보를 <span style = 'background-color:#fff5b1'>웹 브라우저</span>에 저장한다. 마치 HTTP Cache를 Cache-control 응답 헤더로 제어하는 것 처럼 Set-Cookie를 통해 웹 서버의 제어를 받는다.
>- Session: 요청자의 정보를 <span style = 'background-color:#fff5b1'>웹 서버</span>에 저장, 다만 웹 브라우저 쿠키에 Session을 식별할 수 있는 Session_id를 저장한다.

정보 저장을 브라우저에 하는지, 서버에 하는 지가 주요 차이점이다.

## Cookie 사용 기준
웹 브라우저에 담겨 있는, 예를 들어 요청자 정보를 어떠한 요청에 실어 웹 서버로 보낼지를 정한다.
<strong>Domain + Path로 정한다.</strong> 
A.com 안에는 /cart가 있을 수 있고, /buy가 있을 수 있고, /add가 있을 수 있다. 
cart를 담당하는 웹 서버라면 웹 브라우저에게 이렇게 명시하는 것이다. "나를 불러서 이용하고 싶으면 쿠키에 <span style = 'background-color:#fff5b1'><strong>A.com(Domain)/cart(Path)</strong></span>을 이용해서 호출해."

## Cookie 유효 기간
웹 브라우저 내에 해당 Cookie를 얼마 동안 저장 할 것인가를 정한다. 이는 유효 기간을 명시하는 경우와 명시 하지 않는 경우로 나뉜다.

>- 명시된 경우: Persistent Cookie - MaxAge나 Expires로 유효한 기간을 설정한 경우이다.
- 명시되어 있지 않은 경우: Session Cookie - 웹 브라우저가 열려(connect)있는 동안만 유지되고 닫히면(disconnet) 유효하지 않은 경우이다. 

다시, Presistent Cookie 처럼 유효기간을 명시한 경우에는 웹 브라우저를 닫아도 쿠키가 유효하지만, 명시되어 있지 않은 경우에는 웹 브라우저가 닫히면 해당 쿠키도 유효하지 않게 된다. 

## Cookie 보안


> 1. HttpOnly: JavaScript를 사용하여 쿠키를 조작하지 말 것을 명시한다.
> 2. Secure: https에서만 쿠키를 사용할 것을 명시한다. http 통신에서 쿠키를 탈취 당할 것을 방지할 수 있다.
> 3. SameSite: 같은 Domain에서만 쿠키를 전송할 것을 명시한다. 다른 Domain 즉, Cross-Origin에서 쿠키가 탈취 당할 것을 방지 할 수 있다.

## Cookie의 단점
앞서 Cookie를 저장하는 장소는 웹 브라우저임을 설명하였다.
웹 브라우저에 저장하다 보니 <span style = 'background-color:#fff5b1'>민감한 정보</span>를 저장함에 있어 안전을 보장받을 수 없다. 또한, 웹 브라우저에 저장하다보니 <span style = 'background-color:#fff5b1'>웹 브라우저간 공유</span>가 불가능하다.
그리고 Domain + Path가 일치하면 해당 웹 서버로 모든 쿠키를 보내다 보니 <span style = 'background-color:#fff5b1'>정보량이 많아질 수록</span> 요청에 실어 보낼 data들이 커지게 된다.

---
# 03. Session
Cookie는 웹 브라우저에 정보를 저장하지만 Session은 <span style = 'background-color:#fff5b1'>웹 서버</span>에 정보를 저장한다. 하지만 Session을 사용한다고 해서 Cookie를 사용하지 않는 것은 아니다. Cookie에 Session을 조회하기 위한 <strong>Session_id</strong>를 저장한다. 즉 웹 서버에 정보를 저장하는 Session을 조회하기 위한 일종의 이름표를 쿠키에 저장하는 것이다.

다시, 쿠키는 data 자체를 <span style = 'background-color:#fff5b1'>웹 브라우저</span>에 저장. Session은 data를 <span style = 'background-color:#fff5b1'>웹 서버</span>에 저장하고, data를 찾기 위한 <strong>Session_id</strong>를 쿠키에 저장한다.

## Session의 장점
쿠키에 담아 안전을 보장 받기 어려웠던 민감 정보들을 서버에 저장하기 때문에 안전성이 높고, 웹 브라우저간 공유가 가능하다. 
매 요청마다, Session_id를 통해 정보를 조회하는 작업이 필요하기는 하지만 쿠키처럼 요청안에 많은 data들이 담겨오는 것이 아니기 때문에 쿠키와 비교하였을 때 상대적으로 요청에 대한 방해가 없다.

## Session의 단점
> - 웹 서버 측에 data를 저장하기 위한 별도의 DataBase가 필요하다.
> - 매 호출 마다 쿠키에 담겨온 Session_id를 조회해야하기 때문에 조회에 걸리는 시간을 컨트롤 해야한다.
> - 저장소를 웹 서버측에서 사용하기 때문에 비용과 확장성에 대한 이슈를 해결해야 한다.

---
# 04. Storage
Stateful HTTP를 위한 기술은 아니다.
이를 사용하는 이유는 유저에 의해 옵션 상태가 변경되어 조회가 필요할 때 사용하며, 쿠키가 웹 브라우저 저장소로 사용되는 것을 방지한다. 기간을 명시하여 data를 사용할 수 없다.

- Local Storage: 웹 브라우저 창이 닫힌다해도 영구적으로 저장된다. 용량 이슈가 발생할 수 있다.
- Session Storage: 웹 브라우저 창이 닫히면 저장된 data가 삭제된다. 

쿠키와 비교를 해보면, Storage는 <span style = 'background-color:#fff5b1'>웹 브라우저에서만</span> 사용할 목적의 <span style = 'background-color:#fff5b1'>큰 정보</span>들을 <span style = 'background-color:#fff5b1'>만료기간</span>을 설정하지 않고 저장할 수 있다.
반면 Cookie는 <span style = 'background-color:#fff5b1'>웹 서버에게 반복적</span>으로 전달할 <span style = 'background-color:#fff5b1'>작은 정보</span>들을 <span style = 'background-color:#fff5b1'>만료기간</span>을 설정하여 저장한다.

저장 가능 용량은 Storage는 약 10MB, Cookie는 약 4KB이다. 또한, Cookie는 지정된 Domain + Path에 유효하였지만 Storage는 지정된 Domain내 모두 유효하다. 즉, 앞선 Cookie의 예를 빗댄다면 Cookie는 A.com/cart에 유효하였지만, Storage는 A.com 안의 모두에 유효한 것이다. 

---

👉🏻[실습 내용:Set-Cookie Header 분석(MaxAge, Expires, Session), 퍼스트 파티 쿠키와 서드파티 쿠기 분석](https://www.notion.so/3-7f1bce871f3646bdac6abffd778c68dd)