# Configuration Setup Guide

## Overview
This document describes the proper configuration implementation for the NestJS application using environment variables and the `@nestjs/config` package.

## Files Created/Modified

### 1. **Environment Files**
- `.env` - Local environment variables (add to .gitignore)
- `.env.example` - Template for environment variables (commit to repo)

### 2. **Configuration Files** (`src/config/`)
- `app.config.ts` - Application configuration (port, environment, API token)
- `database.config.ts` - Database configuration (MySQL connection settings)
- `config.module.ts` - NestJS ConfigModule setup

### 3. **Updated Files**
- `src/data-source.ts` - Now reads from environment variables
- `src/app.module.ts` - Imports ConfigModule globally
- `src/main.ts` - Uses ConfigService for port and logging

## Environment Variables

### Application Variables
```
NODE_ENV=development          # development, production, test
APP_PORT=3000                 # Application port
API_TOKEN=your-secret-token   # API authentication token
```

### Database Variables
```
DB_TYPE=mysql                 # Database type
DB_HOST=localhost             # Database host
DB_PORT=3306                  # Database port
DB_USERNAME=root              # Database username
DB_PASSWORD=password          # Database password
DB_DATABASE=nestjs_mysql_1    # Database name
DB_SYNCHRONIZE=false          # Auto-sync schema (use migrations instead)
DB_LOGGING=true               # Enable SQL logging
```

## How to Use

### 1. Setup Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual values
```

### 2. Access Configuration in Services
```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  getPort() {
    return this.configService.get<number>('APP_PORT');
  }

  getDbHost() {
    return this.configService.get<string>('DB_HOST');
  }
}
```

### 3. Run Application
```bash
npm run start:dev
```

The application will now:
- Load environment variables from `.env`
- Use the configured port (default: 3000)
- Connect to MySQL with configured credentials
- Display startup information with port and environment

## Benefits

✅ **Security** - Sensitive data not in code
✅ **Flexibility** - Easy environment switching (dev/prod)
✅ **Maintainability** - Centralized configuration
✅ **Type Safety** - TypeScript support for config values
✅ **Migrations** - Works seamlessly with TypeORM migrations

## Migration Commands

```bash
# Generate migration
npm run migration:generate -- CreateUserTable

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Best Practices

1. **Never commit .env** - Add to .gitignore
2. **Always commit .env.example** - For team reference
3. **Use meaningful variable names** - Prefix with module (DB_, API_, etc.)
4. **Document all variables** - In .env.example
5. **Validate on startup** - Consider adding validation schema

