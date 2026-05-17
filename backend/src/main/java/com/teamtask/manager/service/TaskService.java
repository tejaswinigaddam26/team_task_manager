package com.teamtask.manager.service;

import com.teamtask.manager.dto.TaskRequest;
import com.teamtask.manager.model.Project;
import com.teamtask.manager.model.Task;
import com.teamtask.manager.model.User;
import com.teamtask.manager.repository.ProjectRepository;
import com.teamtask.manager.repository.TaskRepository;
import com.teamtask.manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    public Task createTask(TaskRequest taskRequest) {
        Project project = projectRepository.findById(taskRequest.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignedTo = null;
        if (taskRequest.getAssignedToId() != null) {
            assignedTo = userRepository.findById(taskRequest.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        Task task = Task.builder()
                .title(taskRequest.getTitle())
                .description(taskRequest.getDescription())
                .status(taskRequest.getStatus() != null ? taskRequest.getStatus() : Task.TaskStatus.PENDING)
                .priority(taskRequest.getPriority() != null ? taskRequest.getPriority() : Task.TaskPriority.MEDIUM)
                .dueDate(taskRequest.getDueDate())
                .assignedTo(assignedTo)
                .project(project)
                .build();

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskRequest taskRequest) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (taskRequest.getTitle() != null) task.setTitle(taskRequest.getTitle());
        if (taskRequest.getDescription() != null) task.setDescription(taskRequest.getDescription());
        if (taskRequest.getStatus() != null) task.setStatus(taskRequest.getStatus());
        if (taskRequest.getPriority() != null) task.setPriority(taskRequest.getPriority());
        if (taskRequest.getDueDate() != null) task.setDueDate(taskRequest.getDueDate());

        if (taskRequest.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(taskRequest.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(assignedTo);
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
