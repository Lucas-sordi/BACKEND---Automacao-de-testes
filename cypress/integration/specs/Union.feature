@feature_Union
Feature: Union
    
    @post_Union
    Scenario: (POST) Save Clients with repeated Emails
        When compare Clients to get those with repeated Emails
        Then save those Clients on Union with response status 201