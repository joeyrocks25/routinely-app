This is where you could create connections to your database(s) like Redis, MySQL, MongoDB etc.

You could then require the necessary configuration & keys to initiate a connection here. This will also make it easier for you manage everything related to your Database connection in one file, like adding listeners around successful connections, errors and disconnects, etc.

Later, these connectors could be loaded under initialization files as needed.