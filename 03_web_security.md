# 01. HTTPS and Key

## HTTPS와 Key
HTTPS(HyperText Transfer Protocol Secure)는 HTTP의 보안 버전이다. 중요한 데이터를 전송할 때 사용자의 데이터가 노출되거나, 탈취되는 것을 방지하기 위한 방법이다.
HTTPS는 암호화 프로토콜을 사용하여 통신을 암호화 한다. 암호화 프로토콜은 TLS(Transport Layer Security)라고 불리며 <span style = 'background-color:#fff5b1'>비대칭키, 공개키</span>를 사용하여 통신을 보호한다.

- 개인키: <strong>하나의 서버만</strong> 사용 가능하며 비공개키 이다. 
- 공개키: <strong>다수의 클라이언트</strong>들이 모두 사용할 수 있는 키, 공개키로 암호화 된 키는 개인키로 복호화할 수 있다. 

## CA
만약 하나의 서버만 사용 가능한 비공개키(개인키)를 탈취당하여 마치 그 서버인 것처럼 모든 요청을 받는다면 굉장히 위험할 것이다. 
_왜?_ 
사용자의 정보들을 다 열어 볼 수 있기 때문이다.
그렇기 때문에 이게 진짜 서버의 비공개키임을 인증할 수 있는 수단이 필요하다. 이를 <strong>CA</strong>에서 한번 더 암호화를 통해 해당키가 진짜 서버의 비공개키임을 인증한다. 웹 브라우저는 CA를 통해 해당 서버의 비공개키가 인증되었는지 확인하여 보안을 강화 한다.

>흐름을 설명하자면 이런 방식이다.
1. 웹 서버가 사이트 정보와 <span style = 'background-color:#FFE6E6'>사이트의 공개키</span>를 CA에게 전송한다.
2. CA는 사이트 정보를 검증 한 다음 CA의 <span style = 'background-color:#fff5b1'>개인키</span>로 사이트 정보와 사이트 <span style = 'background-color:#FFE6E6'>공개키를 암호화</span> 한다.
3. 2과정에서 암호화 된 것을 <span style = 'background-color:#C0FFFF'>인증서</span>라 하며 이를 웹 서버에게 전달한다.
4. CA는 <span style = 'background-color:#fff5b1'>공개키</span>를 웹 브라우저에게 제공한다.
5. 이 과정을 지나고 웹 브라우저는 웹 서버에게 통신에 대한 요청을 보낸다.
6. 웹 서버는 요청에 대한 반환으로 인증서(CA의 개인키로 암호화한 사이트 정보 + 사이트 공개키)를 웹 브라우저에게 준다.
7. 웹 브라우저는 CA에게 받았던 <span style = 'background-color:#fff5b1'>공개키</span>로 인증서를 복호화 한다.
8. 복호화 하여 얻은 사이트 공개키로 <span style = 'background-color:#E6E6FA'>세션키</span>를 암호화 하여 웹 서버에게 전달한다.
9. 웹 서버는 사이트의 개인키로 복호화하여 세션키를 얻는다.
10. <span style = 'background-color:#E6E6FA'>세션키</span>를 암호화하여 통신을 진행한다.

이렇게, CA의 공개키와 개인키로, 서버와 브라우저의 통신에서 키를 탈취 당하는 Man In The Middle 공격의 위험성을 방지한다.

### Man In The Middle Attack
네트워크 통신을 조작하여 중간자가 공경하는 방법이다. 중간자 공격은 통신을 연결하는 두 주체 사이에 침입하여 두 주체는 서로 연결되었다고 생각하지만, 실제로는 두 주체 사이에 중간자에게 연결되어 있으며 중간자가 한쪽에서 전달된 정보(쿠키 등)를 탈취 혹은 조작하여 다른 쪽으로 전잘하는 방법이다. 이를 방지하기 위해 위에서 설명한 CA가 TLS 공개키를 기반으로 한 인증을 사용하는 것이다.

---
# 02. Same-site

Site Domain: 현재 내가 보고 있는 웹 페이지의 Domain
Cookie Domain: 저장된 쿠키의 Domain

