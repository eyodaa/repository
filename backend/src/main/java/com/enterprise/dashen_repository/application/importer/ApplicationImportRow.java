package com.enterprise.dashen_repository.application.importer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationImportRow {

    private String code;

    private String name;

    private String function;

    private String businessOwner;

    private String technicalOwner;

    private String businessCriticality;

    private String vendor;

    private String version;

    private String applicationType;

    private String deploymentModel;

    private String hostingLocation;

    private String technologyStack;

    private String databaseTechnology;

    private String operatingSystem;

    private String authenticationMethod;

    private String lifecycleStatus;

    private String supportGroup;

    private String environment;

    private String url;

    private String documentation;

}
