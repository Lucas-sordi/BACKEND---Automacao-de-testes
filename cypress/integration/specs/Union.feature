@feature_Union
Feature: Union

    @post_Union
    Scenario: (POST) Save Clients with repeated Names
        When save Clients with repeated names
        Then should return the response 'schema_name' status 200
        And should return a non-null body