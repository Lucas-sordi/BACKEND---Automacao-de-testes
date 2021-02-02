Feature: Union

    @get_repeated_clients
    Scenario: (GET) List all repeated clients
        When search for all clients with repeated emails
        Then should return the response 'schema_name' status 200
        And should return a non-null body
        And should return the correct number of repeated clients

    @post_repeated_clients
    Scenario: (POST) Save repeated client
        When save clientes with repeated emails
        Then should return the response 'schema_name' status 200
        And should return the correct saved client