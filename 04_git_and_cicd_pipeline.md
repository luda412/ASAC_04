# 01. Local vs Remote

Local 코드 관리의 필요성

- 다양한 버전: 하나의 코드에 다양한 케이스를 구현해 볼 때 필요하다.
- 히스토리 추적: 백업과 버전을 추적하기 위해 필요하다.
- 안전히 원격 저장: 내 노트북이 아니더라도 어느 공간에 업로드 해놓는다면 자신이 원하는 곳에서 다운로드하여 작업 수행이 가능하다.

그렇다면 하나의 파일을 다수의 사람들과 함께 개발한다면, 위의 세가지 관리를 어떻게 할 것인가?

## Local Repository: Git

일반적인 버전 관리는 파일을 기반으로 하지만 우리가 살펴볼 Git의 버전 관리는 직전 버전 대비 변경사항을 뜻하는 <span style = 'background-color:#fff5b1'>diff</span>을 기반으로 관리한다. diff는 <span style="background-color:#FFE6E6">어떤 것</span>을 기반으로 <span style="background-color:#FFE6E6">얼마큼</span>의 차이가 발생했는지 알 수 있다. 이때 하나의 버전에 대한 것을 <span style = 'background-color:#fff5b1'>스냅샷</span>이라고 한다.

### Git을 시작하는 형태.
Git의 시작은 Push를 통해 <strong>Local -> Remote</strong>로 시작하는 방법과 Pull을 통해 <strong>Remote -> local</strong>로 시작하는 방법으로 나뉠 수 있다.

><strong>Push</strong> (Local -> Remote)
1. Git을 생성한다. ```git init```
2. 메인(기본) 브랜치를 생성한다. ```git branch -M main```
3. 원격 타겟을 설정한다. ```git remote add origin (repository SSH)```
4. 업로드. ```git push -u origin main```

><strong>Pull</strong> (Remote -> Local)
1. Git 가져오기 ```git clone (repository SSH)```


## Remote Repository: GitHub

GitHub는 협업 관리를 하기 위한 원격 저장소로 같은 개발을 진행하는 동료들이 <span style = 'background-color:#fff5b1'>적용해 놓은 최신 코드</span> 혹은 최신 버전을 이어 받아 <span style = 'background-color:#fff5b1'>나의 작업을 쌓아</span> 올리는 버전 관리 저장소이다.

>### Remote 관리
- Remote 추가 하기: ```git remote add origin (repository SSH)```
- Remote 수정 하기: ```git remote set-url origin (repository SSH)```
- Remote 삭제 하기: ```git remote remove origin```

---

# 02. Branch 관리와 Conflict
## Branch
<strong>Branch</strong>란 기능에 따른 구별로 하나의 Repositiry 즉, 저장소 안에도 여러 개의 Branch가 존재한다. 그렇기 때문에 원격과 로컬의 관점에서 현재 사용하고 있는 Branch가 무엇인지, 사용하지 않을 Branch는 어떻게 처리할 것인지, 새로운 기능의 Branch를 무엇으로 할당할 것인지, 컨트롤할 수 있어야한다.

>### Remote Branch
- 조회: ```git brach -r```
- 삭제: ```git push --delete(or -D) origin (브랜치명)```

>### Local Branch
- 조회: ```git branch -l```
- 삭제: ```git branch -d(or -D) (브랜치명)```
- 선택: ```git checkout (변경할 브랜치명)```
- 생성 및 선택: ```git checkout -b (새로운 브랜치명)```

## Conflict 
앞서 GitHub를 사용하는 이유로 동료들의 최신 버전을 원격 저장소에서 이어받아 자신의 작업을 수행하기 때문이라고 설명하였다.
그렇다면 A라는 사람이 Pull로 작업을 진행하고 이 사실을 모르던 사람 B도 Pull로 작업을 수행하여 두 사람이 같은 Base를 기준으로 Push 한다면, 같은 스냅샷을 기준으로 다른 작업물을 Remote Repository에서 받아야하는 상황이기 때문에 충돌 즉, <span style = 'background-color:#fff5b1'>Conflict</span>이 발생한다.

>### ReBase
충돌을 해결하기 위해 먼저 Remote Repository에 저장된 스냅샷을 Base로 바꾸는 방법이다. <span style = 'background-color:#fff5b1'>새로운 Base</span>가 된 스냅샷 위에 내가 작업했던 스냅샷을 새로운 버전으로 올리게 된다. Merge와 차이점은 충돌이 일어난 부분을 수정하는 것이 아니라 먼저 있던 스냅샷을 수용한 상태로 내 작업물을 올리는 방법이다. 


