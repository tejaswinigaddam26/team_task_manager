package com.teamtask.manager.dto;

import com.teamtask.manager.model.Task.TaskPriority;
import com.teamtask.manager.model.Task.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {
    @NotBlank
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
    private Long assignedToId;
    @NotNull
    private Long projectId;
}
