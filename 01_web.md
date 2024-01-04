# 01. Web 개요

>## API
>Application Programming Interface, 정의 및 프로토콜 집합을 사용하여 두 소프트웨어 구성요소가 서로 통신 할 수 있게 하는 메커니즘.

**<span style = 'background-color:#fff5b1'>어떠한 요청을 하면 반환을 내어주는 것</span>**

서버 Application, 클라이언트 Application 사이에서 클라이언트가 자신이 원하는 정보를 요청하면 서버는 자신이 가지고 있는 정보중 알맞은 정보를 응답으로 클라이언트에게 보내는 것이다.

*Ex)*
🙋🏻오늘의 미세먼지 수치는?
🧑🏻‍💻서버: 좋음 수준

해당 예에서 클라이언트가 "미세먼지 수치는?" 이라는 요청을 보냈고, 서버가 "좋음 수준" 이라는 응답을 내놓았다. 이렇듯 요청에 대한 응답 이다. 

>## REST API
>Reprsetaional State Transfer API, 클라이언트가 서버에 요청을 데이터로 전송하면 서버가 클라이언트의 입력을 사용하여 내부 함수를 시작하고 출력 데이터를 다시 클라이언트에 반환한다.
* 특징은 무상태 이며 서버가 요청간에 클라이언트의 데이터를 저장하지 않는다. 서버에 대한 클라이언트의 요청은 웹 사이트를 방문하기 위해 입력한 URL과 유사하다. 서버의 응답은 랜더링이 없는 일반 데이터 형태이다. 
* GET, PUT, POST, DELETE 등 동사 형태의 메소드들을 정의한다. 

- URI / URL
	
    - URI - uniform resource idedntifier, 자원 통합 식별자
    - URL - uniform resource Locator, 자원 통합 식별자 + 위치

예를 들어 fnek.com/category/cat/hello 라는 주소가 있다고 가정한다면 fnek.com은 장소 즉 Location이고,
fnek.com/category/cat/hello라는 장소 내의 지정 사항이 되는 것이다. 

다시, 이번에는 해당 URI에서 dog을 보고싶다면(이동하고 싶다면) fnek.com/category/dog/hello가 되는것이다. 

그렇다면, a라는 id를 가진 고양이를 get하기 위해서는 어떻게 바꿔야 하는 것인가?

/category/cat?id=a 형식으로 "?" 쿼리 파라미터를 사용하면 된다. 

----------------------
# 02. Web의 등장

작성한 문서를 인터넷에 올렸을 때 사람들이 열람할 수 있는 방법은 무엇일까?

<span style = 'background-color:#fff5b1'>웹 서버</span>에 문서를 <span style = 'background-color:#fff5b1'>웹 페이지</span> 형태로 올리게 된다.

그렇다면 웹서버와 웹 페이지, 웹 브라우저는 무엇인가?

웹 페이지는 컴퓨터가 읽을 수 있는 형태로 작성한 문서다. 이는 HTML이라는 특수한 언어로 작성되고 이를 다시 사람이 읽을 수 있도록 변환해주는 리더기가 웹 브라우저이다.
웹 서버는 작성된 웹 페이지를 다른 컴퓨터에서도 접근 할 수 있는 방법이 된다. 


## 웹 페이지
>컴퓨터가 내가 작성한 문서를 읽을 수 있도록 HTML, CSS, Java Script를 사용하여 작성한 페이지 이다. 
HTML은 문서에 해당하고, CSS는 문서의 서식(글꼴, 스타일 등), JS는 사용자와 컴퓨터의 이벤트(마우스 클릭, 키보드 누름 등)를 작성하여 동작 하게 된다.
CSS은 Cascading Style Sheet의 줄임말로, Cascading은 스타일의 우선순위를 정하는 것이다. <>태그를 통해 요소들을 나누고 나누어진 요소들의 각 스타일을 지정하게 되는데, 그때의 우선순위를 정하는 방식이다.   

## 웹 브라우저
>HTML, CSS,JS로 작성된 언어를 사람이 읽을 수 있도록 변환해 주는 리더기 역할을 한다.
이때 HTML이라는 문서와 그에 해당하는 서식인 CSS가 결합되면 Render Tree가 형성된다.
Render Tree는 HTML의 객체인 DOM과 CSS의 객체인 CSSOM이 결합되어 형성된다. 이 구조는 HTML이 변경될 때 마다 repaint된다. 

## 웹 서버
> 내 컴퓨터에 저장된 문서를 읽기 위해 A라는 다른 컴퓨터와 B라는 다른 컴퓨터가 접근한다고 가정하면, 요청한 정보 즉, 문서(웹 페이지)를 반환해주기 위해 통신을 하게 될 것이다. 문서를 제공한다는 측면에서 웹 페이지의 제공자가 웹 서버가 된다는 개념이다.

