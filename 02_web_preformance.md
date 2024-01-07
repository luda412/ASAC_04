# 01. 웹 성능
웹에서는 요청을 주고 연산을 수행하고 결과를 반환하는 형태가 중요하며, 그 결과 반환의 형태로 웹 페이지 서빙을 server 측에서 하는 방법과 client 측에서 하는 방법을 알아보았다.
요청을 했을 때 결과를 빠르게 반환한다면 그 웹의 성능은 좋다. 빠르다 라고 할 수 있다.
그렇다면, 웹 서버에서 결과로 반환하는 것은 무엇인가?
>## HTTP Resource
웹 페이지뿐만 아니라 유튜브, 인스타그램 등을 통한 영상과 이미지, data들을 일컫는다. 웹 브라우저를 통해 요청받은 정보들을 결과로 반환 할 때 이러한 결과들을 넘겨주게 된다.

그렇다면, 같은 요청과 같은 반환을 반복 하게 되면 어떻게 될까? 
웹 브라우저 관점에서는 네트워크 트래픽 및 비용이 누적되고 영상이나 이미지를 다운로드 완료까지 대기한 후 볼 수 있다. 웹 서버 관점에서는 매번 똑같은 data를 반환하기 때문에 반복 연산에 대한 CPU와 memory같은 자원을 소비하고 트래픽이 과중 된다.

그럼, 같은 요청에 대해서는 자원 즉, HTTP Resource를 임시 저장하여 재사용 한다면 트래픽과 네트워크 과중을 줄이고 불필요한 연산을 줄일 수 있지 않을까?

---
# 02. Cache
cache는 일반적으로 하드웨어 혹은 소프트웨어에서 자주 사용 되는 data를 컴퓨터 환경에 잠시 저장하는 것을 의미한다.
여기서 다룰 cache는 <span style = 'background-color:#fff5b1'>HTTP cache</span>와 <span style = 'background-color:#fff5b1'>Server cache</span> 두 가지 이며 저장소를 의미하기 보단 임시 저장하는 일련의 모든 과정을 지칭한다.

## 02-1. Cache의 종류: HTTP Cache
Private: _해당 웹 브라우저만을 위한 cache_
Private은 웹 브라우저에 위치해 있으며, 제어자가 누구인지에 따라 브라우저 캐시, 관리형 캐시로 나뉜다.
- 브라우저 캐시는 웹 서버가 HTTP Cache Header를 통해 제어한다.
- 관리형 캐시는 웹 서비스 개발자가 어떻게 cache를 제어할지 정한다.

Shared: _모든 웹 브라우저들을 위한 cache_
Shared는 웹 브라우저와 웹 서버 사이에 위치해 있으며, 제어자가 누구인지에 따라 프록시 캐시, 관리형 캐시로 나뉜다.
- 프록시 캐시는 웹 서버가 HTTP cache Header를 통해 제어한다.
- 관리형 캐시는 웹 서비스 개발자가 어떻게 cache를 제어할지 정한다. Ex) Reverse Proxy, CDN

## 02-2. Cache의 종류: Server Cache
- local cache: _하나의 서버만을 위한 cache_

하나의 웹 서버에 붙어 있는 개념으로 LRU-Cache가 있으며 상대적으로 속도가 빠르다.
LRU-Chache: 가장 오래 사용되지 않는 자원을 교체 우선 순위에 넣는 것이다.
- global cache: _다수의 서버를 위한 cache_

다수의 웹 서버가 접근 할 수 있는 개념이다.
Redis: 캐시 서버로 데이터 베이스에 가까운 사용이다.

## 02-3. HTTP Cache 상세: Proxy와 CDN
Proxy는 앞선 설명에 의해 '모든 웹 브라우저를 위해 cache를 사용하며 웹 서버가 HTTP cache Header를 통해 제어'한다는 것을 알았다.
이 Proxy cache는 어디에 가까이 있느냐에 따라 Forward Proxy와 Reverse Proxy로 나뉜다.

- Forward Proxy
    - 요청을 보내는 측: 클라이언트(웹 브라우저)
    - 은닉: IP 변환을 통해 원 요청자(브라우저)를 은닉한다.
    - 접근 제어: 특정 IP 혹은 웹 페이지에 대한 접근을 막는다. Ex)ISP(Inetnet Service Provider: SKT, KT 같은 서비스 제공자)들이 막은 웹 페이지는 경고문과 함께 접속이 불가능 하다.
    - 캐싱: 클라이언트가 받을 결과 값을 임시 저장 한다.

