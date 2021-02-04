@feature_Client
Feature: Client

    @get_Valid_Emails
    Scenario: (GET) List Valid Emails
        When request all Valid Emails
        Then should return the response 'get_Valid_Emails' status 200
        And should return a non-null body

    @get_Meets_Clients
    Scenario: (GET) List Meets Clients
        When request all Meets registered Clients
        Then should return the response 'get_Client' status 200
        And should return a non-null body

    @get_Frontend_Clients
    Scenario: (GET) List Front-end registered Clients
        When request all Front-end registered Clients
        Then should return the response 'get_Client' status 200
        And should return a non-null body