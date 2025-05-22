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

