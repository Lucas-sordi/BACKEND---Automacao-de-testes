@feature_Union
Feature: Union

    @get_Repeated_Name_Clients
    Scenario: (GET) List Clients with repeated Name
        When request all Clients with repeated Name
        Then should return the response 'schema_name' status 200