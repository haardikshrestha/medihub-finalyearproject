import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for showing surgery data fetched from the server
interface Surgery {
    _id: string;
    patientEmail: string;
    surgeryDate: string;
    doctorEmail: string;
    notes?: string;
}

// Interface for adding new surgery data via the form
interface NewSurgery {
    patientEmail: string;
    surgeryDate: string;
    doctorEmail: string;
    notes?: string;
}

// Interface for doctor data
interface Doctor {
    _id: string;
    email: string;
    fullname: string;
}

const AddSurgery: React.FC = () => {
    const [surgeries, setSurgeries] = useState<Surgery[]>([]);
    const [patients, setPatients] = useState<string[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState<NewSurgery>({
        patientEmail: '',
        surgeryDate: '',
        doctorEmail: '',
        notes: ''
    });

    useEffect(() => {
        fetch('http://localhost:5173/getsurgeries')
            .then(response => response.json())
            .then(data => setSurgeries(data))
            .catch(error => console.error('Error fetching surgeries:', error));

        fetch('http://localhost:5173/getpatients')
            .then(response => response.json())
            .then(data => setPatients(data.map((patient: any) => patient.email)))
            .catch(error => console.error('Error fetching patients:', error));

        fetch('http://localhost:5173/api/doctors')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5173/surgeries', formData);
            setSurgeries([...surgeries, response.data]);
            setFormData({
                patientEmail: '',
                surgeryDate: '',
                doctorEmail: '',
                notes: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // Calculate today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="p-4">
            <button
                className="bg-[#91BF77] text-white py-2 px-4 rounded mb-4"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Hide Form' : 'Show Form'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientEmail">
                            Patient Email
                        </label>
                        <select
                            id="patientEmail"
                            name="patientEmail"
                            value={formData.patientEmail}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Select a patient email</option>
                            {patients.map(patientEmail => (
                                <option key={patientEmail} value={patientEmail}>
                                    {patientEmail}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorEmail">
                            Doctor Email
                        </label>
                        <select
                            id="doctorEmail"
                            name="doctorEmail"
                            value={formData.doctorEmail}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Select a doctor email</option>
                            {doctors.map(doctor => (
                                <option key={doctor._id} value={doctor.email}>
                                    {doctor.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surgeryDate">
                            Surgery Date
                        </label>
                        <input
                            id="surgeryDate"
                            name="surgeryDate"
                            type="date"
                            value={formData.surgeryDate}
                            onChange={handleInputChange}
                            min={today} // Set min attribute to today's date
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#91BF77] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>
            )}

            {surgeries.length > 0 ? (
                surgeries.map(surgery => (
                    <div key={surgery._id} className="bg-white border rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">Patient: {surgery.patientEmail}</h3>
                        <p className="text-gray-700">Date of Surgery: {new Date(surgery.surgeryDate).toLocaleDateString()}</p>
                        <p className="text-gray-700">Doctor: {surgery.doctorEmail}</p>
                        <p className="text-gray-700">Notes: {surgery.notes}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-700">No surgeries found.</p>
            )}
        </div>
    );
};

export default AddSurgery;
