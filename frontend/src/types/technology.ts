export interface Technology {
    // ==========================
    // COMMON ARTIFACT FIELDS
    // ==========================

    id: number;
    code: string;
    name: string;
    description: string;
    artifactType: string;

    // ==========================
    // CLASSIFICATION
    // ==========================

    technologyType: string;
    vendor: string;
    productName: string;
    version: string;

    // ==========================
    // DEPLOYMENT
    // ==========================

    deploymentModel: string;
    platform: string;
    licenseType: string;

    // ==========================
    // LIFECYCLE
    // ==========================

    lifecycleStatus: string;
    supportStatus: string;
    endOfSupportDate: string;
    endOfLifeDate: string;

    // ==========================
    // GOVERNANCE
    // ==========================

    owner: string;
    supportGroup: string;

    // ==========================
    // REFERENCES
    // ==========================

    website: string;
    documentation: string;
}