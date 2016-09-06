Feature: Returns a tree in the form of JSON
    In order for a user to see a tree
    an arrayof related people must be returned

    Scenario: Return a list of people
        Given there is a family in the system
        When the user asks for 3 generateions of a clild
        Then a 3 generational tree will be returned