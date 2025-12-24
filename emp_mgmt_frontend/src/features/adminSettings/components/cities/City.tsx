import ManagementCard from "../ManagementCard";
import { CityList } from "./CityList";
import { CreateCity } from "./CreateCity";
export const City = () => {
  const isActiveSection = true;
  return (
    <>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isActiveSection && (
          <>
            <ManagementCard title="Cities List">
              <CityList />
            </ManagementCard>
            <ManagementCard title="Add Cities">
              <CreateCity/>
            </ManagementCard>
          </>
        )}
       </div>
    </>
  );
};
