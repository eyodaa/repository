package com.enterprise.dashen_repository.application.application_controllor;

import com.enterprise.dashen_repository.application.application_service.ApplicationAnalysisService;
import com.enterprise.dashen_repository.application.dto.ApplicationAnalysisResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/application-analysis")
@CrossOrigin(origins = "*")
public class ApplicationAnalysisController {

    private final ApplicationAnalysisService service;

    public ApplicationAnalysisController(
            ApplicationAnalysisService service) {

        this.service = service;
    }

    @GetMapping("/{applicationId}")
    public ApplicationAnalysisResponse analyze(
            @PathVariable Long applicationId) {

        return service.analyze(applicationId);
    }
}