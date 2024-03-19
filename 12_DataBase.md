# Data Integrity

관계형 데이터베이스(RDBMS)의 특징은 고신뢰성(High Relability), <span style = 'background-color:#fff5b1'>데이터 무결성(Data Integrity)</span>이다.

그중, Data Integrity는 아래의 4가지의 Transaction 성질을 준수하며 보장되는 특징이다.

- <strong>Atomicity</strong>- 원자성: 완벽하게 수행되거나 완벽하게 수행되지 않아야 한다.
- <strong>Consistency</strong>- 일관성: 데이터 저장 시 모든 제약 조건들을 만족하며 데이터 조작 발생 직후, 조회 시 최신값을 볼 수 있어야 한다.
- <strong>Isolation</strong>- 격리성: 동시에 다수 쿼리가 발생 시 모든 커리에 해당하는 Transaction은 독립되어야 한다.
- <strong>Durability</strong>- 지속성: 데이터가 지속적으로 존재하며 로그를 통해 보완해야 한다.

해당 글에서 설명할 성질은 <span style = 'background-color:#fff5b1'>Isolation Level</span> 즉, 격리 수준이다. 격리 수준은 Transaction의 수행이 독립되는 정도를 L1(병렬) 부터 L4(직렬)로 명시한다.

---

# L0 Read Uncommitted

![Read Uncommitted](https://ifh.cc/g/7lP648.png)

커밋 되지 않은 값을 읽는 것을 허용한 수준으로 트랜잭션이 데이터를 공유하여 접근해도 보호 되지 않는다.

> 1. T1의 시작
> 2. T2의 시작
> 3. T1이 ID = 1, <strong>Value = MIN을 KIM</strong>으로 변경
> 4. T2가 ID = 1 조회, <strong>Value = KIM</strong>이 조회
> 5. T1, T2 종료

- 위의 과정에서 발생하는 문제점은 커밋되지 않은 즉, T1이 종료되기 전의 값을 T2가 읽는 <span style = 'background-color:#fff5b1'>Drity Read</span>가 발생한다.

---

# L1 Read Committed

![Read Committed](https://ifh.cc/g/tf5dV8.png)

> 1. T1 시작
> 2. T1이 ID = 1, <strong>Value = MIN을 KIM</strong>으로 변경
> 3. T2 시작
> 4. T2 ID = 1 조회, 이전에 커밋된 값인 <strong>MIN</strong>이 검색된다.
> 5. T1이 변경된 값을 커밋 후 종료
> 6. T2가 ID = 1 조회, 방금 커밋된 <strong>KIM</strong>이 검색 된다.
> 7. T2 커밋 후 종료

- 커밋된 값만 읽을 수 있는 수준이기 때문에 Dirty Read는 발생하지 않는다. 하지만, T2가 ID = 1을 처음 조회하면 이전의 커밋된 MIN이 읽히고, 다시 조회를 하면 직전에 T1에 의해 커밋된 값인 KIM이 읽힌다. 이처럼 하나의 트랜잭션이 같은 값을 조회할 때 다른 값이 검색되는 <span style = 'background-color:#fff5b1'>Non-Repeatable Read</span>가 발생한다.

---

# L2 Repeatable Read

![Repeatable Read](https://ifh.cc/g/vgzrv2.png)

> 1. T1 시작
> 2. T1 ID = 1 조회, <strong>Value = MIN</strong> 검색된다.
> 3. T2 시작
> 4. T2가 ID = 1, <strong>Value KIM으로 변경</strong>
> 5. T1이 ID = 1 조회, T2의 변경 내역 조회 불가, MIN이 검색된다.
> 6. T2가 ID = 2, Value KIM 삽입, 커밋 후 종료
> 7. T1이 ID = 2 조회, Value KIM 검색된다.
> 8. T1 종료

- 트랜잭션이 시작되고 종료되기 전까지는 한 번 조회한 값은 계속 같은 값이 조회되는 수준이기 때문에 Non-Repeatable Read는 발생하지 않는다. 하지만, 5번 처럼 트랜잭션의 종료 전까지는 계속 같은 값이 조회되고, 만약 8번에서 T2가 비정상적으로 종료되어 롤백되었다면, ID = 2, Value KIM 데이터는 존재하지 않지만 T1은 계속해서 읽히는 <span style = 'background-color:#fff5b1'>Phantom Read</span>가 발생한다.

---

# L3 Serializable

![Serializable](https://ifh.cc/g/8x9rnk.png)

> 1. T1 시작, 조회
> 2. T1 데이터 변경
> 3. T1 커밋 후 종료
> 4. T2 시작
> 5. T2 조회
> 6. T2 커밋 후 종료

- 트랜잭션을 직렬로 처리하여 실행의 순서를 보장하며 데이터의 <span style = 'background-color:#fff5b1'>독립</span>을 보장한다. 하지만, 모든 트랜잭션의 수행을 직렬로 수행시 정책에 대해서는 어떠한 에러도 발생하지는 않으나 어느 정도의 병렬처리보다 시간이 많이 소요되기 때문에 성능 하락의 문제가 있다.

---

[L1, L2, L3 이미지 출처](https://private-space.tistory.com/97)

[L4 이미지 출처](https://steadiness.dev/isolation-level/)
