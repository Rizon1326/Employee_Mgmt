from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet, DepartmentListView, RoleListView,
    CountryListView, CityListView, EquipmentListView, WorkDayListView
)

router = DefaultRouter()
router.register('employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('', include(router.urls)),

    path('departments/', DepartmentListView.as_view(), name='departments'),
    path('roles/', RoleListView.as_view(), name='roles'),

    path('countries/', CountryListView.as_view(), name='countries'),
    path('cities/', CityListView.as_view(), name='cities'),

    path('equipment/', EquipmentListView.as_view(), name='equipment'),
    path('workdays/', WorkDayListView.as_view(), name='workdays'),
]
