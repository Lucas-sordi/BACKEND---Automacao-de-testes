@feature_Client
Feature: Client

    @get_Meets_Clients
    Scenario: (GET) List Meets Clients
        When request all Meets registered Clients
        Then should return the response 'get_Client' status 200
        And should return a non-null body

    @get_Frontend_Clients
    Scenario: (GET) List Front-end registered Clients
        When request all Front-end registered Clients
        Then should return the response 'get_Client' and status 200
        And should return a non-null body
    
    @get_Compare_Client
    Scenario: (GET) Compare Front-end and Meets data
        When compare all registered Clients on the platform with front-end clients
        Then should return clients who have the same data info
        And should return that clients are registered at both endpoints
        And should return an Array with wrong Clients