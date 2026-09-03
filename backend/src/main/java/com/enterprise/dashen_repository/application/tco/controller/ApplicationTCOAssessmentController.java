package com.enterprise.dashen_repository.application.tco.controller;

import com.enterprise.dashen_repository.application.tco.dto.CreateTCOAssessmentRequest;
import com.enterprise.dashen_repository.application.tco.dto.TCOAssessmentResponse;
import com.enterprise.dashen_repository.application.tco.service.ApplicationTCOAssessmentService;
import com.enterprise.dashen_repository.application.tco.service.TCOEngine;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tco/assessments")
public class ApplicationTCOAssessmentController {

    private final ApplicationTCOAssessmentService assessmentService;
    private final TCOEngine tcoEngine;

    public ApplicationTCOAssessmentController(
            ApplicationTCOAssessmentService assessmentService,
            TCOEngine tcoEngine) {

        this.assessmentService = assessmentService;
        this.tcoEngine = tcoEngine;
    }

    /**
     * Create a new yearly TCO assessment
     */
    @PostMapping
    public ResponseEntity<TCOAssessmentResponse> createAssessment(
            @Valid @RequestBody CreateTCOAssessmentRequest request) {

        TCOAssessmentResponse response = assessmentService.createAssessment(request);

        return ResponseEntity
                .created(URI.create("/api/tco/assessments/" + response.getId()))
                .body(response);
    }

    /**
     * Get assessment by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<TCOAssessmentResponse> getAssessment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                assessmentService.getAssessment(id));
    }

    /**
     * Get all assessments for an application
     */
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<TCOAssessmentResponse>> getApplicationAssessments(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                assessmentService.getApplicationAssessments(applicationId));
    }

    /**
     * Calculate TCO summary and scores
     */
    @PostMapping("/{assessmentId}/calculate")
    public ResponseEntity<String> calculateAssessment(
            @PathVariable Long assessmentId) {

        tcoEngine.calculateAssessment(assessmentId);

        return ResponseEntity.ok("TCO calculation completed successfully.");
    }

    /**
     * Delete assessment
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(
            @PathVariable Long id) {

        assessmentService.deleteAssessment(id);

        return ResponseEntity.noContent().build();
    }

    /**
     * Update an existing yearly assessment
     */
    @PutMapping("/{id}")
    public ResponseEntity<TCOAssessmentResponse> updateAssessment(
            @PathVariable Long id,
            @Valid @RequestBody CreateTCOAssessmentRequest request) {

        return ResponseEntity.ok(
                assessmentService.updateAssessment(id, request));
    }

    /**
     * Get assessment by application and year
     */
    @GetMapping("/application/{applicationId}/year/{year}")
    public ResponseEntity<TCOAssessmentResponse> getAssessmentByYear(
            @PathVariable Long applicationId,
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                assessmentService.getAssessment(applicationId, year));
    }
}