쿠키는 현재 내가 보고있는 웹 페이지의 Domain이 저장된 쿠키의 Domain과 일치할 때의 경우, 현재 내가 보고 있는 웹 페이지의 Domain이 저장된 쿠키의 Domain과 일치 하지 않는 경우에 대해 보안 정책을 마련한다.

- First-Party Cookie: Site Domain과 Cookie Domain이 <span style = 'background-color:#fff5b1'>일치할 때</span>를 말한다. 현재 Domain에서 필요에 따라 설정한 쿠키이다.

- Third-Party Cookie: Site Domain과 Cookie Domain이 <span style = 'background-color:#fff5b1'>일치하지 않을 때</span>를 말한다. 많은 웹 페이지들을 오가며 작업을 수행하는 googleAnalytics 처럼 다른 Domain에서 쿠키를 발행하는 것이다.

## Same-site
Same-site는 말 그대로 같은 site의 요청일 때만 쿠키를 전송하는 것이다. 다시, First-Party Cookie일 때만 쿠키를 전송하는 것이다. 그렇다면 이는 왜 필요할까? googleAnalytics 처럼 많은 웹 페이지들을 오가면서 요청을 전송하고 쿠키를 받으면 User Experience가 더욱 향상되지 않을까?

하지만, 이는 쿠키가 탈취되어 원하지 않은 정보 노출에 취약하다. 아래에서 설명할 <span style = 'background-color:#fff5b1'>CSRF</span>를 통해 쿠키가 노출 되는 것을 방지하기 위한 일종의 테두리라고 생각하면 편하겠다.

하지만, 이미지와 같이 다른 Domain에 올려져있는 Resource들을 참조하기만 혹은 Link를 타고 가져오기만 하는 등의 수행도 제한 한다면 상당히 불편할 것이다.
그렇기 때문에 Third-Party Cookie가 요청에 담겨 전송되는 것을 방지하기 위해 정도를 명시한다.

>- Strict: Same site의 쿠키 전송만을 허용한다.
- Lax: Cross site 쿠키라도 서버의 성태를 병경하지 않는 method의 선에서는 허용한다.
- None: Same site이던, Cross site이던 상관하지 않고 모두 허용한다.

---
# 03. CSRF(Cross-Site Request Forgery)
실제로 유저가 의도하지 않은 요청을 서버에 보내는 것이다. 예를 들어 A사이트에서 A라는 버튼이 실제로는 단순 이미지를 누르는 이벤트이다. 하지만, 누군가 악의적으로 이벤트를 추가하여 A버튼을 누르면 B사이트에 의도하지 않은 요청을 보내는 것이다. 이는 웹 브라우저에서만 가능한 것이 아니라 Native app에서도 가능하다.

앞서 설명한 Same-site는 CSRF자체를 방지 하는 것이 아니라 CSRF를 통해 쿠키가 탈취되는 것을 방지한다. Cross site에 대해서 쿠키를 제한한다면 쿠키의 노출을 막을 수는 있지만 악의적인 이벤트 발생 그 자체를 막을 수 있는 것은 아니다. 그렇다면 이를 방지 하기 위해서 어떤 방법이 있는가?

## CSRF Token
임의의 난수를 생성하고 <span style = 'background-color:#fff5b1'>세션</span>에 저장한다. 그리고 매 사용자의 요청에 해당하는 난수 값을 포함 시켜 전송하는 것이다. 이는 요청을 받을 때 마다 세션에 저장된 토큰값과 요청을 보내온 토큰의 값이 같은지 검사를 통해 의도하지 않는 다른 이벤트의 발생을 막는 것이다.

---
# 04. CORS(Cross Origin Resource Sharing) and SOP(Same Origin Policy)

## CORS
웹 브라우저에서 자바스크립트 AJAX를 통한 CSRF를 방지한다. 즉, 크로스 사이트에 대한 악의적인 요청을 부분적으로 방지하는 것이다. 하지만 AJAX가 아닌 Form을 통한 POST 요청은 방어가 불가능 하기때문에 Native app 같은 경우는 CSRF Token을 통해 방어한다.
또한, 이는 웹 브라우저 정책이기 때문에 서버간 통신에는 CORS 이슈가 발생하지는 않는다.