- Reverse Proxy
    - 요청을 받는 측: 웹 서버
    - 변환: Header 세팅(Header settings에서 설명하겠다.)
    - 전달: URL Mapping, 요청에 대해 올바른 서버에 접근하고 연산할 수 있도록 요청들어온 URL을 서버에 맞게 Mapping 한다.
    - 분산: 로드 밸린싱, 웹 서버의 부하를 완화 시키기 위해 서버에 적절히 분배한다.
    - 보안: HTTPS, 노출에 치명적인 data를 전송하는데 있어 암호화한다. 브라우저와의 통신에서 노출되는 data를 모든 웹 서버가 Private Key를 가지지 않아도 Reverse Proxy를 거쳐가며 통신하기 때문에 웹 서버가 들고 있는 것이 아닌 Proxy에서 들고 있으면 관리 및 인증이 간편해진다. 
    - 캐싱: 클라이언트의 잦은 요청의 반환을 중간에 임시 저장한다.
    - 은닉: 서버의 고유한 IP가 외부로 노출 되지 않게 한다.
    - Rate Limiting: 특정 시간안에 호출 할 수 있는 횟수를 제한한다.
    - WAF(Web Application Firewall): 클라이언트가 서버에 도달하기전에 통과하게 만들어, 노출로부터 서버를 보호하는 역할을 한다.

- CDN(Content Delivery Network)
미국에 있는 웹 서버에 한국 웹 브라우저가 요청을 보냈다고 가정한다면 물리적인 거리에 의해 응답시간이 상당히 길어질 것이다. 이를 해결 하기 위해 HTTP Resource를 클라이언트 가까이 캐싱하는 것이다.
이른바 Edge Server로 결과를 반환하는 웹 서버와 요청하는 클라이언트의 거리가 줄어들게 되어 지역성을 해소 할 수 있다. 또한, data의 크기가 크냐 작냐의 기준이 아닌 얼마나 자주 사용하는지, 지역성 문제가 있는지를 기준으로 캐싱하여 지역성을 해소시킨다.


## 02-4. HTTP Cache의 동작
캐시를 활용할 지의 여부는 데이터의 실시간성이 중요하냐에 따른다. _왜?_ 
앞선 설명으로 cache는 반복되는 요청에 대해 반환할 결과를 웹 서버가 아닌 브라우저나 웹 서버 사이에 임시 저장하는 모든 행위를 지칭한다고 하였다.
그렇기 때문에 계속해서 update 되는 실시간성이 중요한 data를 임시 저장소에서 동일한 결과 값으로 가져온다는 것은 실시간성을 포기한다는 것이다.

그럼 임시 저장할 data는 영원 불변할 data인가? 
아니다. 예를 들어 유저 정보에 내 몸무게를 70kg으로 저장했으며 해당 정보를 임시 저장 했다고 가정해보자. 그런데, 일정시간이 지난 뒤 몸무게가 늘어 유저 정보를 80kg으로 변경, 저장했다.
하지만, 이 시점에 임시 저장소는 나의 몸무게를 70kg으로 알고 있기 때문에 cache의 data를 읽어 반환한다면 결과값은 70kg이다. 이렇듯 data의 유효도를 판단하기 위해서 <span style = 'background-color:#fff5b1'>재검증 주기</span>와 <span style = 'background-color:#fff5b1'>재검증 기준</span>을 정한다.
- 재검증 주기: 캐싱되어 있는 data를 얼마의 주기로 재검증 할 것인가. 예와 같이 캐싱 되어 있는 몸무게 70kg data를 1달 동안 유효하다고 정할 것인지, 3달 동안 유효하다고 정할 것인지, 결정하는 것이다. 이는 data의 특성에 따라 결정한다.
- 재검증 기준: 캐싱되어 있는 data의 유효성 여부를 판단하는 근거. 유효성을 판단의 근거로 <span style = 'background-color:#fff5b1'>시간</span>과 <span style = 'background-color:#fff5b1'>Hash</span>가 있다.

>### 재검증 기준: 시간
재검증 기준의 지표로 시간을 활용한 방법이다. 마지막으로 수정된 Date를 기반으로 data가 유효한지 판단하는 것이다. 하지만 이는 문제를 야기한다. 예를 들어 텍스트 파일에서 어떤한 텍스트도 수정하지 않은 것과 [space bar]를 입력하고 [delete]를 진행한 문서는 사실상 바뀐것이 없다. 하지만 수정된 Date의 관점으로 본다면 이는 앞선 파일과 시간이 다른 파일이 된다.
이를 Last-modified/max-age로 판단하며 의미는 Header Settings에서 설명하겠다.

