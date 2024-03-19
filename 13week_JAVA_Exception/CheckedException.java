package sec01.exam1;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;



public class CheckedException {
    public static void main(String[] args) {
        checkedExceptionWithThrows();
        checkedExceptionWithTryCatch();
    }

    private static void checkedExceptionWithThrows() {
        File file = new File("not_existing_file.txt");
//        FileInputStream stream = new FileInputStream(file);
    }

    private static void checkedExceptionWithTryCatch() {
        File file = new File("not_existing_file.txt");
        try {
            FileInputStream stream = new FileInputStream(file);
            System.out.println("File opened successfully.");
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + e.getMessage());
            e.printStackTrace();
        }
    }

}