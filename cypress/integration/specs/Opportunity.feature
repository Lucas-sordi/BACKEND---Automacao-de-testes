@feature_Opportunity
Feature: Opportunity

    @get_Meets_Opportunities
    Scenario: (GET) List Meets Opportunities
        When request all Meets registered Opportunities
        Then should return the response 'get_Opportunity' status 200
        And should return a non-null body

    @get_Frontend_Opportunities
    Scenario: (GET) List Front-end registered Opportunities
        When request all Front-end registered Opportunities
        Then should return the response 'get_Opportunity' status 200
        And should return a non-null body

    @get_Compare_Oportunity
    Scenario: (GET) Compare Front-end and Meets data
        When compare all registered Opportunities on the platform with front-end
        Then should return opportunities that have the same data info
        And should return that opportunities are registered at both endpoints
        And should return an Array with wrong Opportunities