@feature_Client
Feature: Client

    @get_Meets_Clients
    Scenario: (GET) List Meets Clients
        When request all Meets registered Clients
        Then should return the response 'get_Client' status 200

    @get_Frontend_Clients
    Scenario: (GET) List Front-end registered Clients
        When request all Front-end registered Clients
        Then should return the response 'get_Client' and status 200