>### Merge
현재 내 작업물과 충돌이 일어난 스냅샷을 합쳐 새로운 <span style = 'background-color:#fff5b1'>Merge commit</span>을 생성한다. Rebase와 차이점은 충돌 부분만 수정하여 새로운 commit을 만들게 된다. 


## Merge의 종류
merge는 꼭 충돌이 발생하여 그에 대한 해결책으로만 사용하는 것은 아니다.

### Fast-Forward
- Remote에 내 작업과 겹치는 어떠한 타인의 작업도 없을 때, 이어 붙이기 위해서 사용하는 방식으로 현재 브랜치가 바라보고 있는 최신의 스냅샷에 내가 작업한 내용물을 이어 붙여 내 작업물의 최신 버전을 브랜치가 바라볼 수 있도록 하는 방법이다.

### 3-Way
- Remote에 있는 타인의 작업은 그대로 두고, 내가한 작업도 그대로 두고 두 작업을 <span style = 'background-color:#fff5b1'>합한 결과물을 최신 버전</span>으로 만드는 방법이다. 이는 merge Commit이라는 결과물을 만들게 되고 기존의 작업과 내 작업을 합한 커밋이 최신 버전이 되고 이를 브랜치가 바라보게 하는 것이다.

### Squash
- Remote에 있는 타인의 작업을 기준으로 내가 다시 작업하여, 기존 작업들을 하나의 Commit으로 뭉쳐 생성한다. 다시, 분기했던 <span style = 'background-color:#fff5b1'>브랜치들의 Commit을 하나로 합하여</span> 생성한다. 이때 모든 Commit의 이력이 하나의 Commit으로 합쳐지기 때문에 어떻게 컨트롤할지 주의해서 진행해야 한다. 

---
# 03. Working Directory
작업 공간을 뜻하는 Working Directory는 로컬 작업공간에서 작업할 브랜치를 선택하게 된다. 
![Working Directory image](https://ifh.cc/g/3CzfQn.jpg "Working_Directory")

## Staging Area(Tracked)
Git이 추적하고 있으며 Add되어 Commit을 하기 위한 공간이다. 해당 공간에 위치하게 되면 Commit을 통해 수정된 내용을 올리거나 혹은 삭제하고자 했던 파일을 삭제할 수 있다.

## Unstaged(Tracked)
Git이 추적하고 있는 파일들 중 base가 되는 기존 브랜치를 기준으로 어떠한 변경사항이 생기면 Unstaged 공간에 있게 된다. 변경 사항은 수정과 삭제 모두를 의미한다.

## Untracked
Git이 알지 못하여 추적하고 있지 않는 파일들의 공간이다. 새로 생성하여 git이 추적하지 않고 있는 파일들의 공간이다.

그렇다면 파일의 상태가 변화됨에 따라 살펴본 공간들을 어떻게 거치게 되는지 몇 가지 시나리오를 통해서 알아보겠다.

---

# 04. 파일 조작 시나리오

## Delete <-> Untracked

Git이 추적하고 있는 파일 중의 삭제

- ```git rm (파일명)```: Staging Area로 올려서 Commit시 바로 삭제할 수 있다.

파일을 그냥 삭제하기

- unstaged로 가게 된다. unstaged로 이동했기 때문에 add와 Commit을 거치는 과정을 통해 한 번 검토를 하게 된다.

Staging Area에 올림과 동시에 Untracked에 올리기

- ```git rm --cached (파일명)```: untacked로 가고 staging area로도 간다. add 하여 commit을 진행하면 Repository에 있는 파일은 삭제되지만 Local 영역에서는 파일이 삭제되지 않아 나만 볼 수 있게 된다.

## New flie <-> Untracked

파일을 추가하는 경우 Git입장에서는 알지 못하는 파일이기 때문에 Untracked에 올라간다.

1. 로컬에서만 사용할 것이라면 Untracked에 추가된 상태 그대로 사용하면 된다.
2. Git에 등록할 것이라면 ```git add```를 통해 Staging Area에 올린다.

## File modified

- Git이 추적하고 있는 Tracked 파일에서 수정이 일어났을 때는 기준에 대한 변경의 내용을 git add를 통해 Commit하고자 하는 파일을 선택적으로 Staging Area에 올린다.


---

👉🏻[실습 내용1: Git & GitHub - First Commit for MacOS](https://www.notion.so/git-GitHub-for-Mac-fd76ff75a295466eafadafce48870326)
👉🏻[실습 내용2: Git conflict 해결 및 파일 조작 시나리오](https://www.notion.so/4-Git-Conflict-05ee99ce2753444c9df0a12d8b331fd0)

---
[이미지 및 내용 참조](https://www.notion.so/05-Git-f778d5429c0b478b96143a930600063b)