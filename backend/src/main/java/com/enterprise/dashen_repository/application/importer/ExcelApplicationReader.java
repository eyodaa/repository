package com.enterprise.dashen_repository.application.importer;

import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ExcelApplicationReader {

    public List<ApplicationImportRow> read(MultipartFile file) throws IOException {

        List<ApplicationImportRow> rows = new ArrayList<>();

        Workbook workbook = WorkbookFactory.create(file.getInputStream());

        Sheet sheet = workbook.getSheetAt(0);

        DataFormatter formatter = new DataFormatter();

        // Skip header row
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            Row row = sheet.getRow(i);

            if (row == null) {
                continue;
            }

            ApplicationImportRow dto = new ApplicationImportRow();

            dto.setCode(getCell(row, 0, formatter));
            dto.setName(getCell(row, 1, formatter));
            dto.setFunction(getCell(row, 2, formatter));
            dto.setBusinessOwner(getCell(row, 3, formatter));
            dto.setTechnicalOwner(getCell(row, 4, formatter));
            dto.setBusinessCriticality(getCell(row, 5, formatter));
            dto.setVendor(getCell(row, 6, formatter));
            dto.setVersion(getCell(row, 7, formatter));
            dto.setApplicationType(getCell(row, 8, formatter));
            dto.setDeploymentModel(getCell(row, 9, formatter));
            dto.setHostingLocation(getCell(row, 10, formatter));
            dto.setTechnologyStack(getCell(row, 11, formatter));
            dto.setDatabaseTechnology(getCell(row, 12, formatter));
            dto.setOperatingSystem(getCell(row, 13, formatter));
            dto.setAuthenticationMethod(getCell(row, 14, formatter));
            dto.setLifecycleStatus(getCell(row, 15, formatter));
            dto.setSupportGroup(getCell(row, 16, formatter));
            dto.setEnvironment(getCell(row, 17, formatter));
            dto.setUrl(getCell(row, 18, formatter));
            dto.setDocumentation(getCell(row, 19, formatter));

            rows.add(dto);
        }

        workbook.close();

        return rows;
    }

    private String getCell(Row row, int index, DataFormatter formatter) {

        Cell cell = row.getCell(index);

        if (cell == null) {
            return null;
        }

        return formatter.formatCellValue(cell).trim();
    }
}