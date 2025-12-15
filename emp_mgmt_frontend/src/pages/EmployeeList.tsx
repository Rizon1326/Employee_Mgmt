import EmployeeFilter from "../features/employeeList/components/EmployeeFilter";
import EmployeeHeader from "../features/employeeList/components/EmployeeHeader";
import EmployeeTable from "../features/employeeList/components/EmployeeTable";

const EmployeeList = () => {
  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <EmployeeHeader/>
        <EmployeeFilter />
        <EmployeeTable />
      </div>
    </div>
  );
};
export default EmployeeList;