import AppointmentCarousel from "@/components/patient/Appointments/AppointmentCarousel";
import AppointmentForm from "@/components/patient/Appointments/AppointmentForm";


const AppointmentBooking = () => {
    const startDate = new Date();
    return(
        <div>
            <AppointmentForm/>
            <AppointmentCarousel startDate={startDate}/>
        </div>
    )
}

export default AppointmentBooking;