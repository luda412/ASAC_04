## 01_week 크롬 개발자 도구를 통해 CSS, HTML(DOM), JS 영향 확인 및 디버깅
- [실습 노션: 웹 페이지 구조 파악](https://www.notion.so/1-19ddba5fc4bc4d2da95641b37f4c9cd2)
  - HTML과 CSS 작성을 통해 Cascading의 의미 파악
  - naver의 웹 페이지에서 HTML과 CSS 살펴본 후 CSS 파일 삭제
  - 웹 페이지 JS 영향 확인, Disable JS 실행
  - 웹 페이지 DOM 조작하여 cover_title 변경
  - 크롬 개발자 도구로 웹 페이지 LightHouse 성능 확인
- [velog: 웹 구성과 흐름](https://velog.io/@luda412/01.-웹-구성과-흐름)
  - Web 개요
  - Internet과 Intranet, DNS
  - SEO 전략
  - CGI
  - SSG, SSR, CSR

----

## 02_week 크롬 개발자 도구를 통해 status code 분석, CDN 캐싱 분석
- [실습 노션: 웹 페이지 별 캐시 사용 예시](https://www.notion.so/2-status-code-CDN-13177547af084aa69701f526dd7bb8fb)
  - 크롬 개발자 모드로 웹 페이지의 Status code 분석
  - 웹 페이지의 HTTP Resources를 CDN 캐싱으로 가져오는 예시 분석
- [velog: 웹 성능 개선 및 부하 완화](https://velog.io/@luda412/02.-웹-성능-개선-및-부하-완화)
  - HTTP Cache
  - Server Cache
  - Proxy와 CDN
  - 결과 반환 시점
  - Header Settins

----

## 03_week Set-Cookie Header 분석, 퍼스트 파티 쿠키와 서드 파티 쿠키 분석
- [실습 노션: 웹 브라우저 Cookie](https://www.notion.so/3-Set-Cookie-Header-MaxAge-Expires-Session-7f1bce871f3646bdac6abffd778c68dd)
  - 크롬 개발자 모드로 Set-Cookie Header 분석 (Expires & Max-Age 확인, Session으로 담긴 값 분석)
  - Local Stroage와 Session Storage
  - HttpOnly 활성화
  - First-party Cookie & Third-party Cookie (GoogleAnalytics)

- [velog: web_storage](https://velog.io/@luda412/03.-웹-저장소)
  - Stateless VS Stateful
  - Cookie
  - Seesion
  - Storage

- [velog: web_security](https://velog.io/@luda412/웹-보안)
  - HTTPS
  - Same-site
  - CSRF
  - CORS & SOP 

----

## 04_week Git Conflict 및 파일 조작 시나리오
- [실습 노션: Local repository](https://www.notion.so/4-Git-Conflict-05ee99ce2753444c9df0a12d8b331fd0)
  - Git 시작 및 First Commit
  - Amend & Rebase
  - Conflict 해결

- [velog: 버전_관리를_위한_통합](https://velog.io/@luda412/04.-버전-관리를-위한-통합과-배포)
  - Local VS Remote
  - Branch
  - Working Directory
  - 파일 조작 시나리오
----

## 05_week JS 문법 및 엔진 작동 원리
- [실습 노션: Function, Object, Parameter](https://www.notion.so/5-Java-Script-23a0e2dc4b7a439981d8efc1bcdee1be)
  - 함수 정의 및 사용 (Declaration, Expression, Hoisting, Arrow function)
  - 함수 전달 형태 (값 반환 형태)
  - ES6+ 문법 객체 (Destructure, Property Initializer Shorthand, Computed Named Property)
  - ES6+ 문법 함수 (Spread Syntax, Rest Parameter, Default Parameter, Currying, Trailing Comma)

- [velog: Java Script Engine & Function](https://velog.io/@luda412/Java-Script-기본-문법)
  - Java Script 엔진 실행 과정
    - Memory Heap
    - Call Stack
  - Creation & Complie Phase
  - Declaration & Expression
  - Arrow Funtion

---

## 05_week_Plus JS Callback 및 Promise
- [실습 노션: 예외 처리와 Promise](https://www.notion.so/5-JS-ES6-90377060793948b4afd21ce1c57c291b)
  - Includes
  - Spread Syntax
  - 예외 처리
  - For of / in
  - Nullish Coalescing
  - Callback (Callback Hell)
  - Promise (사용시 주의 사항, Then & Catch, Async & Await)

- [velog: Callback & Promise](https://velog.io/@luda412/06.-CallBack-And-Promise)
  - Callback & Callback Hell
  - Promise
    - then & catch

---

## 11_week AWS VPC & Subnet 네트워크 구성

- [AWS VPC 및 서브넷 설정 & Public EC2 생성, 외부 접근 허용](https://cliff-snowstorm-2ff.notion.site/11-AWS-VPC-Public-EC2-28ec8d3ef4dc414cbec75a2eecbdc792?pvs=4)
  - VPC 생성
  - Subnet 생성
  - EC2 인스턴스 생성
  - IGW 생성
  - 라우팅 테이블 생성
  - 연결 확인

- [Inbound를 위한 Bastion 설정](https://cliff-snowstorm-2ff.notion.site/Private-EC2-Inbound-Bastion-4f19b8c7241743b9b89b858b1580e2d2?pvs=4)
  - Bation Host 역할 EC2 생성
  - 키페어 생성
  - 인스턴스 생성
  - Tunneling

- [Outbound를 위한 NAT Instance 설정](https://cliff-snowstorm-2ff.notion.site/Private-EC2-Outbound-NAT-Instance-852fd0e7b73b4ce69a4dfd30265f175e?pvs=4)
  - 인스턴스 생성
  - 라우팅 테이블 설정
  - Tunneling
 
- [velog: AWS 네트워크 구성](https://velog.io/@luda412/AWS-네트워크-구성)
  - VPC
  - Subnet
  - IGW & Route Table
  - NAT Instance
  - Bastion
  - 트래픽 흐름 예시

----

