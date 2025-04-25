# MedVault - Healthcare Management System

A full-stack healthcare management system with a React TypeScript frontend and Django backend.

## Project Structure

```
MV/
├── frontend/    # React TypeScript frontend
└── MedVault/   # Django backend
```

## Backend Setup (MedVault)

1. Navigate to the backend directory:
   ```bash
   cd MedVault
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux/MacOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser (admin):
   ```bash
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Environment Variables

### Backend
Create a `.env` file in the `MedVault` directory with the following variables:
```env
DEBUG=True
SECRET_KEY=your_secret_key_here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend
Create a `.env` file in the `frontend` directory with:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## Features

- User Authentication
- Medical Records Management
- Appointment Scheduling
- Doctor-Patient Communication
- File Upload and Management
- User Profile Management

## Development Guidelines

1. Always activate the virtual environment when working on the backend
2. Run `npm install` after pulling changes that modify package.json
3. Follow the existing code style and conventions
4. Write meaningful commit messages

## Contributing

1. Create a new branch for each feature/bugfix
2. Write clear commit messages
3. Test your changes thoroughly
4. Submit a pull request

## License

[Add your license here]