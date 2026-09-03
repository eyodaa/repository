export interface Application {

    id: number;

    code: string;

    name: string;

    description: string;

    artifactType: string;

    function: string;

    businessOwner: string;

    technicalOwner: string;

    businessCriticality: string;

    vendor: string;

    version: string;

    applicationType: string;

    deploymentModel: string;

    hostingLocation: string;

    technologyStack: string;

    databaseTechnology: string;

    operatingSystem: string;

    authenticationMethod: string;

    lifecycleStatus: string;

    supportGroup: string;

    environment: string;

    url: string;

    documentation: string;

    goLiveDate: string;

    retirementDate: string;
    department?: string;

}
