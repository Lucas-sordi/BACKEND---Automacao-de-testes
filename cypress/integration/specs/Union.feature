@feature_Union
Feature: Union
    
    @post_Union
    Scenario: (POST) Save Clients with repeated Names
        When compare Clients to get those with repeated Names
        Then save those Clients on Union with response status 201