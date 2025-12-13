from django.db import models
from django.core.exceptions import ValidationError
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Departments"

    def __str__(self):
        return self.name
    
class Role(models.Model):
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="roles")

    class Meta:
        unique_together = ("name", "department")
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.department.name})"

class Country(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="cities")

    class Meta:
        unique_together = ("name", "country")
        ordering = ["name"]
        verbose_name_plural = "Cities"

    def __str__(self):
        return f"{self.name}, {self.country.name}"

class Equipment(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["id"]  # ID দিয়ে sorting (creation order অনুযায়ী)

    def __str__(self):
        return self.name

class WorkDay(models.Model):
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ["id"]  # Monday–Sunday ordered manually

    def __str__(self):
        return self.name

class EmploymentType(models.TextChoices):
    FULL_TIME = "full_time", "Full-time"
    PART_TIME = "part_time", "Part-time"
    CONTRACT = "contract", "Contract"

class Employee(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField()
    date_joined = models.DateField(auto_now_add=True)

    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name="employees")
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, related_name="employees")
    employment_type = models.CharField(max_length=20, choices=EmploymentType.choices)

    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, related_name="employees")
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True, related_name="employees")

    remote_work = models.BooleanField(default=False)
    office_work = models.BooleanField(default=True)
    work_days = models.ManyToManyField(WorkDay, blank=True)
    equipment_needed = models.ManyToManyField(Equipment, blank=True)

    can_view_projects = models.BooleanField(default=False)
    can_edit_projects = models.BooleanField(default=False)
    can_delete_projects = models.BooleanField(default=False)
    can_manage_employees = models.BooleanField(default=False)
    can_approve_budget = models.BooleanField(default=False)

    class Meta:
        ordering = ["full_name"]


    def clean(self):
        errors = {}
        if self.role and self.department:
            if self.role.department_id != self.department_id:
                errors["role"] = "Selected role does not belong to the selected department."

        if self.city and self.country:
            if self.city.country_id != self.country_id:
                errors["city"] = "Selected city does not belong to the selected country."

        if not self.remote_work:
            if self.equipment_needed.exists():
                errors["equipment_needed"] = ("Office employees cannot request equipment. Set remote_work = True.")

        if self.can_delete_projects and not self.can_edit_projects:
            errors["can_delete_projects"] = "Delete permission requires Edit permission."

        if self.can_edit_projects and not self.can_view_projects:
            errors["can_edit_projects"] = "Edit permission requires View permission."

        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return self.full_name


