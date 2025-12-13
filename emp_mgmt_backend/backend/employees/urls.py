from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet, DepartmentViewSet, RoleViewSet,
    CountryViewSet, CityViewSet, EquipmentViewSet, WorkDayViewSet
)

router = DefaultRouter()
router.register('employees', EmployeeViewSet, basename='employees')
router.register('departments', DepartmentViewSet, basename='departments')
router.register('roles', RoleViewSet, basename='roles')
router.register('countries', CountryViewSet, basename='countries')
router.register('cities', CityViewSet, basename='cities')
router.register('equipment', EquipmentViewSet, basename='equipment')
router.register('workdays', WorkDayViewSet, basename='workdays')

urlpatterns = [
    path('', include(router.urls)),
]
