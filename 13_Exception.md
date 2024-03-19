# Error 와 Exception

![에러와 예외 계층 이미지](https://user-images.githubusercontent.com/45676906/105691109-2cda9400-5f40-11eb-9003-a14873c2eaf2.png)
<span style="color:gray">출처: https://devlog-wjdrbs96.tistory.com/351</span>

자바의 예외는 Error, Checked Exception, Unchecked Exception이 있으며, 위와 같은 클래스 계층 구조를 가지고 있다.

- Error는 프로그램에서 복구할 수 없는 문제를 나타내며, 프로그램이 더 이상 실행되지 않을 수 있다. 개발자는 이에 대한 대응을 하기 어려우며, 예를 들어 <strong>OutofMemoryError</strong>(메모리 부족), <strong>StackOverflowError</strong>(재귀호출의 깊음) 등으로 인해 발생할 수 있다.
- Exception은 예외 상황을 말하며 코드 작성, 프로그램 수행 중에 발생한다. 개발자는 이에 대한 처리를 통해 해결할 수 있고, 컴파일시 예외인 Checked Exception과 런타임시 예외인 Unchecked Exception으로 나뉜다.

그렇다면 <span style="background-color:#fff5b1">컴파일</span>과 <span style="background-color:#fff5b1">런타임</span>은 무엇인가?

## Compile

컴파일은 JavaCode(.Java)로 이루어진 코드들을 <span style="background-color:#fff5b1">자바 컴파일러</span>를 통해 ByteCode(.class)로 변환하는 과정이다.

> 발생할 수 있는 예외를 <span style="background-color:#FFE6E6">Checked Exception</span>이라고 한다.
> 예를 들어 Syntax Error, Type 체크 예외 등이 있으며 문제를 일으킬 수 있는 코드라인을 지적해줌으로 개발자가 이를 인지한다.

충분히 예상 가능한 예외 처리이기 때문에, 처리를 강제한다.

## Runtime

변환된 ByteCode(.class)를 <span style="background-color:#fff5b1">자바 엔진(JVM)</span>을 통해 BinaryCode(기계어)로 변환하여 프로그램을 실행하는 과정이다.

> 발생할 수 있는 예외을 <span style="background-color:#FFE6E6">Unchecked Exception</span>이라고 한다.
> 예를 들어 분모가 0이 된다던가, 배열의 범위를 벗어난다던가(ArrayIndexOutOfBoundsException)등의 예외 처리가 있다. 이는 이미 성공적으로 컴파일 되었다고 판단하여 프로그램을 실행했더라도 실행중에 발생할 수 있는 예외에 대한 처리를 말한다.

어떤 오류가 어떤 상황에서 발생되지 예측할 수 없기 때문에, <strong>로그</strong>를 꼭 표기해야하며 처리를 강제하지는 않는다.

---

# Checked Execption

예를 들어 존재하지 않는 파일을 읽는 경우에 대한 예외 처리 예시다. Ex) FileNotFoundException

```Java
private static void checkedExceptionWithThrows() {
    File file = new File("not_existing_file.txt");
    FileInputStream stream = new FileInputStream(file);
}
```

> Exception에 대한 핸들링이 존재하지 않는다.
> 만약 오타가 생기거나, 존재하지 않는 파일을 불러오는 등의 예외 상황이 존재할 수 있음으로 Exception 처리가 필요하다.

```Java
private static void checkedExceptionWithTryCatch() {
    File file = new File("not_existing_file.txt");
    try {
        FileInputStream stream = new FileInputStream(file);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
}
```

> - `try` 블록은 예외가 발생할 수 있는 코드의 시작을 명시하며 해당 블록에서는 파일을 열 때 예외가 발생할 수 있다.
> - `catch` 블록은 FileNotFoundException이 발생하면 이를 처리하기 위해 잡아내는 블록이다.
> - `printStackTrace`를 이용하여 예외를 출력하고 Stack Trace를 표시한다. 주로 디버깅에 사용되며, 어떤 예외가 발생했는지와 그 예외가 발생한 곳을 추적하는데 도움을 준다.

```Java
private static void checkedExceptionWithTryCatchThrowAgain() throws FileNotFoundException {
    File file = new File("not_existing_file.txt");
    try {
        FileInputStream stream = new FileInputStream(file);
    } catch (FileNotFoundException e) {
        // 예외를 다시 throw하여 다른 호출부로 전달
        throw e;
    }
}
```

> - `catch` 블록에서 예외를 직접 처리하지 않고 throw을 통해 예외를 다시 전달하고 있다. 따라서 <strong>'checkedExceptionWithTryCatchThrowAgain'</strong> 메소드를 호출하는 곳에서 <span style="background-color:#fff5b1">반드시</span> FileNotFoundExecption을 처리해야한다.

---

# Unchecked Execption

예를 들어 아래와 같이 null 값 참조와 같은 예외 처리가 있다. Ex) NullPointerException

```Java
private static void uncheckedExceptionWithTryCatch() {
		String str = null;
    try {
		    str = str.toUpperCase();
		    System.out.println(str);
    } catch (NullPointerException e) {
        e.printStackTrace();
    }
}
```

> - `str.toUpperCase()` 는 null 값을 참조 하고 있기 때문에 해당 메소드를 호출 시 NullPointerException이 발생할 수 있다.
> - `e.printStackTrace()`를 통해 예외 발생에 대한 디버깅과 추적하는데 도움을 준다.

---

# 정리

만약, Unchecked 예외도 컴파일러가 처리하게 된다면, 거의 모든 코드에 try-catch 블록을 넣어야 할 것이다. 예를 들어 모든 참조 변수는 NullPointerException이 발생할 가능성이 있다. 하지만, 모든 참조 변수에 예외처리를 해야한다면 데이터를 다루게 될 때 마다 코드의 길이가 길어지게 될 것이다. 그렇기 때문에 예외처리를 강제하는 것과 강제하지 않는 것으로 나누게 된다.

또한, 예외 처리를 잘하기 위해서는 상황과 범주에 맞게 Custom한 Exception을 정의하여 적합한 요소에 사용하는 방법이 필요하다. 다양한 상황을 개발자 나름대로 예측하여 어느 정도 범주화 한다면, 예상하지 못한 예외 발생으로 인해 겪는 어려움을 어느 정도 피할 수 있다고 생각한다.

예외 처리에 대해 잘 정리된 [블로그](https://hbase.tistory.com/157)를 첨부하며 글을 마치겠다.

> ## 참조
>
> [Java 기본 문법 및 JVM 구성](https://alike-catboat-47c.notion.site/14-01-Java-JVM-228e87528a784fa389993d4d718652bc)
>
> [자바에서 예외를 처리하는 방법](https://velog.io/@pearl0725/자바에서-예외를-처리하는-방법)
>
> [Checked Exception vs Unchecked Exception 정리](https://devlog-wjdrbs96.tistory.com/351)

👉🏻[Java Exception: Checked, Unchecked, Custom 실습](https://cliff-snowstorm-2ff.notion.site/JAVA-Exception-65b4b2a7adf848bbbb92b7a45c5229f9?pvs=4)
