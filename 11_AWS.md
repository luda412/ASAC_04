# VPC

<strong>Virtual Private Cloud</strong>을 사용하는 목적은 AWS 클라우드에서 논리적으로 격리된 공간을 프로비저닝하고, 정의한 가상 네트워크에서 리소스를 시작하기 위해서다.

그렇기 때문에, AWS에서 제공하는 인스턴스 및 서브넷을 사용하기 위해서는 VPC를 생성해야 한다. VPC라는 바운더리를 생성하고 Subnet을 통해 그 안의 세부영역을 나누는 것이다.

Subnet을 할당하기 위한 목적으로 VPC를 생성하는데, 이는 보안 그룹 및 네트워크 엑세스 제어 목록을 포함한 다중 보안 계층을 활용하여 각 Subnet에서 EC2 <span style = 'background-color:#fff5b1'>인스턴스에 대한 엑세스를 제어하도록</span> 지원한다.

VPC는 <strong>CIDR</strong>이라는 IP 주소 할당법으로 사용 가능한 IP 대역을 지정하여 불변영역과 가변영역을 표기한다.

> 예를 들어 1.0.0.0/24이라는 VPC CIDR를 할당한다고 가정하면 이는 $2^{32}$의 IP 대역에서 $2^{24}$만큼 불변하고 $2^8$만큼 가변적인 IP 대역임을 명시하는 방법이다.

위의 예시를 빗대어 CIDR을 조금 더 설명하면 1.0.0.0인 <strong>Base IP</strong>와 255.255.255.0인 <strong>Subnet Mask</strong>가 합쳐진 IP 대역이기 때문에 가변영역을 255개 만큼 사용 가능하다는 말은 위에 설명한 $2^8$ 만큼의 IP 대역을 사용가능하다는 말과 같다.

---

# Subnet

수많은 IP 대역을 분할하여 사용한 것으로 일종의 <strong>Grouping</strong>으로 볼 수 있다. Grouping을 하는 이유는 <span style = 'background-color:#fff5b1'>Private</span>과 <span style = 'background-color:#fff5b1'>Public</span>을 나누기 위해서 인데 이때 각 Subnet을 2개의 쌍으로, 서로 다른 가용 영역을 지정하여 Subnet을 생성하는 것이 바람직하다.

그 이유는 Multi AZ를 위해서 인데, AZ는 쉽게 말해 해당 서브넷을 가지고 있는 DC를 분리하여 한 쪽 Subnet을 가지고 있는 AZ(a)의 Data Center가 문제가 발생하여 Data가 소실 되더라고 다른 한 쪽 AZ(b) Data가 문제되지 않는다면 Data의 소실을 막고 백업을 하기 위해서다.

이때 하나의 Subnet이 위치할 곳은 하나의 AZ에 할당되어야 하고 Subnet을 품는 AZ의 괌점으로 보면 여러(Private, Public) Subnet이 있지만 Subnet 관점에서 보면 하나의 AZ에 소속되어있다. 다시, <span style = 'background-color:#fff5b1'>Subnet이 여러 AZ에 걸쳐있지 않고 하나의 Subnet은 하나의 AZ에 할당된다.</span>

---

# Internet GateWay & Route Table

<strong>IGW</strong>(Internet GateWay)는 Subnet 단위 외부 IP 할당을 의미한다.

다시 말해, Subnet 단위로 외부에서 접근 가능하도록 열어주는 것이다. VPC에 IGW를 붙여 열어준 뒤, <strong>Route Table</strong>을 통해 IGW와 EC2를 연결한다.

GateWay를 통해 외부로 나가면서 Private IP를 Public IP로 변환하지만 AWS에서 Public Subnet은 IGW와 떨어져 있기 때문에 이를 연결하기 위해서는 Route Table를 사용해야한다.

Route Table은 2가지의 설정을 통해 트래픽에 대한 제어를 제공한다.

- <strong> 어디에 적용할 것인가? </strong> = Subnet 할당
- <strong> Destination과 Target </strong> = IP(Destination)에 따른 목적지(Target) 설정

---

# NAT Instance

Private 서브넷 내 EC2가 외부 라이브러리 다운이 필요할 때 등, 외부 서버로 나가는 트래픽에 대한 정의는 <strong>아웃바운드</strong>인 NAT Gateway 혹은 Instance 를 통해 밖으로 나갈 문을 만든다.

# Bastion

Private 서브넷에 외부 개발자 컴퓨터에서 SSH 을 통해 접근이 가능해야할 때 <strong>인바운드</strong> 이때는 SSH Tunneling Bastion 을 통해 밖에서 안으로 들어올 문을 연다.

---

# 트래픽 흐름 예시

![img](https://ifh.cc/g/jqBvMr.jpg)
[이미지 출처](https://alike-catboat-47c.notion.site/12-AWS-7ea352f2e5924dfd849bb7c58687b996#3bb2bf852acc4798a9dc783ce550de06)

- <span style="background-color:#C0FFFF">파란색 트래픽</span>:외부 유저 0.0.0.0/0(모든 IP)에 대한 접근은 IGW로 -> IGW를 통해 변환된 트래픽은 Bastion Host를 통해 private Subnet의 EC2에 접근하게 된다.
- <span style="background-color:#DCFFE4"> 초록색 트래픽</span>: 내부의 0.0.0.0/0 모든 트래픽은 NAT EC2로 -> NAT를 거친 트래픽(Publicn Subnet)은 IGW로 가게된다.

---

👉🏻[AWS VPC 및 서브넷 설정 & Public EC2 생성, 외부 접근 허용 실습](https://cliff-snowstorm-2ff.notion.site/11-AWS-VPC-Public-EC2-28ec8d3ef4dc414cbec75a2eecbdc792?pvs=4)

👉🏻[Inbound를 위한 Bastion 설정](https://cliff-snowstorm-2ff.notion.site/Private-EC2-Inbound-Bastion-4f19b8c7241743b9b89b858b1580e2d2?pvs=4)

👉🏻[Outbound를 위한 NAT Instance 설정](https://cliff-snowstorm-2ff.notion.site/Private-EC2-Outbound-NAT-Instance-852fd0e7b73b4ce69a4dfd30265f175e?pvs=4)
