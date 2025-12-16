import ManagementCard from "../ManagementCard";
import { CityList } from "./CityList";
export const City = () => {
  const isActiveSection = true;
  return (
    <>
        {isActiveSection && (
          <>
            <ManagementCard title="Cities List">
              <CityList />
            </ManagementCard>
          </>
        )}
    </>
  );
};
