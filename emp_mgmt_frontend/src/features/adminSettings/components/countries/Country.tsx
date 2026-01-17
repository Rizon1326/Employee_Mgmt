import ManagementCard from "../ManagementCard";
import { CountryList } from "./CountryList";
import CreateCountry from "./CreateCountry";
export const Country = () => {
  const isActiveSection = true;
  return (
    <>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isActiveSection && (
          <>
            <ManagementCard title="Countries List">
              <CountryList />
            </ManagementCard>
            <ManagementCard title="Add Country">
              <CreateCountry />
            </ManagementCard>
          </>
        )}
       </div>
    </>
  );
};
