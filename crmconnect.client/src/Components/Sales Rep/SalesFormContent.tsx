import React, { useState } from 'react';
import axios from 'axios';
import { Sale } from '../../models/Sale';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SalesFormContent: React.FC = () => {
    const [sale, setSale] = useState({
        productName: '',
        saleAmount: 0,
        saleDate: "",
        salesRepId: 0,
        customerId: 0,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
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

        // Perform validation (you can implement this as per your existing validateForm function)
        const isValid = validateForm();
        if (!isValid) return;

        try {
            const response = await axios.post<Sale>('http://localhost:31616/api/sale', sale, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            displaySuccessToast("Sale added successfully!");

            setTimeout(() => {
                navigate('/sales'); // Redirect to sales page after adding
            }, 2800);

            // Reset form
            setSale({
                productName: '',
                saleAmount: 0,
                saleDate: '',
                salesRepId: 0,
                customerId: 0,
            });
            setErrors({});
        } catch (error: any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Failed to create sale:', error);
                displayErrorToast('Something went wrong. Please try again.');
            }
        }
    };

    // You can use your existing validateForm function here
    const validateForm = () => {
        const errors: any = {};
        if (!sale.productName) errors.productName = "Product name is required.";
        if (!sale.saleAmount) {
            errors.saleAmount = "Amount is required.";
        } else if (sale.saleAmount <= 0) {
            errors.saleAmount = "Amount must be a positive number.";
        }
        if (!sale.saleDate) errors.saleDate = "Date is required.";
        if (!sale.salesRepId) {
            errors.salesRepId = "Sales Representative Id is required.";
        } else if (sale.salesRepId <= 0) {
            errors.salesRepId = "Sales Representative Id must be a positive number.";
        }
        if (!sale.customerId) {
            errors.customerId = "Customer Id is required.";
        } else if (sale.customerId <= 0) {
            errors.customerId = "Customer Id must be a positive number.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full m-8 flex shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('../../../src/assets/form2.webp')" }}></div>

                <div className="w-full md:w-1/2 bg-white p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Add a New Sale</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                            <input
                                name="productName"
                                type="text"
                                value={sale.productName}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter product name"
                                required
                            />
                            {errors.productName && <p className="text-red-600 text-sm mt-1">{errors.productName}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Sale Amount</label>
                            <input
                                name="saleAmount"
                                type="number"
                                value={sale.saleAmount}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter sale amount"
                                required
                            />
                            {errors.saleAmount && <p className="text-red-600 text-sm mt-1">{errors.saleAmount}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Sale Date</label>
                            <input
                                name="saleDate"
                                type="date"
                                value={sale.saleDate}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                required
                            />
                            {errors.saleDate && <p className="text-red-600 text-sm mt-1">{errors.saleDate}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Sales Representative Id</label>
                            <input
                                name="salesRepId"
                                type="number"
                                value={sale.salesRepId}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter sales representative ID"
                                required
                            />
                            {errors.salesRepId && <p className="text-red-600 text-sm mt-1">{errors.salesRepId}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Customer Id</label>
                            <input
                                name="customerId"
                                type="number"
                                value={sale.customerId}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-gray-50 focus:bg-white border-gray-300 shadow-sm"
                                placeholder="Enter customer ID"
                                required
                            />
                            {errors.customerId && <p className="text-red-600 text-sm mt-1">{errors.customerId}</p>}
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary w-full font-semibold text-white">
                                Add Sale
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalesFormContent;
