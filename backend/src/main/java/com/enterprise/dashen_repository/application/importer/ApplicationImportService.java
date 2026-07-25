package com.enterprise.dashen_repository.application.importer;

import com.enterprise.dashen_repository.application.application_entity.Application;
import com.enterprise.dashen_repository.application.application_repository.ApplicationRepository;
import com.enterprise.dashen_repository.artifact.entity.ArtifactType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ApplicationImportService {

    private final ExcelApplicationReader reader;
    private final ApplicationRepository applicationRepository;

    public ApplicationImportService(
            ExcelApplicationReader reader,
            ApplicationRepository applicationRepository) {

        this.reader = reader;
        this.applicationRepository = applicationRepository;
    }

    public List<ApplicationImportRow> preview(MultipartFile file)
            throws IOException {

        return reader.read(file);

    }

    @Transactional
    public ApplicationImportResult importApplications(MultipartFile file)
            throws IOException {

        List<ApplicationImportRow> rows = reader.read(file);

        ApplicationImportResult result = new ApplicationImportResult();

        int imported = 0;
        int skipped = 0;

        for (ApplicationImportRow row : rows) {

            try {

                if (row.getCode() == null || row.getCode().isBlank()) {
                    skipped++;
                    result.getErrors().add("Missing application code.");
                    continue;
                }

                if (applicationRepository.existsByCode(row.getCode())) {
                    skipped++;
                    result.getErrors().add(
                            "Application already exists: " + row.getCode());
                    continue;
                }

                Application app = new Application();

                // ==========================
                // Artifact
                // ==========================

                app.setArtifactType(ArtifactType.APPLICATION);
                app.setCode(row.getCode());
                app.setName(row.getName());
                app.setDescription(row.getDocumentation());

                // ==========================
                // Business Information
                // ==========================

                app.setFunction(row.getFunction());
                app.setBusinessOwner(row.getBusinessOwner());
                app.setTechnicalOwner(row.getTechnicalOwner());
                app.setBusinessCriticality(row.getBusinessCriticality());

                // ==========================
                // Application Information
                // ==========================

                app.setVendor(row.getVendor());
                app.setVersion(row.getVersion());
                app.setApplicationType(row.getApplicationType());
                app.setDeploymentModel(row.getDeploymentModel());
                app.setHostingLocation(row.getHostingLocation());

                // ==========================
                // Technical Information
                // ==========================

                app.setTechnologyStack(row.getTechnologyStack());
                app.setDatabaseTechnology(row.getDatabaseTechnology());
                app.setOperatingSystem(row.getOperatingSystem());
                app.setAuthenticationMethod(row.getAuthenticationMethod());

                // ==========================
                // Operations
                // ==========================

                app.setLifecycleStatus(row.getLifecycleStatus());
                app.setSupportGroup(row.getSupportGroup());
                app.setEnvironment(row.getEnvironment());

                // ==========================
                // References
                // ==========================

                app.setUrl(row.getUrl());
                app.setDocumentation(row.getDocumentation());

                applicationRepository.save(app);

                imported++;

            } catch (Exception ex) {

                skipped++;

                result.getErrors().add(
                        row.getCode() + " : " + ex.getMessage());

            }

        }

        result.setImported(imported);
        result.setSkipped(skipped);

        return result;
    }
}