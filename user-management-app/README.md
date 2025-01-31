# User Management Application

This web application is built with Angular 19.0.1 and provides an intuitive interface for complete user management.

## Main Features

- Complete user management (CRUD)
- Intuitive admin dashboard
- User authentication and authorization
- Role and permission management
- Responsive and modern interface

## Prerequisites

- Node.js (version 18 or higher)
- Angular CLI 19.0.1
- Internet connection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gabustos756/user-management.git
```

2. Install dependencies:
```bash
npm install
```

## Available Commands

### Development

```bash
ng serve
```
Starts the development server at `http://localhost:4200/`

### Build

```bash
ng build
```
Generates the production version in the `dist/` directory

### Testing

```bash
ng test
```
Runs unit tests with Karma

```bash
ng e2e
```
Runs end-to-end tests

### Other Useful Commands

```bash
ng generate component [name]    # Generates a new component
ng generate service [name]      # Generates a new service
ng generate guard [name]        # Generates a new guard
```

## Project Structure

```
src/
├── app/
│   ├── components/       # Application components
│   ├── services/        # User management services
│   ├── guards/          # Authentication and authorization guards
│   ├── models/          # Interfaces and models
│   └── shared/          # Shared components and utilities
├── assets/              # Static resources
└── environments/        # Environment configurations
```

## Usage Guide

1. **Login**: Access with your credentials on the main page
2. **Control Panel**: Manage users from the main dashboard
3. **User Management**:
   - Create new users
   - Edit existing information
   - Assign roles and permissions
   - Delete users

## Support

To report issues or request new features, please create an issue in the project repository.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [LICENSE]. See the `LICENSE` file for details.
