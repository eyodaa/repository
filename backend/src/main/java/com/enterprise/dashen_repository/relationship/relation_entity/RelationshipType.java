package com.enterprise.dashen_repository.relationship.relation_entity;

public enum RelationshipType {

    // Business Relationships
    SUPPORTS,
    SUPPORTED_BY,

    REALIZES,
    REALIZED_BY,

    ENABLES,
    ENABLED_BY,

    ASSOCIATED_WITH,

    // Technical Relationships
    USES,
    USED_BY,

    DEPENDS_ON,
    REQUIRED_BY,

    HOSTS,
    HOSTED_ON,

    CONNECTS_TO,
    CONNECTED_TO,

    CONSUMES,
    PROVIDED_BY,

    IMPLEMENTS,
    IMPLEMENTED_BY,

    // Organizational Relationships
    OWNS,
    OWNED_BY,

    MANAGES,
    MANAGED_BY,

    BELONGS_TO,
    CONTAINS
}