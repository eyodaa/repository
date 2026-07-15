package com.enterprise.dashen_repository.application.application_controllor;

import com.enterprise.dashen_repository.application.application_service.ApplicationAssessmentService;
import com.enterprise.dashen_repository.application.dto.ApplicationAssessmentRequest;
import com.enterprise.dashen_repository.application.dto.ApplicationAssessmentResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application-assessments")
@CrossOrigin(origins = "*")
public class ApplicationAssessmentController {

    private final ApplicationAssessmentService service;

    public ApplicationAssessmentController(ApplicationAssessmentService service) {
        this.service = service;
    }

    @PostMapping
    public ApplicationAssessmentResponse create(
            @RequestBody ApplicationAssessmentRequest request) {

        return service.create(request);
    }

    @GetMapping
    public List<ApplicationAssessmentResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ApplicationAssessmentResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/application/{applicationId}")
    public ApplicationAssessmentResponse getByApplication(
            @PathVariable Long applicationId) {

        return service.findByApplicationId(applicationId);
    }
}
