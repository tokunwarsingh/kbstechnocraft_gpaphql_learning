# GraphQL Schema Diagrams - Episode 3

## Interactive Visual Guide
📁 **[graphql-schema-visual.html](graphql-schema-visual.html)** - Interactive HTML page with visual schema explanations

## Text-Based Diagrams
📄 **[graphql-schema-guide.txt](graphql-schema-guide.txt)** - ASCII art diagrams and explanations

## Diagram Creation Instructions
📋 **[diagram-instructions.md](diagram-instructions.md)** - How to create visual diagrams using draw.io

## Existing Diagrams
🖼️ **ER_DIAGRAM.png** - Entity Relationship diagram for college management system
🖼️ **GraphQL-Architecture.png** - General GraphQL architecture diagram
📐 **Untitled Diagram.drawio** - Draw.io file for creating custom diagrams

---

# Relational Diagram for College Student Management System

This diagram shows entities and their relationships in the GraphQL data model.

---

## Entities and Attributes

### Colleges
- **id** (PK)
- name
- location
- establishedYear
- accreditation

### Students
- **id** (PK)
- name
- email
- collegeId (FK → Colleges.id)
- enrollmentYear
- major
- dateOfBirth

### Subjects
- **id** (PK)
- name
- code
- description
- department

### Classes
- **id** (PK)
- title
- collegeId (FK → Colleges.id)
- subjectId (FK → Subjects.id)
- schedule
- instructor

### Marks
- **studentId** (PK, FK → Students.id)
- **classId** (PK, FK → Classes.id)
- score
- grade
- examDate

---

## Relationships

- **College 1:N Students**  
  One college can have many students. Each student belongs to one college.

- **College 1:N Classes**  
  One college offers many classes. Each class belongs to one college.

- **Subject 1:N Classes**  
  One subject can be taught in many classes. Each class is linked to one subject.

- **Student N:M Classes (via Marks)**  
  Students enroll in multiple classes and receive marks.  
  The Marks entity is a join table representing many-to-many relationship between Students and Classes with additional attributes (score, grade, examDate).

---

# ER Diagram for College Student Management System

```mermaid
erDiagram
    COLLEGES {
        string id PK "Primary Key"
        string name
        string location
        int establishedYear
        string accreditation
    }

    STUDENTS {
        string id PK "Primary Key"
        string name
        string email
        string collegeId FK "Foreign Key to COLLEGES.id"
        int enrollmentYear
        string major
        date dateOfBirth
    }

    SUBJECTS {
        string id PK "Primary Key"
        string name
        string code
        string description
        string department
    }

    CLASSES {
        string id PK "Primary Key"
        string title
        string collegeId FK "Foreign Key to COLLEGES.id"
        string subjectId FK "Foreign Key to SUBJECTS.id"
        string schedule
        string instructor
    }

    MARKS {
        string studentId PK FK "Composite PK & FK to STUDENTS.id"
        string classId PK FK "Composite PK & FK to CLASSES.id"
        int score
        string grade
        date examDate
    }

    COLLEGES ||--o{ STUDENTS : "has"
    COLLEGES ||--o{ CLASSES : "offers"
    SUBJECTS ||--o{ CLASSES : "includes"
    STUDENTS ||--o{ MARKS : "receives"
    CLASSES ||--o{ MARKS : "contains"
```

---

# GraphQL Schema Diagrams

This section contains diagrams explaining GraphQL schema concepts for Episode 3.

## What is a GraphQL Schema?

A GraphQL schema is a blueprint that defines the structure of your API. It specifies:
- What data types are available
- What queries and mutations can be performed
- The relationships between different data types

```mermaid
graph TD
    A[Client Request] --> B[GraphQL Schema]
    B --> C[Validation]
    C --> D[Resolver Execution]
    D --> E[Response]

    style B fill:#e1f5fe
    style C fill:#f3e5f5
    style D fill:#e8f5e8
```

## GraphQL Schema Components

```mermaid
graph TD
    Schema[GraphQL Schema] --> Types[Object Types]
    Schema --> Queries[Query Type]
    Schema --> Mutations[Mutation Type]
    Schema --> Subscriptions[Subscription Type]

    Types --> User[User Type]
    Types --> Post[Post Type]
    Types --> Comment[Comment Type]

    User --> UserFields[name, email, id]
    Post --> PostFields[title, content, author]
    Comment --> CommentFields[text, author, post]

    Queries --> GetUsers[getUsers]
    Queries --> GetPosts[getPosts]

    Mutations --> CreateUser[createUser]
    Mutations --> CreatePost[createPost]

    style Schema fill:#bbdefb
    style Types fill:#c8e6c9
    style Queries fill:#fff3e0
    style Mutations fill:#ffcdd2
```

