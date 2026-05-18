package com.cognizant.app;

import com.cognizant.app.model.Department;
import com.cognizant.app.model.Employee;
import com.cognizant.app.model.Project;
import com.cognizant.app.service.CompanyService;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

/**
 * Entry point for the sample Cognizant company console application.
 */
public class CognizantCompanyApplication {
    private static final NumberFormat CURRENCY = NumberFormat.getCurrencyInstance(Locale.US);

    public static void main(String[] args) {
        CompanyService companyService = createSampleCompany();
        printDashboard(companyService);
    }

    public static CompanyService createSampleCompany() {
        CompanyService companyService = new CompanyService();

        companyService.addEmployee(new Employee(
                101,
                "Aarav Sharma",
                "Java Developer",
                Department.DIGITAL_ENGINEERING,
                new BigDecimal("85000")));
        companyService.addEmployee(new Employee(
                102,
                "Maya Patel",
                "QA Analyst",
                Department.QUALITY_ASSURANCE,
                new BigDecimal("72000")));
        companyService.addEmployee(new Employee(
                103,
                "Daniel Johnson",
                "Cloud Engineer",
                Department.CLOUD_INFRASTRUCTURE,
                new BigDecimal("95000")));
        companyService.addEmployee(new Employee(
                104,
                "Sophia Lee",
                "Business Consultant",
                Department.CONSULTING,
                new BigDecimal("98000")));

        companyService.addProject(new Project(
                501,
                "Global Retail Bank",
                "Digital Banking Modernization",
                new BigDecimal("450000")));
        companyService.addProject(new Project(
                502,
                "HealthCare Plus",
                "Cloud Migration Readiness",
                new BigDecimal("275000")));

        companyService.assignEmployeeToProject(101, 501);
        companyService.assignEmployeeToProject(102, 501);
        companyService.assignEmployeeToProject(103, 502);
        companyService.assignEmployeeToProject(104, 502);

        return companyService;
    }

    private static void printDashboard(CompanyService companyService) {
        System.out.println("Cognizant Company Application");
        System.out.println("================================");
        System.out.println("Total associates: " + companyService.getEmployees().size());
        System.out.println("Total projects: " + companyService.getProjects().size());
        System.out.println("Annual salary total: " + CURRENCY.format(companyService.totalAnnualSalary()));
        System.out.println("Project budget total: " + CURRENCY.format(companyService.totalProjectBudget()));

        System.out.println("\nDepartments");
        companyService.employeesByDepartment().forEach((department, employees) ->
                System.out.printf("- %s: %d associate(s)%n", department, employees.size()));

        System.out.println("\nProjects");
        companyService.getProjects().forEach(project -> {
            System.out.printf("- %s [%s] budget %s%n",
                    project.getProjectName(),
                    project.getClientName(),
                    CURRENCY.format(project.getBudget()));
            project.getAssignedEmployees().forEach(employee ->
                    System.out.printf("  * %s - %s%n", employee.getName(), employee.getRole()));
        });
    }
}
