export const EXAMPLE_JSON_BEFORE = `{
  "id": 1,
  "email": "ada@example.com",
  "role": "admin",
  "profile": { "name": "Ada" }
}`;

export const EXAMPLE_JSON_AFTER = `{
  "id": "1",
  "role": "admin",
  "profile": { "name": "Ada", "locale": "en" },
  "status": "active"
}`;

export const EXAMPLE_OPENAPI_BEFORE = `openapi: 3.0.3
info:
  title: Demo API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      responses:
        "200":
          description: OK
  /users/{id}:
    get:
      summary: Get user
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: OK
components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id:
          type: integer
        email:
          type: string
`;

export const EXAMPLE_OPENAPI_AFTER = `openapi: 3.0.3
info:
  title: Demo API
  version: 1.1.0
paths:
  /users:
    get:
      summary: List users
      deprecated: true
      responses:
        "200":
          description: OK
  /v2/users:
    get:
      summary: List users v2
      parameters:
        - name: limit
          in: query
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: OK
components:
  schemas:
    User:
      type: object
      required: [id, email, status]
      properties:
        id:
          type: string
        email:
          type: string
        status:
          type: string
`;
