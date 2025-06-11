# TechStories Application Documentation

## Overview
TechStories is a full-stack Next.js application that allows users to share and discuss technology-related stories. The application features user authentication, story posting, commenting, voting, and an inspirational tech quotes service.

## Architecture

### Tech Stack
- **Frontend**: Next.js with TypeScript
- **Backend**: tRPC API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library, Cypress

### Key Components

#### Frontend Components
- `QuoteBar`: Displays inspirational tech quotes from the quotes microservice
- `MDXComponents`: Renders Markdown content with custom styling
- `CommentForm`: Handles comment submission and validation
- `NewPostForm`: Manages story creation and submission

#### Backend Services
1. **Main Application Server**
   - Handles user authentication
   - Manages posts and comments
   - Processes votes
   - Serves API endpoints

2. **Quotes Microservice**
   - Standalone Node.js service
   - Provides random tech-related quotes
   - Intentionally includes artificial delays and errors for testing purposes
   - Error rate: 0.5%
   - Delay rate: 5% (3000ms delay)

### Database Schema

#### Core Tables
- `User`: User accounts and profile information
- `Post`: Story posts with title, content, and metadata
- `Comment`: User comments on posts
- `VotesOnPosts`: Tracks post votes
- `VotesOnComments`: Tracks comment votes

## Testing Strategy

### Unit Tests
Located in `src/__tests__/components/`, these tests focus on individual component behavior:
- Rendering tests
- User interaction tests
- State management tests

### Integration Tests
Located in `src/__tests__/integration/`, these tests verify system interactions:
- `post-comment.test.ts`: Tests post and comment functionality
  - Includes one intentionally flaky test for demonstration
  - Tests concurrent voting behavior
  - Validates data constraints

### End-to-End Tests
Located in `cypress/e2e/`, these tests cover full user workflows:
- User registration and authentication
- Story posting and editing
- Commenting and voting
- Quote display and refresh

### Test Categories

1. **Reliability Tests**
   - Concurrent operation handling
   - Database constraints
   - Input validation

2. **Performance Tests**
   - Response time monitoring
   - Load handling
   - Timeout scenarios

3. **Error Handling Tests**
   - Invalid data submission
   - API error responses
   - Edge cases

## Development Setup

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (local or containerized)

### Environment Configuration
Required environment variables:
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start services:
   ```bash
   docker-compose up -d
   ```

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Running Tests
- Unit and integration tests:
  ```bash
  npm test
  ```
- End-to-end tests:
  ```bash
  npm run cypress
  ```

## Deployment

The application is configured for deployment on various platforms:

### Container Deployment
- Uses multi-stage Dockerfile
- Includes Docker Compose for local development
- Supports container orchestration

### CI/CD Pipeline
- GitHub Actions workflow
- Automated testing
- Deployment triggers
- Environment management

## Monitoring and Debugging

### Logging
- Application logs via console
- Error tracking
- Performance monitoring

### Metrics
- API response times
- Error rates
- User activity

## Known Issues and Limitations

1. **Quotes Service**
   - Intentional 0.5% error rate
   - Random 3-second delays (5% of requests)
   - Used for testing error handling

2. **Concurrent Operations**
   - Vote operations may conflict
   - Handled via database constraints

3. **Test Flakiness**
   - One intentionally flaky test in post-comment integration tests
   - Used for demonstration purposes
   - Should be monitored in CI pipeline

## Future Improvements

1. **Performance**
   - Implement caching
   - Optimize database queries
   - Add rate limiting

2. **Features**
   - User profiles
   - Rich text editor
   - Image uploads
   - Tag system

3. **Testing**
   - Expand E2E coverage
   - Add visual regression tests
   - Implement load testing

## Contributing

See `CONTRIBUTING.md` for detailed contribution guidelines.

## License

This project is licensed under the terms specified in `LICENSE.md`.
