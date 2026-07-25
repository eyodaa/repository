package com.enterprise.dashen_repository.application.importer;

import java.util.ArrayList;
import java.util.List;

public class ApplicationImportResult {

    private int imported;

    private int skipped;

    private List<String> errors = new ArrayList<>();

    public int getImported() {
        return imported;
    }

    public void setImported(int imported) {
        this.imported = imported;
    }

    public int getSkipped() {
        return skipped;
    }

    public void setSkipped(int skipped) {
        this.skipped = skipped;
    }

    public List<String> getErrors() {
        return errors;
    }
}