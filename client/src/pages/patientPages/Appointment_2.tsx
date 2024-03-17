import AppointmentCarousel from "@/components/patient/AppointmentCarousel";
import AppointmentForm from "@/components/patient/AppointmentForm";


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