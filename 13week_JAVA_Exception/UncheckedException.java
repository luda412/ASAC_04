package sec01.exam1;

public class UncheckedException {
    public static void main(String[] args) {
        uncheckedExceptionWithTryCatch1();
        uncheckedExceptionWithTryCatch2();
    }

    private static void uncheckedExceptionWithTryCatch1() {
        String str = null;
        str = str.toUpperCase();
        System.out.println(str);
    }
    private static void uncheckedExceptionWithTryCatch2() {
        String str = null;
        try {
            str = str.toUpperCase();
            System.out.println(str);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }
}
