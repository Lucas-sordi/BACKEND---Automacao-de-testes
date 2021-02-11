@feature_Union
Feature: Union
    
    @post_Union
    Scenario: (POST) Save Clients with repeated Names
        When compare Clients and get the ones with repeated names
        Then save those Clients on Union and return the response 'post_Union' status 201