Feature: Opportunities

    @get_opportunities
    Scenario: (GET) List Meets opportunities
        When request to access Meets registered opportunities
        Then should return the response 'schema_name' status 200
        And should return a non-null body

    @get_front_opportunities
    Scenario: (GET) List front-end opportunities
        When request to access front-end registered opportunities
        Then should return the response 'schema_name' status 200
        And should return a non-null body

    @post_opportunity
    Scenario: (POST) Save opportunity
        When save a new front-end created opportunity
        Then should return the response 'schema_name' status 200
        And should return the correct saved opportunity