- AJAX란? 비동기로 작동하며 웹 페이지 전체를 다시 로딩하지 않고 일부분만 갱신할 수 있다.

이러한 CORS는 서버가 브라우저로부터 어떠한 요청을 받을지 3가지의 CORS 헤더 설정으로 호출이 가능한 요청을 제약한다.

### 서버측 CORS 헤더 설정
- 1. 허용된 Origin
웹 브라우저가 Origin (A.com) 이라고 요청에 담아 보내고 그에 대한 서버의 응답으로 Access-Control-Allow-Origin A.com이 온다면 해당하는 Resource를 사용가능하다.

- 2. 허용된 Method
웹 브라우저가 Access-Control-Request-Method GET 이라고 요청에 담아 보내고 그에 대한 서버의 응답으로 Access-Control-Allow-Method GET을 보내는 방법이다.

- 3. 허용된 Header
웹 브라우저가 Access-control-Request-Headers 를 요청에 담아 보내고 그에 대한 서버의 응답으로 Access-control-Allow-Headers를 보내는 방법이다.

반면 브라우저는 서버가 3가지의 CORS 설정을 알기 위해 서버에게 호출을 통해 알아내게 된다. 

### 브라우저측 요청

- Simple Request
서버의 상태를 변화 시키지 않고 조회하는 요청을 보낼 떄의 방법으로 예를 들어 GET, HEAD가 있으며 허용된 Origin을 체크하는 것이다. 브라우저가 서버에게 원 요청을 보내면 "CORS 헤더"와 함께 "반환 받은 결과 값"이 CORS 헤더와 부합 하지 않으면 브라우저가 해당 값을 폐기한다.

- Preflight Request
서버의 상태를 변화시키는 요청을 보낼 떄의 방법으로 예를 들어 POST, PATCH, PUT 등이 있으며 허용된 Origin과 허용된 Method, 허용된 Header를 체크하는 것이다. 브라우저가 서버에게 원 요청을 보내기 전에 Option이라는 임시요청을 보낸다. 이를 받은 서버는 반환으로 CORS 헤더만 보내준다. 브라우저는 보내고자 했던 요청과 CORS 헤더가 부합하지 않으면 서버의 상태 변경 요청을 보내지 않는다. 또한, 요청을 매번 검증할 수는 없으니 Acces-Control-Max-Age로 캐시가 가능하다.

## SOP
SOP는 웹 브라우저 보안 정책으로 모든 HTTP 요청은 기본적으로 SOP를 따르며, Same-Origin에서만 resource를 가지고 오는 것을 명시한다.

Same Origin은 예를 들어 https://www.A.com:8080 이라면
>- Scheme = https://
- Host = www.A.com
- Port = 8080
위 3가지가 모두 같아야 Same-Origin이다.

하지만, 앞서 설명했듯이 외부에서 정보를 가져올 상황이 존재한다. 그래서 Cross-Origin에 대해 가져오기, 제출하기 등 의도된 서버의 상태를 변화시키지 않는 요청과 동작은 부분적으로 허용한다.

>1. Cross Origin 가져오기: GET은 서버의 상태를 변경하지 않는다.
2. Cross Origin 제출하기: FORM은 유저가 의도한 제출이다.
3. Cross Origin 요청하기: POST, DELETE 서버 상태가 변경되기 때문에 위험성이 존재한다. 그래서 SOP에서 불허한다.

하지만, CORS를 통해 AJAX는 CSRF의 부분적인 방어가 가능하다고 설명하였다. AJAX를 막게 되면 모든 API호출이 사실상 불가능하다. 그래서 SOP를 보완하여 CORS 정책에 맞을시 AJAX는 위와 같이 SOP를 위반하여도 조건부 허용을 해준다.

---
👉🏻[실습 내용: Set-Cookie Header 분석(MaxAge, Expires, Session), 퍼스트 파티 쿠키와 서드파티 쿠기 분석](https://www.notion.so/3-7f1bce871f3646bdac6abffd778c68dd)