# BuildFolio — Project Diagrams (Mermaid)

This file contains the Mermaid code for the **Entity-Relationship (ER) Diagram**, **System Architecture Diagram**, and **Flowchart / User Journey Diagram**. You can paste these code blocks into Markdown previewers, Notion, GitHub, or [mermaid.live](https://mermaid.live).

---

## 1. Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    USER ||--o{ PROJECT : "creates / owns"
    USER ||--o{ COMMENT : "authors"
    USER ||--o{ PROJECT : "likes"
    PROJECT ||--o{ COMMENT : "contains"
    PROJECT ||--o{ CONTRIBUTOR : "has"
    USER ||--o{ OTP : "requests verification for"

    USER {
        string _id PK "Unique User Identifier"
        string name "Full Name"
        string email UK "Unique Email Address"
        string password "Salted Bcrypt Hash"
        date createdAt "Timestamp"
        date updatedAt "Timestamp"
    }

    PROJECT {
        string _id PK "Unique Project Identifier"
        string userId FK "References USER._id"
        string title "Project Title"
        string description "Markdown Description"
        string impact "Project Impact / Outcomes"
        string studentName "Primary Author Name"
        string teamName "Optional Team Name"
        string coverImage "Cover Image URL / Path"
        string_array screenshots "Array of Screenshot URLs"
        string category "Category (Web, AI, Mobile, etc.)"
        string_array techStack "Technologies Used"
        string demoUrl "Live Demo URL"
        string youtubeUrl "Video Demo URL"
        string githubUrl "Source Repository URL"
        string_array likes FK "Array of USER._id"
        date createdAt "Timestamp"
        date updatedAt "Timestamp"
    }

    COMMENT {
        string _id PK "Unique Comment Identifier"
        string user FK "References USER._id"
        string userName "Author Display Name"
        string text "Comment Content"
        date createdAt "Timestamp"
    }

    CONTRIBUTOR {
        string name "Contributor Full Name"
        string role "Role (Frontend, Backend, Design, etc.)"
    }

    OTP {
        string _id PK "Unique Token Identifier"
        string email "Target User Email"
        string otp "Hashed / Secure OTP Code"
        date createdAt "Timestamp (TTL Index: 300s)"
    }
```

---

## 2. System Architecture Diagram

```mermaid
flowchart TD
    subgraph ClientTier["Client / Presentation Tier"]
        Browser["User Web Browser"]
        NextApp["Next.js 16 Web Application<br/>(React 19, Turbopack, App Router)"]
        ApolloCl["Apollo Client<br/>(In-Memory Cache & GraphQL Client)"]
        Browser <-->|"HTTPS / UI Interactions"| NextApp
        NextApp <-->|"Client State & Cache"| ApolloCl
    end

    subgraph GatewayTier["Ingress & Container Network"]
        Ingress["NGINX Ingress Controller / Reverse Proxy<br/>(:80 / :443)"]
        DockerNet["Isolated Container Mesh Network"]
        Browser -.->|"http://buildfolio.local"| Ingress
        Ingress -->|"Route /"| NextApp
        Ingress -->|"Route /graphql"| NestApp
    end

    subgraph AppTier["Application / Backend Tier"]
        NestApp["NestJS 12 API Server<br/>(Modular TypeScript Architecture)"]
        ApolloSrv["Apollo Server 5.5<br/>(@nestjs/graphql Code-First Engine)"]
        AuthModule["Auth & Security Engine<br/>(Passport.js, JWT, Bcrypt)"]
        EmailService["Nodemailer Service<br/>(Transactional OTP Dispatch)"]
        SentryMonitoring["Sentry APM & Profiling<br/>(Error Tracking & Traces)"]

        ApolloCl <-->|"GraphQL over HTTP POST<br/>(Queries & Mutations)"| ApolloSrv
        ApolloSrv <--> NestApp
        NestApp --> AuthModule
        NestApp --> EmailService
        NestApp -.-> SentryMonitoring
    end

    subgraph DataTier["Data Persistence Tier"]
        MongooseODM["Mongoose 9 ODM<br/>(Schemas, Type Guards, Validation)"]
        MongoDB[("MongoDB 7+ Database<br/>(Collections: Users, Projects, OTP, Comments)")]
        Volume[("Persistent Storage Volume<br/>(mongodb_data)")]

        NestApp <--> MongooseODM
        MongooseODM <-->|"Wire Protocol (:27017)"| MongoDB
        MongoDB <--> Volume
    end

    classDef client fill:#e0f2fe,stroke:#0284c7,stroke-width:2px;
    classDef app fill:#fef3c7,stroke:#d97706,stroke-width:2px;
    classDef data fill:#dcfce7,stroke:#16a34a,stroke-width:2px;
    classDef net fill:#f3e8ff,stroke:#9333ea,stroke-width:2px;

    class Browser,NextApp,ApolloCl client;
    class NestApp,ApolloSrv,AuthModule,EmailService,SentryMonitoring app;
    class MongooseODM,MongoDB,Volume data;
    class Ingress,DockerNet net;
```

---

## 3. Flowchart: User Journey & Project Lifecycle

```mermaid
flowchart TD
    Start([User Visits BuildFolio]) --> CheckAuth{Is User Authenticated?}

    %% Public Discovery
    CheckAuth -- No --> BrowseProjects["Browse Showcase Gallery<br/>(Explore Projects, Filter by Tag, View Demos)"]
    BrowseProjects --> ViewDetail["View Single Project Details<br/>(Screenshots, Description, Video Demos)"]
    ViewDetail --> NeedAction{Wants to Post / Like / Comment?}
    NeedAction -- No --> ContinueBrowse[Continue Browsing]
    NeedAction -- Yes --> AuthPrompt[Prompt Login / Registration]

    %% Authentication Flow
    AuthPrompt --> RegisterOrLogin{New or Existing?}
    RegisterOrLogin -- New User --> EnterRegDetails["Enter Name, Email, Password"]
    EnterRegDetails --> SendOTP["System Sends Email OTP via Nodemailer"]
    SendOTP --> VerifyOTP{OTP Valid & Not Expired?}
    VerifyOTP -- No --> OTPError["Display Error / Resend OTP"] --> SendOTP
    VerifyOTP -- Yes --> AccountCreated["Account Created & JWT Issued"]

    RegisterOrLogin -- Existing User --> EnterLogin["Enter Email & Password"]
    EnterLogin --> ValidateCreds{Credentials Valid?}
    ValidateCreds -- No --> LoginError["Display Invalid Credentials"] --> EnterLogin
    ValidateCreds -- Yes --> IssueToken["Generate JWT Token"]

    AccountCreated --> AuthenticatedSession
    IssueToken --> AuthenticatedSession[Authenticated Session Stored in Apollo Client]

    %% Authenticated Operations
    CheckAuth -- Yes --> AuthenticatedSession
    AuthenticatedSession --> Dashboard["Access Student Dashboard"]

    Dashboard --> ActionChoice{Select Action}
    
    ActionChoice -- "Create Project" --> FillForm["Submit Project Form<br/>(Title, Tech Stack, Markdown Details, GitHub/Demo Links)"]
    FillForm --> ValidateSchema{Validation Passed?}
    ValidateSchema -- No --> FixErrors["Show Validation Feedback"] --> FillForm
    ValidateSchema -- Yes --> SaveProject["GraphQL Mutation: createProject<br/>Saved in MongoDB"]
    SaveProject --> GalleryUpdated["Project Displayed in CSA Showcase"]

    ActionChoice -- "Engage" --> LikeOrComment["Toggle Like or Post Comment on Projects"]
    LikeOrComment --> UpdateCache["GraphQL Mutation: likeProject / addComment<br/>Optimistic UI Cache Update"]

    ActionChoice -- "Manage Profile" --> UpdateProfile["Edit Student Bio & Project Catalog"]
```

