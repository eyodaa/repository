package com.enterprise.dashen_repository.graph.graph_dto;

public class ImpactSummary {

    private int totalAffected;

    private int applications;

    private int technologies;

    private int capabilities;

    private int processes;

    private int maxDepth;

    private String overallRisk;

    public ImpactSummary() {
    }

    public int getTotalAffected() {
        return totalAffected;
    }

    public void setTotalAffected(int totalAffected) {
        this.totalAffected = totalAffected;
    }

    public int getApplications() {
        return applications;
    }

    public void setApplications(int applications) {
        this.applications = applications;
    }

    public int getTechnologies() {
        return technologies;
    }

    public void setTechnologies(int technologies) {
        this.technologies = technologies;
    }

    public int getCapabilities() {
        return capabilities;
    }

    public void setCapabilities(int capabilities) {
        this.capabilities = capabilities;
    }

    public int getProcesses() {
        return processes;
    }

    public void setProcesses(int processes) {
        this.processes = processes;
    }

    public int getMaxDepth() {
        return maxDepth;
    }

    public void setMaxDepth(int maxDepth) {
        this.maxDepth = maxDepth;
    }

    public String getOverallRisk() {
        return overallRisk;
    }

    public void setOverallRisk(String overallRisk) {
        this.overallRisk = overallRisk;
    }
}