package com.cognizant.app.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Represents a client delivery project and its assigned employees.
 */
public class Project {
    private final int id;
    private final String clientName;
    private final String projectName;
    private final BigDecimal budget;
    private final List<Employee> assignedEmployees = new ArrayList<>();

    public Project(int id, String clientName, String projectName, BigDecimal budget) {
        if (id <= 0) {
            throw new IllegalArgumentException("Project id must be positive.");
        }
        this.id = id;
        this.clientName = requireText(clientName, "clientName");
        this.projectName = requireText(projectName, "projectName");
        this.budget = requirePositive(budget, "budget");
    }

    public int getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getProjectName() {
        return projectName;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public List<Employee> getAssignedEmployees() {
        return Collections.unmodifiableList(assignedEmployees);
    }

    public void assignEmployee(Employee employee) {
        Objects.requireNonNull(employee, "employee must not be null");
        boolean alreadyAssigned = assignedEmployees.stream()
                .anyMatch(existingEmployee -> existingEmployee.getId() == employee.getId());
        if (!alreadyAssigned) {
            assignedEmployees.add(employee);
        }
    }

    private static String requireText(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(fieldName + " must not be blank.");
        }
        return value.trim();
    }

    private static BigDecimal requirePositive(BigDecimal value, String fieldName) {
        Objects.requireNonNull(value, fieldName + " must not be null");
        if (value.signum() <= 0) {
            throw new IllegalArgumentException(fieldName + " must be positive.");
        }
        return value;
    }

    @Override
    public String toString() {
        return "%d - %s for %s".formatted(id, projectName, clientName);
    }
}
