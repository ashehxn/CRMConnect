import React, { useState } from 'react';
import axios from 'axios';
import { Customer, Gender } from '../../models/Customer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CustomerFormContent: React.FC = () => {
    const [customer, setCustomer] = useState<Omit<Customer, 'customerId' | 'sales' | 'mails'>>({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: Gender.Male,
        industry: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    // Toastify success message
    const displaySuccessToast = (message: string) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const displayErrorToast = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<Customer>('http://localhost:31616/api/customer', customer, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            displaySuccessToast("Customer created successfully!");

            setTimeout(() => {
                navigate('/customerProfiles');
            }, 2800);

            setCustomer({
                name: '',
                email: '',
                phone: '',
                address: '',
                gender: Gender.Male,
                industry: '',
            });
            setErrors({});
        } catch (error: any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Failed to create customer:', error);
                displayErrorToast('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full m-8 flex shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('../../../src/assets/form1.webp')" }}></div>

                <div className="w-full md:w-1/2 bg-white p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Add a New Customer</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={customer.name}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter name"
                                required
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={customer.email}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter email"
                                required
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                value={customer.phone}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter phone number"
                                required
                            />
                            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Address</label>
                            <input
                                name="address"
                                type="text"
                                value={customer.address}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter address"
                                required
                            />
                            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="flex">
                            <div className="w-1/3 mr-8">
                                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={customer.gender}
                                    onChange={handleChange}
                                    className="select select-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                    required
                                >
                                    <option value={Gender.Male}>Male</option>
                                    <option value={Gender.Female}>Female</option>
                                    <option value={Gender.Other}>Other</option>
                                </select>
                                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                            </div>

                            <div className="w-2/3">
                                <label className="block text-gray-700 font-medium mb-2">Industry</label>
                                <input
                                    name="industry"
                                    type="text"
                                    value={customer.industry}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                    placeholder="Enter industry"
                                    required
                                />
                                {errors.industry && <p className="text-red-600 text-sm mt-1">{errors.industry}</p>}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary w-full font-semibold text-white">
                                Add Customer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerFormContent;