- Monolithic과 MSA
- Monolithic은 하나의 서버에 모든 비즈니스 요구사항을 다 넣은 것이고 MSA는 비즈니스 요구사항 마다 서버를 할당한 것이다.
- 커머스로 예를 들면, Monolithic은 결제 정보 서버가 다운 되면 하나의 서버이기 때문에 유저 정보도 다운 된다. 하지만 MSA는 결제 정보 서버가 다운 되어도 유저 정보 서버는 살아있게 된다. 하지만 MSA는 각 비즈니스마다 서버가 나누어져서 통신 하기 때문에 트랜잭션이 발생할 가능성이 있다.
----
# 03. 인터넷
## Intranet과 Internet


Intranet은 사내 네트워크로 외부망과 연결되지 않는다. Private NetWork라고도 불리며 주로 기업이나 대학, 연구기관과 같이 외부의 접속으로 부터 위험을 줄이고 정보의 유출을 막기 위해서 사용한다. VPN은 이를 가상으로 형성하여 사용하는 수단으로써 Virtual Private NetWork의 줄임말이다. 


Internet은 외부망으로써 사내가 아닌 다른 많은 사람들과 연결하는 방법이다. Intranet이 외부와 연결하기 위해서는 GateWay라는 일종의 톨게이트를 통하여 외부와 연결한다.

> 그렇다면 이렇게 많은 웹 서버의 주소를 우리가 외우고 있어야 접근이 가능할까?


답은 당연히 아니다.

우리는 naver에 접속하기 위해서 naver의 ip주소(Ex. 126.10.1.12)를 외워 접속하지 않는다. naver.com이라는 Domian name을 입력하여 접속한다.

그럼 또 한가지 질문이 생긴다. Domin name은 무엇인가?
쉽게 말해 ip 주소는 컴퓨터가 읽기 쉬운 주소이기 때문에, 이 주소를 사람이 읽기 쉬운 별칭으로 바꾼것이다.

>1. naver.com이라는 Domain name을 입력한다.
2. Domain name System을 통해 naver.com에 해당하는 ip 주소로 변환한다.
3. 변환된 ip주소를 되돌려 받는다.
4. ip 주소를 받은 웹 서버가 웹 페이지를 형성한다.
5. naver.com 웹 페이지가 보인다.

---
# 04.웹 검색 엔진

앞선 DNS의 설명에 의해 ip주소를 외우지 않아도 웹 페이지에 접속할 수 있다는 사실을 알게 되었다. 그렇다면, 그 Domain name을 다 알아야만 웹 페이지에 접근 할 수 있는가?
 알고자하는 내용의 일부분을 키워드로 접속하고자 하는 웹 페이지를 찾을 수는 없을까?

 _구글이 적절한 예시 이다._
 <span style = 'background-color:#fff5b1'>웹 크롤링</span>으로 웹 페이지들을 수집해 놓고, <span style = 'background-color:#fff5b1'>인덱싱</span>을 통해 상관관계별로 정리를 해놓다. <span style = 'background-color:#fff5b1'>검색엔진</span>이 내가 입력한 키워드에 따라 적절한 웹 페이지들을 전달해준다.

 예를 들어 vscode의 사용법에 대해 궁금한 것이 생겨 적절한 웹 페이지를 찾고 싶으면 구글 검생 창에 접속하여 "How to use vscode"를 입력하면 "Getting started with visual Studio Code"라는 머리글을 가진 공식 visual studio code 웹 페이지를 보여준다.

 그렇다면 질문이 생기게 된다. 수많은 정보를 가진 웹 페이지를 어떻게 잘 검색하고, 혹은 내가 올려놓은 웹 페이지를 어떻게 상위에 노출시키고, 접근에 용이하게 만들 수 있을까?
 

 ## SEO 전략
 👉🏻[구글 검색 엔진 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko)
 
1. 좋은 내용에 대한 좋은 콘텐츠
    > - 인덱싱 작업이 이루어질 때 해당 웹페이지의 내용에 대한 검토가 이루어진다. 새롭고 좋은 내용의 콘텐츠를 포함하고 있는 것이 좋다.
2. Semantic HTML
    >- 비의미적인 요소의 태그를 활용하는 것이 아닌 [form], [table], [article]등 명확한 의미를 지닌 태그들을 활용해야한다.
3. 키워드 및 메타 태그
   > - meta 태그와 키워드를 활용하여 웹 페이지에 대한 함축적인 의미를 잘 담아야 한다.
4. 성능 Preformance Metrics
    >- Load Time: 페이지가 로드되는 시간
    >- First Contentful Paint: 첫 요소(이미지)가 로드되는 시간
    >- Largest Contentful Paint: 가장 큰 요소(이미지)가 로드되는 시간
    >- Total Blocking Time: 사용자 입력에 대해 페이지가 응답하지 못하도록 차단되는 시간
    >- Time to Interative: 페이지가 완전하게 상호작용할 수 있을 떄까지 걸리는 시간
    >- First Iuput Delay: 첫 번째 입력과 페이지의 응답 시간
5. 웹 표준과 웹 접근성
   > - 표준: 웹에서 권고하는 표준적으로 사용되는 규칙과 기술
   >- 접근성: 장애, 사용 환경 등을 떠나 페이지에 동일하게 제공될 수준
