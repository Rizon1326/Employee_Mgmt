from django.contrib import admin

# Register your models here.
from .models import (
    Employee, Department, Role, Country, City, Equipment, WorkDay
)

admin.site.register(Employee)
admin.site.register(Department)
admin.site.register(Role)
admin.site.register(Country)
admin.site.register(City)
admin.site.register(Equipment)
admin.site.register(WorkDay)
