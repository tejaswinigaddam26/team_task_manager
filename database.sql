-- Team Task Manager Database Schema
-- Note: Spring Boot JPA will automatically create these tables.
-- This script provides manual setup and sample data.

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS team_task_manager;
USE team_task_manager;

-- 2. Sample Data (Optional)
-- Passwords are BCrypt hashed for 'password123'
-- $2a$10$8.UnVuG9HHgffUDAlk8qn.9clQEhnT.9clQEhnT.9clQEhnT.9clQE

-- Clean existing data (uncomment if needed)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE tasks;
-- TRUNCATE TABLE projects;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Insert Admins and Members
INSERT INTO users (name, email, password, role) VALUES 
('System Admin', 'admin@taskmanager.com', '$2a$10$8.UnVuG9HHgffUDAlk8qn.9clQEhnT.9clQEhnT.9clQEhnT.9clQE', 'ADMIN'),
('Sarah Johnson', 'sarah@taskmanager.com', '$2a$10$8.UnVuG9HHgffUDAlk8qn.9clQEhnT.9clQEhnT.9clQEhnT.9clQE', 'MEMBER'),
('Michael Chen', 'michael@taskmanager.com', '$2a$10$8.UnVuG9HHgffUDAlk8qn.9clQEhnT.9clQEhnT.9clQEhnT.9clQE', 'MEMBER');

-- Insert Sample Projects
INSERT INTO projects (project_name, description, created_by, created_at) VALUES 
('Website Redesign', 'Complete overhaul of the company website with modern UI.', 1, NOW()),
('Mobile App v2', 'Adding new features to the cross-platform mobile application.', 1, NOW());

-- Insert Sample Tasks
INSERT INTO tasks (title, description, status, priority, due_date, assigned_to, project_id, created_at) VALUES 
('Fix Header Layout', 'Alignment issues on mobile devices.', 'PENDING', 'HIGH', DATE_ADD(CURDATE(), INTERVAL 5 DAY), 2, 1, NOW()),
('Implement Auth API', 'Backend endpoints for login/signup.', 'IN_PROGRESS', 'MEDIUM', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 3, 2, NOW()),
('Update Icons', 'Replace old SVG icons with Lucide icons.', 'COMPLETED', 'LOW', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 2, 1, NOW());