---

# 05. Web Server

## 정적 웹 페이지
>저장된 그대로 사용자에게 전달되는 웹 페이지. 서비스 되는 페이지에 변화가 없고 저장된 그대로 표출된다.

1. 웹 페이지를 요청한다.
2. 저장 혹은 만들어져 있는 웹 페이지를 반환한다.

## 동적 웹 페이지
>사용자가 요청을 할 때 생성되는 웹 페이지. 사용자가 웹 서버에 요청을 하게 되면 웹 서버는 Application에 요청을 하게 되고 Application은  DataBase에 정보를 요청하고, 연산을 진행하여 Application에게 반환을 한다. 반환 받은 것을 Application이 웹 서버에게 요청에 맞는 응답을 전달하고 웹 서버는 웹 페이지를 사용자에게 생성하여 보여준다. 

다시 정리 하면
1. 사용자 ---(request)--> 웹 서버
2. 웹 서버 ---(request) ---> Application
3. Application 데이터 베이스 접근, 요청, 연산, 반환
4. Apllication ---(response)---> 웹 서버
5. 웹 서버 ---(response)--->사용자

> 웹 페이지가 생성되는 시기의 초점을 맞춘 개념이다.
> 정적: 이미 생성되어있음 / 동적: 요청을 받으면 반환으로 생성

이때 웹 서버와 Application을 연결하는 기술을 <span style = 'background-color:#fff5b1'>CGI(Common Gateway Interface)</span>라고 한다. 

초기의 CGI는 Stateless하였으며, 하나의 요청에 대하여 하나의 프로세스가 동작하였다.
    
그 후 등장한 FCGI, WCGI 등이 있는데,
FCGI는 웹 서버와 CGI의 통신간 발생되는 부하를 줄여 한 번에 더 많은 웹 페이지 요청을 관리 할 수 있도록 발전 하였다.
WCGI는 요청이 들어오게 되면 새로운 프로세스를 생성하는 단점을 보완하기 위해 고안되었으며 요청에 대한 정보를 함수나 객체로 처리하는 방식이다.

PHP는 Personal Home Page Tools에서 Hypertext Preprocessor로 의미가 변경된 약자로 사용된다. 대표적인 서버 사이드 스크립트 언어(후에 설명하겠다.)이다.

## WAS(Web Application Server)

>스크립트 언어의 한계를 극복하기 위해 객체지향 프로그랭 언어인 Java를 도입한 개념으로
웹 서버와 Application을 한데 모은 웹 서버 어플리케이션 이다.

1. 사용자 ---(repuest)---> WAS
2. WAS 연산
3. WAS ---(response)---> 사용자

Tomcat의 등장으로 하나의 요청에 하나의 프로세스가 동작하는 방식에서 하나의 요청에 하나의 스레드가 동작(servlet단위)하는 방식으로 변화하게 되었다.

---
# 06. 웹 페이지 서빙 방식


## SSG(Static Site Generation)
>정적 웹 페이지를 서빙하는 방식으로 미리 만들어져 있는 웹 페이지를 요청이 들어오면 반환하는 방식이다. 

## MVC(Model - View - Controller)
> Model은 데이터에 대한 조작과 조회를 의미하고, View는 Model을 기반으로 만들어진 웹 페이지, Controller는 요청을 받고, 연산을 하고, 반환을 하는 것이다.

동적 웹 펩이지를 만들기 위해서는 두 가지가 필요하게 되는데 반복적인 ViewTemplate과 Data다.
데이터 베이스에서 Model을 조회하고 View를 만들어 Controller가 반환한다. 

그렇다면, Application이 view Tempelate과 일부 정보 변경에 대해 동적으로 웹 페이지를 서빙하는 방식에는 어떤 것들이 있는가?
## SSR(Server Side Rendering)
>Template 엔진 즉, Application이 웹 서버 측에 있어 서버가 동적 웹 페이지를 반환하는 것이다.
요청을 받게 되면 Application이 서버 측면에 있기 때문에 DataBase에 접근하여 HTML 즉, 웹 페이지를 서빙한다. 그렇기 때문에 SEO가 좋고 데이터 덩어리들을 옮기는 것이 아닌 웹 페이지를 반환하기 때문에 상대적으로 가볍다.

## CSR(Client Side Rendering)
>Template 엔진 즉, Application이 웹 브라우저 측에 있어 브라우저가 동적 웹 페이지를 반환하는 것이다. 
요청을 받게 되면 Application이 브라우저 측면에 있기 때문에 반환으로 JSON 즉, 데이터들을 받아와서 브라우저에서 웹 페이지를 반환한다.
그렇기 때문에 SEO가 좋지 않고(불가능 하고) 상대적으로 무겁다. 하지만 데이터를 가져오고(Initial Loading) 나면 웹 페이지를 만들어 반환하는 속도가 빠르다.

----
 👉🏻[실습 내용](https://www.notion.so/1-19ddba5fc4bc4d2da95641b37f4c9cd2)
