@feature_Opportunities
Feature: Opportunities

    @get_Meets_Opportunities
    Scenario: (GET) List Meets Opportunities
        When request all Meets registered Opportunities
        Then should return the response 'schema_name' status 200

    @get_Frontend_Opportunities
    Scenario: (GET) List Front-end registered Opportunities
        When request all Front-end registered Opportunities
        Then should return the response 'schema_name' status 200