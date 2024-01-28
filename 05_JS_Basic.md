# 01. Java Script 엔진 실행 과정
Java Script(이하 JS)는 비동기적으로 실행된다. 다시, 하나의 실행을 끝내고 나서 다음 실행을 이어간다. 개략적으로 설명하기 위해 이해한 [글](https://www.javascripttutorial.net/javascript-execution-context/)을 바탕으로 memory에서 함수 선언과 실행은 어떻게 이뤄지고, Phase 별로 어떤 동작을 하는지 하나의 예제를 이용하여 설명하겠다.

## JS Engine
JS는 대표적으로 V8엔진이 있으며 이외에도 브라우저 별로 여러 엔진들이 존재한다. JS 엔진은 크게 <span style = 'background-color:#fff5b1'>Memory Heap</span>과 <span style = 'background-color:#fff5b1'>Call Stack</span>라는 memory 영역이 있다.

### Memory Heap
Data를 임시 저장하는 곳이다. 함수나 변수, 실행할 때 사용할 값들을 저장한다.

### Call Stack
코드가 실행되면 내부의 실행 순서를 저장해 놓고, 순차적으로 진행할 수 있도록 돕는다.

```
let x = 10;

function timesTen(a){
    return a * 10;
}

let y = timesTen(x);

console.log(y); // 100
```

간단한 코드가 엔진에서 어떻게 동작하는지 아래에서 살펴 보겠다.

## Creation / Complie Phase

>1. Memory Heap에 변수와 함수의 <span style = 'background-color:#fff5b1'>선언</span>을 저장한다. 다시, ```x, y, tiemsTen(): function(){...}```의 선언을 Memory Heap에 얹는다.
>2. 선언한 변수 x와 y가 ```undefined```로 <span style = 'background-color:#fff5b1'>초기화</span> 된다.

## Execution Phase

>1. 선언한 변수와 함수의 실행을 시작한다. 실행은 Call Stack에 얹어서 차례로 변수에 값을 <span style = 'background-color:#fff5b1'>할당</span>하고 함수를 <span style = 'background-color:#fff5b1'>호출</span>한다.
2. x에 10이 할당되고 ```timesTen(): funtion(){...}```이 할당되고, y에는 timesTen(x)가 할당된다.
3. 실행과 함수 호출을 진행한다. x에 할당된 값이 y의 함수 호출부에 담겨 a가 undefined에서 10을 할당 받게 된다.
4. return 값으로 10이 할당된 a와 10은 연산한다.
5. y에 timesTen()함수의 반환 값인 100이 할당된다.
6. console.log(y)가 실행되어 100이 <span style = 'background-color:#fff5b1'>출력</span>된다.

<figure>
    <img src="https://ifh.cc/g/7TFZwV.png" title="timesTen(x)">    
    <figcaption>Execuiton Phase 2</figcaption>
</figure>

<figure>
    <img src="https://ifh.cc/g/TKCdNv.png" title="Function working">    
    <figcaption>Execuiton Phase 4</figcaption>
</figure>

<figure>
    <img src="https://ifh.cc/g/7LWo6N.png" title="console.log">    
    <figcaption>Execuiton Phase 6</figcaption>
</figure>

해당 툴을 이용할 수 있는 [사이트](http://latentflip.com/loupe/?code=bGV0IHggPSAxMDsKCmZ1bmN0aW9uIHRpbWVzVGVuKGEpewogICAgcmV0dXJuIGEgKiAxMDsKfQoKbGV0IHkgPSB0aW1lc1Rlbih4KTsKCmNvbnNvbGUubG9nKHkpOyAvLyAxMDA%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

---
# 02. Funciton

## Declaration & Expression

먼저, 함수의 선언식은
```
function Declaration(){
    return 'This is Function Declaration'
}
Declaration() // 'This is Function Declaration'
```
이렇듯 일반적인 프로그래밍 언어에서의 사용과 유사하다.

함수의 표현식은
```
var Expression = function(){
  return 'This is Expression'
}
Expression() // 'This is Expression'
```
이렇게 표현할 수 있다.

선언식과 표현식의 주된 차이점은 <span style = 'background-color:#fff5b1'>Hoisting의 영향을 받는가</span> 이다.
선언식은 호이스팅의 영향을 받는다.

예를 들어
```
Declaration()
sum()

function Declaration(){
    return 'This is Function Declaration'
}

var sum = function(){
  return 10 + 20;
}
```
Declaration, sum 두 함수가 있고 함수의 호출을 하고 선언을 하였다. 그렇다면 JS 엔진은 이렇게 받아들일 것이다.

```
function Declaration(){
    return 'This is Function Declaration'
}

var sum;

Declaration() // 'This is Function Declaration'
sum() // TypeError: sum is not a function

var sum = function(){
  return 10 + 20;
} 
```
선언식으로 작성된 함수는 호이스팅의 영향을 받아 <span style = 'background-color:#fff5b1'>상단으로 끌어올려져</span> 먼저 선언이 되었다고 가정할 것이다. 이처럼 선언이 후에 이루어졌음에도 끌어올려지는 것을 호이스팅 이라고 한다. 

하지만, 표현식으로 작성한 sum함수에 이상한 점이 있지 않은가?
표현식으로 선언된 함수임에도 불구하고 sum을 var라는 식별자의 변수로 받아들여 호이스팅이 적용되었다. 그렇기 때문에 sum을 함수로 인지하지 않고 변수로 인지했기 때문에 TypeError를 출력한다.

## Arrow Function

```
var basic = function () {
  return 'I am basic'
}

basic() // 'I am basic'

var arrow = () =>{
  return 'I am arrow'
}

arrow() // 'I am arrow'
```
basic은 일반적인 선언식으로 선언한 함수이고, arrow는 화살표로 선언한 함수다.  function을 생략하고 =>로 함수임을 선언하는 방법이다. 매개변수가 여러개 있는 경우에도 사용가능 하다.
```
var arrowSum = (a, b) =>{
  return a + b;
}

arrowSum(1, 2)// 3
```
간결하고 직관적이다. 라는 장점도 있지만 가장 핵심적인 사용 이유는 <span style = 'background-color:#fff5b1'>this</span> 이다. 


```
var param = 'global param'

var printParam = function() {
	console.log(this.param) // this = object
}

var object = {
	param: 'object param',
	func: printParam
}

object.func() // object param
```
위의 결과는 object param이다. 그 이유는 param이 글로벌로 선언되었음에도 printParam 함수 내의 this가 window를 가르키는 것이 아닌 <span style = 'background-color:#fff5b1'>object</span>이기 때문에 object 안의 'object param'을 가져와 출력한다. 일반 함수 표현식에서 this는 어디서 호출되었는지에 따라 가리키는 <span style = 'background-color:#fff5b1'>객체가 달라진다.</span>

```
var param = 'global param'

var printParam = () => {
	console.log(this.param) // this = window
}

var object = {
	param: 'object param',
	func: printParam
}

object.func() // global param
```
위의 결과는 global param이다. 그 이유는 printParam 함수 내의 this가 object를 가르키는 것이 아닌 전역인 해당 <span style = 'background-color:#fff5b1'>window</span>를 가르키기 때문에 global param을 가진다. 화살표 함수의 this는 언제나 상위 소코프의 this를 가리키는데, 이를 <span style = 'background-color:#fff5b1'>Lexical this</span>라고 한다.

---
👉🏻[실습 내용: 함수 정의 및 사용, 함수 전달 형태, ES+6 문법](https://www.notion.so/5-Java-Script-23a0e2dc4b7a439981d8efc1bcdee1be)