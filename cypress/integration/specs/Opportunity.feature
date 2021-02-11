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
        Then should validate Opportunities who have same name on both Endpoints
        And should return Opportunities who have only registered name on Front-end Endpoint
        And should validate if an Opportunity got an Error