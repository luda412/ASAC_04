# 01. Callback
다른 함수의 <span style = 'background-color:#fff5b1'>파라미터</span>로 전달되는 함수를 <span style = 'background-color:#fff5b1'>Callback</span> 함수라고 한다. 
다시, 함수를 파라미터로 넘겨, 파라미터를 받은 함수에 <span style = 'background-color:#fff5b1'><strong>실행권</strong>을 넘기는 함수</span>를 Callback 이라고 한다.

Callback 자체로는 비동기 함수와 관계가 없으나, Callback이 많이 사용되는 곳은 비동기이기 때문에, 비동기 함수에 실행권을 넘기기 위해 callback을 많이 사용한다.

아래의 예시로 콜백을 살펴보겠다. 
```
function callback(param1, param2) {
  console.log( param1 + " and " + param2 );
}

function caller(callback) {
  callback( arguments[1], arguments[2] );
}

caller( callback, "hello", "goodbye" ); //'hello and goodbye'
```

```function caller(callback)``` 은 매개변수로 callback 함수를 전달 받고 ```callback( arguments[1], arguments[2] )``` 전달할 인자를 받고 있다.
```function callback(param1, param2)```은 변수를 전달 받고 전달 받은 값을 and로 합쳐 출력한다.

그래서, 위의 로직을 이용하여 "hello", "goodbye"를 넘긴다면, ```caller( callback, "hello", "goodbye" )``` <span style = 'background-color:#fff5b1'>caller 함수의 매개변수로 callback 함수</span>를 넣어 사용한다.

하지만, 이를 잘 못 사용하게 되면 <strong>Callback Hell</strong>을 맞이한다.

## Callback과 Callback Hell

Callback Hell은 콜백의 결과가 그 다음 콜백을 실행하고 그 다음의 결과가 콜백을 실행할 때 필요하다. 하지만, 과도하게 사용하면 콜백 함수가 반복되어 코드의 수정을 어렵게 하고 가독성을 저해한다. 

아래의 두 예시를 통해 Callback Hell에 대해 알아보겠다.

```
//callback 예시
function getUserAndRename(id) {
  const user = getUser(id)
  rename(user)
}

function getUser(id){
  return {name: 'luda', age: 10}
}

function rename(user){
  user.name = 'fnek'
  console.log(user) //{ name: 'fnek', age: 10}
  reage(user)
}

function reage(user){
  user.age = 90
  console.log(user) // { name: 'fnek', age: 90}
}

getUserAndRename(1)
```
> 1. `getUserAndRename(1)`: id에 1을 넣어 getUserAndRename 호출
> 2. ```getUser(1)```: luda, 10을 가져와 `user`에 할당
> 3. ```rename(user)```: 로 luda, 10 전달
> 4. ```function rename(user)```: luda를 fnek로 rename 후 출력
> 5. ```reage(user)```: fnek, 10 전달
> 6. ```function reage(user)```: 10을 90으로 reage 후 출력

```
//callback Hell 예시
function getUserAndRename(id, renameCallback) {
  const user = getUser(id)
  renameCallback(user, reage)
}

function getUser(id){
  return {name: 'luda', age: 10}
}

function rename(user, reageCallback){
  user.name = 'fnek'
  console.log(user) //{ name: 'fnek', age: 10 }
  reageCallback(user)
}

function reage(user){
  user.age = 90
  console.log(user) //{ name: 'fnek', age: 90 }
}

getUserAndRename(1, rename)
```

Callback 함수와 차이점이 살펴보겠다. 
> 1. ```getUserAndRename(1, rename)```: id 값과 함께 ```function rename```을 호출한다.
> 2. ```getUser(id)```를 통해 luda, 10을 가져온 다음 user에 할당하고 ```renameCallback(user, reage)```를 호출한다.
> 3. ```function rename```으로 luda를 fnek로 rename 후 출력하고 ```reageCallback(user)```를 호출한다.
> 4. ```function reage```로 age를 10에서 90으로 reage 후 출력한다.

---
# 02. Promise

Promise를 이해하기 위해 <span style = 'background-color:#fff5b1'>Callback과 Asynchronous</span>로 나눠서 설명하겠다.

Callback 함수 = <strong>callee</strong> = 파라미터를 받길 기다린다 = Comsumer
Asynchronous = <strong>caller</strong> = 파라미터를 넣는다 = Producer

Promise는 비동기를 위해 탄생한 개념이기 때문에 2개의 상태를 갖는데, <span style = 'background-color:#fff5b1'>성공 / 실패</span> 상태로 나뉘고 그에 따른 콜백을 설정한다.

```
// callback 형태
function caller(reslove, reject){
  const produced = producing()
  if (succeeded) resolve(produced)
  if (failed) reject(produced)
}

caller(
  function resolve(produced) {comsuming(produced)}
  function reject(produced) {comsuming(produced)}
)
```
callback 형태는 성공과 실패의 두 상태를 <span style = 'background-color:#fff5b1'>resolve와 reject function</span>으로 콜백한다.

```
// promise 형태
new Promise(
  function caller(resolve, reject) {
    const produced = producing()
    if (succeeded) resolve(produced)
    if (failed) reject(produced)
  }
)
  .then(function resolve(produced) {comsuming(produced)})

  .catch(function reject(produced) {comsuming(produced)})
```
그에 반해 Promise는 <span style = 'background-color:#fff5b1'>then과 catch</span>로 성공과 실패에 따른 콜백을 설정한다.

## .then & .catch

[앞선 설명](https://velog.io/@luda412/06.-CallBack-And-Promise#02-promise)으로 Promise는 2개의 상태로 나뉘며 그것은 성공과 실패라고 설명했다. 성공은 Fulfilled 이며, 실패는 Rejected로 명시한다. 
즉, 하나의 caller에 Fulfilled, Rejected 두 개의 callee가 있는 것이다. 아래의 예시를 통해 Fulfilled와 Rejected를 어떻게 사용하는지 살펴보겠다. 

```
function getMyUserInformationAPI(id) {
  if (id === 1) {
    return { success: true, user: { name: 'luda', age: 10} }
  } else {
    return { failed: true, user: {} }
  	}
  }
  
  let promise = new Promise((resolve, reject) => {
    const id = 1
    const result = getMyUserInformationAPI(id)
    if (result.success) { resolve(result.user) }
    if (result.failed) { reject({ type:'NO', message: 'Help Me'})}
  })
  
  //.then((user) => { console.log(user) }) // { name: 'luda', age: 10 }
  //.catch((error) => { console.log(error.message) }) // id = 2인 경우 'Help Me' 
  
  //promise.then((user) => { console.log(user) }) //{ name: 'luda', age: 10 } Promise { undefined }
  //promise.catch((error) => { console.log(error.message) }) // id = 2인 경우 'Help Me' Promise { undefined }
  ```
```id = 1``` 인 경우에 ```.then```으로 성공에 따른 user 객체를 출력하고 있다. ```id = 2```인 경우에는 ```.catch```로 error message인 'Help Me'를 출력한다.

실습 내용을 통해 Promise 사용시 주의사항, Async와 Await에 대해 설명을 하겠다.

---

👉🏻[실습내용: Callback, Promise, Async, Await](https://www.notion.so/5-JS-ES6-90377060793948b4afd21ce1c57c291b)
