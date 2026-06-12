package runner;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import io.qameta.allure.karate.AllureKarate;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PetStoreRunner {

    @Test
    void testPetStore() {
        Results results = Runner
            .path("classpath:petstore")
            .hook(new AllureKarate())
            .outputCucumberJson(false)
            .parallel(1);

        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
