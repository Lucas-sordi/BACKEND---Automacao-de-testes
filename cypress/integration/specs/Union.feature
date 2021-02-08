@feature_Union
Feature: Union

    @post_Union
    Scenario: (POST) Save Clients with repeated emails
        When search and find clients with repeated emails
        Then should return the response status 200
        And save the clients on the page