# GraphQL Schema Diagrams - Draw.io Instructions

## How to Create Visual Diagrams

1. Open `Untitled Diagram.drawio` in the images folder
2. Use draw.io to create the following diagrams:

### Diagram 1: Schema Overview
- Central box: "GraphQL Schema"
- Arrows to: Types, Queries, Mutations, Subscriptions
- Show relationships between components

### Diagram 2: Type System
- Hierarchical tree showing all GraphQL types
- Scalar types at bottom
- Object types with their fields
- Relationships between types

### Diagram 3: Schema vs REST
- Side-by-side comparison
- REST: Multiple endpoints, fixed responses
- GraphQL: Single endpoint, flexible queries

### Diagram 4: Resolution Flow
- Flowchart showing: Query → Schema → Validation → Resolver → Data → Response

### Diagram 5: Country Schema Example
- Visual representation of the Country type
- Show fields and their types
- Connect to Query type

## ASCII Art Diagrams (for quick reference)

### Schema Structure:
```
Schema
├── Query Root
│   ├── countries: [Country]
│   └── country(code: ID): Country
├── Mutation Root (future)
└── Types
    └── Country
        ├── code: ID!
        ├── name: String!
        ├── capital: String
        ├── currency: String
        └── phone: String
```

### Query Flow:
```
Client Query
    ↓
Schema Validation
    ↓
Resolver Execution
    ↓
Data Fetching
    ↓
JSON Response
```

### Type Relationships:
```
Query --returns--> [Country]
Country --has fields--> code, name, capital, etc.
Resolver --implements--> Query.countries
Data --feeds--> Resolver
```