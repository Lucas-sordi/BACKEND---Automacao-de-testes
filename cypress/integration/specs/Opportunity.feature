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
        When request to compare the registered opportunities
        Then should return the correct data