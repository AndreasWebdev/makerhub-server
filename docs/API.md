![](readme-logo.png)

## MakerHub Studio Application Server
This is the application server for the makerhub.studio app. It is the component between the client and the MySQL server.

---
### Documentation

#### POST /security/register
Creates a new user.

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| username | The username for the new user | No | |
| password | The password for the new user | No | |
| email | The email for the new user | No |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | User was created successfully |
| 500 | Server error |
| 409 | Username or email is already used! |
| 422 | Required parameter missing! |
| 429 | Rate limit reached |

**Rate Limit**

5 Requests per 60 minutes

#### POST /security/login
Creates a security key which is used in other api calls for verification.

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| username | The username of the user | No | |
| password | The password of the user | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Security key was generated and is found in the body |
| 403 | Password was wrong |
| 404 | User does not exist |
| 422 | Required parameter missing! |
| 429 | Rate limit reached |
| 500 | Server error |

**Rate Limit**

5 Requests per 15 minutes

#### POST /security/logout
Invalidates the security key.

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Security key was invalidated |
| 403 | Password was wrong |
| 404 | User does not exist |
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /security/ping
Used to check if a security key is still valid.

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Security key was invalidated |
| 403 | Security key is not valid |
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /security/me
Get the current user by security key

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | User data in body (passwords are undefined for security reasons) |
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /queue/toggle
Changes the queueOpen value of a user

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |
| newStatus | The new queueOpen status  | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Queue toggled successfully! |
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /queue/pending
Get the current queue of a user by security key

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Queue data in body |
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /queue/complete
Moves a queue item from a users queue to the users queue history

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| key | The security key of the user | No | |
| levelID | The ID of the queue item | No | |
| completedTime | The timestamp of completition of this queue item | Yes | 0 |
| highscoreTime | The time in seconds for the completion of the queue item | Yes | 0 |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Queue item was moved |
| 400 | Queue item does not exist
| 422 | Required parameter missing! |
| 500 | Server error |

#### POST /queue/add
Adds an item to a users queue

**Parameters**

| Parameter | Value | Optional? | Default |
| --- | --- | --- | --- |
| forUser | The ID of the queue's user | No | |
| levelCode | The SMM2 level code | No | |
| levelTitle | The SMM2 level title | No | |
| levelCreator | The SMM2 level creator | No | |
| requestedBy | A string that identifies the person inserting the queue item | Yes | NULL |
| comment | A comment from the person inserting the queue item | Yes | NULL |

**Returns**

| HTTP Code | Explaination |
| --- | --- |
| 200 | Queue item was inserted |
| 403 | Queue is closed and does not accept new items right now |
| 422 | Required parameter missing! |
| 429 | Rate limit reached |
| 500 | Server error |

**Rate Limit**

10 Requests per 5 minutes