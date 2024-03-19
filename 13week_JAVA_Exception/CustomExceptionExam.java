package sec01.exam1;

class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}
class UnderZeroAgeException extends RuntimeException{
    public UnderZeroAgeException(String message){
        super(message);
    }
}

public class CustomExceptionExam {
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (CustomException e) {
            System.out.println("예외 발생: " + e.getMessage());
            e.printStackTrace();
        } catch (UnderZeroAgeException e){
            System.out.println("0세 예외 발생: "+e.getMessage());
            e.printStackTrace();
        }

    }

    public static void validateAge(int age) throws CustomException {
        if(age <= 0){
            throw new UnderZeroAgeException("나이가 0세 이하입니다.");
        }
        if (age < 18) {
            throw new CustomException("나이가 18세 미만입니다.");
        }
    }
}