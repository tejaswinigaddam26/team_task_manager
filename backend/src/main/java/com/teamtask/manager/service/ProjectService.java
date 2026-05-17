package com.teamtask.manager.service;

import com.teamtask.manager.dto.ProjectRequest;
import com.teamtask.manager.model.Project;
import com.teamtask.manager.model.User;
import com.teamtask.manager.repository.ProjectRepository;
import com.teamtask.manager.repository.UserRepository;
import com.teamtask.manager.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRepository userRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project createProject(ProjectRequest projectRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User creator = userRepository.findById(userDetails.getId()).orElseThrow();

        Project project = Project.builder()
                .projectName(projectRequest.getProjectName())
                .description(projectRequest.getDescription())
                .createdBy(creator)
                .build();

        return projectRepository.save(project);
    }

    public Project updateProject(Long id, ProjectRequest projectRequest) {
        Project project = getProjectById(id);
        project.setProjectName(projectRequest.getProjectName());
        project.setDescription(projectRequest.getDescription());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