## Why Do We Need GraphQL Schemas?

```mermaid
graph TD
    A[Without Schema] --> B[Runtime Errors]
    A --> C[Inconsistent API]
    A --> D[No Type Safety]

    E[With Schema] --> F[Compile-time Validation]
    E --> G[Self-documenting API]
    E --> H[Type Safety]
    E --> I[Better Developer Experience]

    style A fill:#ffcdd2
    style E fill:#c8e6c9
    style F fill:#e8f5e8
    style G fill:#e8f5e8
    style H fill:#e8f5e8
    style I fill:#e8f5e8
```

## Schema Definition Language (SDL) Example

```graphql
type Country {
  code: ID!
  name: String!
  capital: String
  currency: String
  phone: String
}

type Query {
  countries: [Country!]!
  country(code: ID!): Country
}

type Mutation {
  createCountry(input: CreateCountryInput!): Country!
}

input CreateCountryInput {
  name: String!
  capital: String
  currency: String
  phone: String
}
```

## Schema Flow Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Schema
    participant Resolver
    participant Data

    Client->>Schema: Send GraphQL Query
    Schema->>Schema: Validate Query Structure
    Schema->>Resolver: Execute Resolvers
    Resolver->>Data: Fetch Data
    Data-->>Resolver: Return Data
    Resolver-->>Schema: Format Response
    Schema-->>Client: Send JSON Response
```

## Type System Hierarchy

```mermaid
graph TD
    A[GraphQL Type System] --> B[Scalar Types]
    A --> C[Object Types]
    A --> D[Interface Types]
    A --> E[Union Types]
    A --> F[Enum Types]
    A --> G[Input Types]

    B --> B1[String]
    B --> B2[Int]
    B --> B3[Float]
    B --> B4[Boolean]
    B --> B5[ID]

    C --> C1[User]
    C --> C2[Post]
    C --> C3[Comment]

    D --> D1[Node]
    D --> D2[Resource]

    E --> E1[SearchResult]

    F --> F1[Status]
    F --> F2[Role]

    G --> G1[CreateUserInput]
    G --> G2[UpdatePostInput]

    style A fill:#e3f2fd
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f1f8e9
    style G fill:#e0f2f1
```

## Schema vs Traditional REST API

```mermaid
graph TD
    subgraph "Traditional REST API"
        A1[GET /users] --> A2[Returns all user fields]
        A3[GET /users/123] --> A4[Returns user 123]
        A5[POST /users] --> A6[Creates new user]
    end

    subgraph "GraphQL Schema"
        B1[type Query] --> B2[users: [User]]
        B1 --> B3[user(id: ID!): User]
        B4[type Mutation] --> B5[createUser(input: CreateUserInput!): User]
        B6[type User] --> B7[id, name, email, posts]
        B8[type CreateUserInput] --> B9[name, email]
    end

    style A1 fill:#ffcdd2
    style B1 fill:#c8e6c9
    style B4 fill:#c8e6c9
    style B6 fill:#c8e6c9
    style B8 fill:#c8e6c9
```

## Benefits of GraphQL Schema

```mermaid
mindmap
  root((GraphQL Schema Benefits))
    Type Safety
      Compile-time validation
      Catch errors early
      Better IDE support
    Self-Documentation
      API documentation
      Field descriptions
      Deprecation notices
    Developer Experience
      Auto-completion
      Schema introspection
      Better tooling
    API Evolution
      Backward compatibility
      Versionless APIs
      Gradual migration
    Performance
      Selective field fetching
      Reduced over-fetching
      Optimized queries
```

---

# Episode 3: GraphQL Schema & Type System Diagrams

## Country Schema Example

```mermaid
classDiagram
    class Country {
        +String code
        +String name
        +String capital
        +String currency
        +String phone
        +getCountries()
        +getCountry(code)
    }

    class Query {
        +countries(): [Country]
        +country(code: ID): Country
    }

    class Mutation {
        +createCountry(input): Country
    }

    Query --> Country : returns
    Mutation --> Country : creates
```

## Schema Resolution Flow

```mermaid
stateDiagram-v2
    [*] --> QueryReceived
    QueryReceived --> SchemaValidation: Parse Query
    SchemaValidation --> ResolverExecution: Valid Query
    SchemaValidation --> ErrorResponse: Invalid Query
    ResolverExecution --> DataFetching: Execute Resolvers
    DataFetching --> ResponseFormatting: Get Results
    ResponseFormatting --> JSONResponse: Format Output
    JSONResponse --> [*]
    ErrorResponse --> [*]

    note right of SchemaValidation
        Validates query structure
        against schema definition
    end note

    note right of ResolverExecution
        Maps schema fields
        to data fetching functions
    end note
```