>### 재검증 기준: Hash / ETag
재검증 기준의 지표로 Hash를 활용한 방법이다. 시간의 방법과 다르게 파일의 변경사항을 파악 하기 위한 방법으로 하나라도 변경이 생기된다면, 모든 Hash 값이 달라지게 되는 방법을 이용한 것이다. Hash는 파일 안의 모든 요소를 검사하는 것이 아니라 생성된 고유한 Hash 값의 비교로 파일이 변경됨을 찾는 것이다. ETag/max-age로 판단한다.

---
# 03. 결과 반환 시점
HTTP Resoure 중 스크립트 즉, CSS, JS에 한해서만 로드되는 시점을 지정하는데 웹 페이지가 랜더 될 떄의 script파일의 로딩과 실행 순서를 지정하는 것이다. 
웹 브라우저는 HTML이 작성된 순서대로 위에서 아래로 DOM Tree를 생성 하다가 중간에 script를 만나게 되면 로딩, 실행 과정을 거쳐야 한다. 이때 로딩과 실행하는 시점을 지정하는 방법이다.

>## 지정하지 않은 경우
<"script"><"/script"> 로 사용하는 경우 HTML을 위에서 아래로 읽어가면서 script 구문을 만나면 HTML 읽기를 멈추고 script로딩, 실행 후 멈췄던 지점에서 HTML을 읽는다.

>## Defer
<"script defer"><"/script>로 사용하며 HTML을 위에서 아래로 읽어가면서 script 구문을 만나면 HTML 읽기를 멈추지 않고 script구문과 함께 읽는다. 그리고 HTML을 끝까지 읽으면 그 시점에 script를 실행한다.

>## Async
<"script async"><"/script>로 사용하며 HTML을 위에서 아래로 읽어가면서 script 구문을 만나면 HTML 읽기를 멈추지 않고 script로딩과 HTML읽기를 함께 하다가 script로딩이 끝난 시점에 HTML 읽기를 멈춘다. script를 실행한 다음, 실행 완료후 HTML 읽기를 멈춘 그 시점부터 다시 아래 방향으로 읽는다.

>## module
<"script type="module""><"/script">로 사용하며 JS에서 제공하는 많은 라이브러리들을 로딩하고 실행할 때 실행하는 시점을 지정하는 방법이다. 
<"script type="module""><"/script">로 사용하면 defer와 마찬가지로 로딩은 HTML읽기와 같이 하다가, HTML 읽기가 끝나고 실행한다.
<"script type="module" async"><"/script">는 async와 마찬가지로 로딩은 HTML 읽기과 함께하다가 로딩이 완료되면 HTML 읽기를 멈추고 script를 실행하고 멈췄던 지점에서 다시 HTML을 읽는다.

---
# 04. Header Settings
HTTP Header field에 cache를 제어하기 위한 사항들을 명시한다. 
- max-age=N: 결과가 생성되고(HTTP Resource를 캐싱하고) N초 동안 data의 유효를 가져라를 의미한다.
- s-maxage: private cache에서는 무시되며, HTTP Resource가 shared cache에서 유지되는 기간을 의미한다.
- must-revaildate: max-age와 함께 사용되며, 결과가 오래된 경우 웹 서버에게 사용 여부를 확인한다.
- no-store: private 또는 shared에 캐싱하지 않는 것을 의미한다.
- no-cache: 캐싱을 하지만 매번 응답(결과)에 대해 검증을 진행 할 것을 의미한다.
- immutable: 새로운 지시가 들어오기 전에는 data를 교체하지 않는 것을 의미한다.
- stale-while-revaildate: revaildate하는 동안 data가 유효하지 않더라도 캐싱된 값을 보낸다. 그래서 2가지의 분기로 나눠진다. 1. 브라우저가 요청한다. A.캐시가 웹 서버에게 유효한 data인지 요청한다. 같은 시점에 2. 캐싱된 리소스를 클라이언트에게 반환한다. B. 웹 서버에게 반환 받은 data를 캐싱한다. 
---

👉🏻[실습 내용: 크롬 개발자 도구를 통해 status code 분석, CDN 캐싱 분석](https://www.notion.so/2-13177547af084aa69701f526dd7bb8fb)
