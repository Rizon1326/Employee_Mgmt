from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .models import (
    Employee, Department, Role, Country, City, Equipment, WorkDay
)
from .serializers import (
    EmployeeSerializer, DepartmentSerializer, RoleSerializer,
    CountrySerializer, CitySerializer, EquipmentSerializer, WorkDaySerializer
)


# -----------------------------------------------------------
#   EMPLOYEE CRUD (Full Create, List, Retrieve, Update, Delete)
# -----------------------------------------------------------
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().select_related(
        'department', 'role', 'country', 'city'
    ).prefetch_related('equipment_needed', 'work_days')

    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]
    


# -----------------------------------------------------------
#   SIMPLE LOOKUP TABLES (used for dropdowns)
# -----------------------------------------------------------

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]


class RoleListView(generics.ListAPIView):
    serializer_class = RoleSerializer

    def get_queryset(self):
        """
        Filter roles by department ID:
        Example: /api/roles/?department_id=2
        """
        queryset = Role.objects.all()
        dept_id = self.request.query_params.get("department_id")
        if dept_id:
            queryset = queryset.filter(department_id=dept_id)
        return queryset


class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CityListView(generics.ListAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        """
        Filter cities by country ID:
        Example: /api/cities/?country_id=4
        """
        queryset = City.objects.all()
        country_id = self.request.query_params.get("country_id")
        if country_id:
            queryset = queryset.filter(country_id=country_id)
        return queryset


class EquipmentListView(generics.ListAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class WorkDayListView(generics.ListAPIView):
    queryset = WorkDay.objects.all()
    serializer_class = WorkDaySerializer
