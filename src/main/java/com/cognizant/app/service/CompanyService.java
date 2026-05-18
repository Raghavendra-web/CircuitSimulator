package com.cognizant.app.service;

import com.cognizant.app.model.Department;
import com.cognizant.app.model.Employee;
import com.cognizant.app.model.Project;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Coordinates employees, departments, and projects for the sample application.
 */
public class CompanyService {
    private final Map<Integer, Employee> employees = new LinkedHashMap<>();
    private final Map<Integer, Project> projects = new LinkedHashMap<>();

    public Employee addEmployee(Employee employee) {
        if (employees.containsKey(employee.getId())) {
            throw new IllegalArgumentException("Employee id already exists: " + employee.getId());
        }
        employees.put(employee.getId(), employee);
        return employee;
    }

    public Project addProject(Project project) {
        if (projects.containsKey(project.getId())) {
            throw new IllegalArgumentException("Project id already exists: " + project.getId());
        }
        projects.put(project.getId(), project);
        return project;
    }

    public Optional<Employee> findEmployeeById(int employeeId) {
        return Optional.ofNullable(employees.get(employeeId));
    }

    public Optional<Project> findProjectById(int projectId) {
        return Optional.ofNullable(projects.get(projectId));
    }

    public void assignEmployeeToProject(int employeeId, int projectId) {
        Employee employee = findEmployeeById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + employeeId));
        Project project = findProjectById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + projectId));
        project.assignEmployee(employee);
    }

    public List<Employee> getEmployees() {
        return Collections.unmodifiableList(new ArrayList<>(employees.values()));
    }

    public List<Project> getProjects() {
        return Collections.unmodifiableList(new ArrayList<>(projects.values()));
    }

    public Map<Department, List<Employee>> employeesByDepartment() {
        return employees.values().stream()
                .collect(Collectors.groupingBy(
                        Employee::getDepartment,
                        LinkedHashMap::new,
                        Collectors.toUnmodifiableList()));
    }

    public BigDecimal totalAnnualSalary() {
        return employees.values().stream()
                .map(Employee::getAnnualSalary)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal totalProjectBudget() {
        return projects.values().stream()
                .map(Project::getBudget)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
