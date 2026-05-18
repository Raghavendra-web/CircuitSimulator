package com.cognizant.app.model;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * Represents a Cognizant associate in the company application.
 */
public class Employee {
    private final int id;
    private final String name;
    private final String role;
    private final Department department;
    private final BigDecimal annualSalary;

    public Employee(int id, String name, String role, Department department, BigDecimal annualSalary) {
        if (id <= 0) {
            throw new IllegalArgumentException("Employee id must be positive.");
        }
        this.id = id;
        this.name = requireText(name, "name");
        this.role = requireText(role, "role");
        this.department = Objects.requireNonNull(department, "department must not be null");
        this.annualSalary = requirePositive(annualSalary, "annualSalary");
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public Department getDepartment() {
        return department;
    }

    public BigDecimal getAnnualSalary() {
        return annualSalary;
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
        return "%d - %s (%s, %s)".formatted(id, name, role, department);
    }
}
