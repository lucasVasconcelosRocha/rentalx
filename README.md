# RentalX

A car rental backend API built with Node.js, TypeScript, and Express. RentalX provides a complete rental management system with user authentication, car inventory management, rental operations (booking and return), and admin controls for managing cars and specifications.

## Stack

- **Language:** TypeScript
- **Framework / Runtime:** Node.js + Express 4.17
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Notable Libraries:**
  - `bcryptjs` - Password hashing
  - `Multer` - File uploads
  - `Redis` - Caching
  - `AWS SDK` - S3 storage
  - `Swagger UI Express` - API documentation
  - `Sentry` - Error tracking
  - `Nodemailer` - Email notifications
  - `rate-limiter-flexible` - Rate limiting

## Project Structure

```
src/
  modules/              Domain modules (cars, rentals, accounts, etc.)
    cars/               Car inventory management
    rentals/            Rental booking and return operations
    accounts/           User management and authentication
    categories/         Car categories
    specifications/     Car specifications
  shared/
    infra/
      http/
        routes/         Express route definitions
        middlewares/    Auth, admin checks, rate limiting
        server.ts       Server entry point (port 3333)
        app.ts          Express app setup with middleware
      typeorm/
        migrations/     Database migrations
        seed/           Database seeding (admin user)
    container/          Dependency injection setup (tsyringe)
    errors/             Custom error handling (AppError)
    config/             Upload and configuration files
swagger.json            API documentation
```

## How It Works

HTTP requests arrive at port 3333 and pass through rate limiting and CORS middleware before routing to domain modules based on the path. Each module (cars, rentals, accounts) follows a use-case pattern with controllers, services, and repositories. 

- **Authentication:** JWT tokens validated by the `ensureAuthenticated` middleware
- **Authorization:** Admin endpoints are gated by the `ensureAdmin` middleware
- **Storage:** PostgreSQL for data persistence via TypeORM, AWS S3 for file uploads
- **Error Handling:** Global error handler with optional Sentry integration
- **Caching:** Redis for performance optimization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (or use Docker)
- Redis (optional, or use Docker)
- AWS credentials (for S3 storage)
- Nodemailer/Email credentials (for sending emails)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/lucasVasconcelosRocha/rentalx.git
cd rentalx
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your configuration:

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET=your_bucket_name
AWS_BUCKET_REGION=your_region
AWS_BUCKET_URL=your_bucket_url

# Email Configuration
MAIL_PROVIDER=ses
APP_EMAIL=your_email@example.com
APP_EMAIL_PASS=your_password
FORGOT_MAIL_URL=http://localhost:3000/reset-password

# API URLs
APP_API_URL=http://localhost:3333
ORIGIN_LOCAL=http://localhost:3000
ORIGIN_PRD=https://yourdomain.com

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Sentry (Optional)
SENTRY_DSN=your_sentry_dsn
```

### 3. Configure Database

```bash
cp ormconfig.example.json ormconfig.json
```

Edit `ormconfig.json` with your database credentials if not using Docker.

### 4. Start Services with Docker Compose

```bash
docker-compose -f docker-compose.example.yml up -d
```

This will start PostgreSQL. Verify it's running:

```bash
docker ps
```

### 5. Run Database Migrations

```bash
npm run typeorm migration:run
```

### 6. Seed Admin User (Optional)

```bash
npm run seed:admin
```

This creates a default admin user for testing.

## Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will be available at `http://localhost:3333`.

### Production Build

```bash
npm run build
```

### API Documentation

Once the server is running, access the Swagger API documentation at:

```
http://localhost:3333/api-docs
```

## Testing

Run all tests:

```bash
npm run test
```

Tests are configured with Jest and ts-jest. Test files should match the pattern `**/*.spec.ts`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload and inspect mode |
| `npm run build` | Build TypeScript to JavaScript in `dist/` directory |
| `npm run typeorm` | Run TypeORM CLI commands |
| `npm run test` | Run Jest test suite |
| `npm run seed:admin` | Create default admin user in database |

## API Routes

### Authentication
- `POST /authenticate` - User login

### Users
- `POST /users` - Create new user
- `GET /users/profile` - Get user profile (authenticated)
- `PATCH /users/avatar` - Upload user avatar (authenticated)

### Cars
- `POST /cars` - Create car (admin only)
- `GET /cars/available` - List available cars
- `POST /cars/specifications/:id` - Add specification to car (admin only)
- `POST /cars/images/:id` - Upload car images (admin only)

### Rentals
- `POST /rentals` - Create rental (authenticated)
- `POST /rentals/devolution/:id` - Return rental (authenticated)
- `GET /rentals/user` - List user rentals (authenticated)

### Categories
- `POST /categories` - Create category (admin only)
- `GET /categories` - List categories

### Specifications
- `POST /specifications` - Create specification (admin only)
- `GET /specifications` - List specifications

### Password Recovery
- `POST /password/forgot` - Request password reset
- `POST /password/reset` - Reset password

## Database Schema

A database diagram is included in the repository as `diagramaDB.png`. It shows the relationships between:
- Users (accounts)
- Cars
- Rentals
- Categories
- Specifications
- Car Images

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `docker ps`
- Check credentials in `ormconfig.json`
- Ensure the database `rentx` is created

### Port Already in Use
If port 3333 is already in use, you can modify it in `src/shared/infra/http/server.ts`

### Migration Errors
```bash
npm run typeorm migration:revert
npm run typeorm migration:run
```

### Redis Connection Issues
If Redis is not running, install and start it:

```bash
# macOS
brew install redis
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis:latest
```

## Contributing

Feel free to fork, create a branch, make your changes, and submit a pull request.

## License

MIT

## Author

Lucas Vasconcelos Rocha

---

For more information or issues, please open an issue on the [GitHub repository](https://github.com/lucasVasconcelosRocha/rentalx).
