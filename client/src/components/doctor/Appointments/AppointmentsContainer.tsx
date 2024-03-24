import AppointmentsTable from "./AppointmentsTable";

const AppointentsContainer = () => {
  return (
    <>
      <div className=" mr-[400px] flex gap-2">
        <div className="bg-gray-100 p-7 w-1/4 rounded-t-xl border">

        </div>
        <div className="bg-[#91BF77] p-7 w-1/4 rounded-t-xl">

        </div>
        <div className="bg-[#91BF77] p-7 w-1/4 rounded-t-xl">

        </div>
      </div>
      <div className="bg-gray-100 p-4">
        <AppointmentsTable/>
      </div>
    </>
  );
};

export default AppointentsContainer;
