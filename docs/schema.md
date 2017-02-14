All tables have id and timestamp columns.

**users**

| column name     | data type | details                        |
|-----------------|-----------|--------------------------------|
| username        | string    | not null, indexed, unique      |
| password_digest | string    | not null                       |
| session_token   | string    | not null, indexed, unique      |
| avatar_id       | integer   | not null, foreign key (images) |

**channels**

| column name     | data type | details                               |
|-----------------|-----------|---------------------------------------|
| name            | string    | not null, indexed, unique             |
| description     | text      |                                       |
| topic           | string    |                                       |
| dm_hash         | string    | indexed                               |
| channel_type_id | integer   | not null, foreign key (channel_types)  |

**channel_types**

| column name | data type | details          |
|-------------|-----------|------------------|
| type        | string    | not null, unique |

**messages**

| column name | data type | details                          |
|-------------|-----------|----------------------------------|
| author_id   | integer   | not null, foreign key (users)    |
| channel_id  | integer   | not null, foreign key (channels) |
| content     | text      | not null                         |

**subscriptions**

(A uniqueness constraint is put on user_id and channel_id together.)

| column name | data type | details                          |
|-------------|-----------|----------------------------------|
| user_id     | integer   | not null, foreign key (users)    |
| channel_id  | integer   | not null, foreign key (channels) |
