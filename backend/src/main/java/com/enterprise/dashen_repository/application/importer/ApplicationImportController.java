package com.enterprise.dashen_repository.application.importer;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/application-import")
public class ApplicationImportController {

    private final ApplicationImportService service;

    public ApplicationImportController(ApplicationImportService service) {
        this.service = service;
    }

    @PostMapping("/import")
    public ApplicationImportResult importApplications(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        return service.importApplications(file);

    }

}