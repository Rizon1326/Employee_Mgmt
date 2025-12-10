from rest_framework import serializers
from django.core.exceptions import ValidationError

from .models import (
    Employee, Department, Role,
    Country, City, Equipment, WorkDay
)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name"]

class RoleSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Role
        fields = ["id", "name", "department"]

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name"]

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = City
        fields = ["id", "name", "country"]

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["id", "name"]

class WorkDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkDay
        fields = ["id", "name"]

class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    role = RoleSerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    city = CitySerializer(read_only=True)
    equipment_needed = EquipmentSerializer(many=True, read_only=True)
    work_days = WorkDaySerializer(many=True, read_only=True)

    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, source="department"
    )
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True, source="role"
    )
    country_id = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), write_only=True, source="country"
    )
    city_id = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), write_only=True, source="city"
    )

    equipment_needed_ids = serializers.PrimaryKeyRelatedField(
        queryset=Equipment.objects.all(), many=True, write_only=True, required=False, source="equipment_needed"
    )
    work_days_ids = serializers.PrimaryKeyRelatedField(
        queryset=WorkDay.objects.all(), many=True, write_only=True, source="work_days"
    )

    class Meta:
        model = Employee
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "date_of_birth",
            "date_joined",
            
            # read-only nested
            "department",
            "role",
            "country",
            "city",
            "equipment_needed",
            "work_days",

            # write-only IDs
            "department_id",
            "role_id",
            "country_id",
            "city_id",
            "equipment_needed_ids",
            "work_days_ids",

            # preferences & permissions
            "remote_work",
            "office_work",
            "employment_type",
            "can_view_projects",
            "can_edit_projects",
            "can_delete_projects",
            "can_manage_employees",
            "can_approve_budget",
        ]
        read_only_fields = ("id", "date_joined")

    def validate_role_id(self, role_obj):
        
        department_id = self.initial_data.get("department_id")
        if department_id and str(role_obj.department_id) != str(department_id):
            raise serializers.ValidationError("Selected role does not belong to the selected department.")
        return role_obj

    def validate_city_id(self, city_obj):
        
        country_id = self.initial_data.get("country_id")
        if country_id and str(city_obj.country_id) != str(country_id):
            raise serializers.ValidationError("Selected city does not belong to the selected country.")
        return city_obj

    def validate(self, attrs):
      
        errors = {}

        remote = attrs.get("remote_work", False)
        equipment = attrs.get("equipment_needed", [])
        can_del = attrs.get("can_delete_projects", False)
        can_edit = attrs.get("can_edit_projects", False)
        can_view = attrs.get("can_view_projects", False)

        if not remote and equipment:
            errors["equipment_needed"] = "Office employees cannot request equipment. Set remote_work = True to assign equipment."

        if can_del and not (can_edit and can_view):
            errors["can_delete_projects"] = "To have delete permission, employee must have both edit + view permission."

        if can_edit and not can_view:
            errors["can_edit_projects"] = "To have edit permission, employee must have view permission."

        if errors:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        equipment = validated_data.pop("equipment_needed", [])
        work_days = validated_data.pop("work_days", [])

        employee = Employee.objects.create(**validated_data)

        if equipment:
            employee.equipment_needed.set(equipment)
        if work_days:
            employee.work_days.set(work_days)

        try:
            employee.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict if hasattr(e, "message_dict") else e.messages)

        employee.save()
        return employee

    def update(self, instance, validated_data):
        equipment = validated_data.pop("equipment_needed", None)
        work_days = validated_data.pop("work_days", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        try:
            instance.clean()
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict if hasattr(e, "message_dict") else e.messages)

        instance.save()

        if equipment is not None:
            instance.equipment_needed.set(equipment)
        if work_days is not None:
            instance.work_days.set(work_days)

        return instance
