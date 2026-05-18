package com.cognizant.app.service;

import com.cognizant.app.model.Department;
import com.cognizant.app.model.Employee;
import com.cognizant.app.model.Project;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CompanyServiceTest {
    @Test
    void addsEmployeesAndCalculatesTotalSalary() {
        CompanyService service = new CompanyService();
        service.addEmployee(new Employee(1, "Alex Morgan", "Developer", Department.DIGITAL_ENGINEERING, new BigDecimal("80000")));
        service.addEmployee(new Employee(2, "Priya Nair", "Consultant", Department.CONSULTING, new BigDecimal("90000")));

        assertEquals(2, service.getEmployees().size());
        assertEquals(new BigDecimal("170000"), service.totalAnnualSalary());
    }

    @Test
    void assignsEmployeeToProjectOnce() {
        CompanyService service = new CompanyService();
        service.addEmployee(new Employee(1, "Alex Morgan", "Developer", Department.DIGITAL_ENGINEERING, new BigDecimal("80000")));
        service.addProject(new Project(10, "Client A", "Portal Build", new BigDecimal("120000")));

        service.assignEmployeeToProject(1, 10);
        service.assignEmployeeToProject(1, 10);

        Project project = service.findProjectById(10).orElseThrow();
        assertEquals(1, project.getAssignedEmployees().size());
        assertEquals("Alex Morgan", project.getAssignedEmployees().get(0).getName());
    }

    @Test
    void groupsEmployeesByDepartment() {
        CompanyService service = new CompanyService();
        service.addEmployee(new Employee(1, "Alex Morgan", "Developer", Department.DIGITAL_ENGINEERING, new BigDecimal("80000")));
        service.addEmployee(new Employee(2, "Priya Nair", "Consultant", Department.CONSULTING, new BigDecimal("90000")));
        service.addEmployee(new Employee(3, "Jamie Smith", "Engineer", Department.DIGITAL_ENGINEERING, new BigDecimal("85000")));

        assertEquals(2, service.employeesByDepartment().get(Department.DIGITAL_ENGINEERING).size());
        assertEquals(1, service.employeesByDepartment().get(Department.CONSULTING).size());
    }

    @Test
    void rejectsDuplicateEmployeeIds() {
        CompanyService service = new CompanyService();
        service.addEmployee(new Employee(1, "Alex Morgan", "Developer", Department.DIGITAL_ENGINEERING, new BigDecimal("80000")));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                service.addEmployee(new Employee(1, "Taylor Reed", "Tester", Department.QUALITY_ASSURANCE, new BigDecimal("70000"))));

        assertTrue(exception.getMessage().contains("Employee id already exists"));
    }
}
