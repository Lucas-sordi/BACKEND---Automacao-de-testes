Feature: Client

    @get_valid_emails
    Scenario: (GET) List valid emails
        When request to access all valid emails
        Then should return the response 'schema_name' status 200
        And should return a non-null body

    @get_clients
    Scenario: (GET) List Meets clients
        When request to search for all Meets registered clients
        Then should return the response 'schema_name' status 200
        And should return a non-null body

    @get_front_clients
    Scenario: (GET) List front-end registered customers
        When request to search for all front-end registered clients
        Then should return the response 'schema_name' status 200
        And should return a non-null body

    @post_client
    Scenario: (POST) Send client
        When request to save a new front-end created client
        Then should return the response 'schema_name' status 200
        And should return the correct sent customer