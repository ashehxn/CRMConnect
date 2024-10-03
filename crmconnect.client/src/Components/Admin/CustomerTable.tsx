import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Customer } from "../../models/Customer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CustomerTable: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "Male",
        industry: ""
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const recordsPerPage = 7;

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        setLoading(true);
        axios
            .get("http://localhost:31616/api/customer")
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setCustomers(response.data);
                    setError(null);
                } else {
                    setError("Expected an array of customers, but got unexpected data.");
                }
            })
            .catch(() => {
                setError("Error fetching customers.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = () => {
        if (!searchId) {
            setSearchResult(null);
            return;
        }
        setLoading(true);
        axios
            .get(`http://localhost:31616/api/customer/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
                setError(null);
            })
            .catch(() => {
                setSearchResult(null);
                setError(`No user found with ID: ${searchId}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomerId(customer.customerId);
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            gender: customer.gender,
            industry: customer.industry,
        });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors: any = {};
        if (!formData.name) errors.name = "Name is required.";
        if (!formData.email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid.";
        }
        if (!formData.phone) errors.phone = "Phone number is required.";
        if (!formData.address) errors.address = "Address is required.";

        setFormErrors(errors);

        // Return true if no errors
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (customerId: number) => {
        if (validateForm()) {
            axios
                .put(`http://localhost:31616/api/customer/${customerId}`, formData)
                .then(() => {
                    setCustomers((prevCustomers) =>
                        prevCustomers.map((customer) =>
                            customer.customerId === customerId ? { ...customer, ...formData } : customer
                        )
                    );
                    setEditingCustomerId(null); // Stop editing after successful update
                })
                .catch(() => {
                    Swal.fire("Error!", "Failed to update the customer.", "error");
                });
        } else {
            Swal.fire("Validation Error", "Please fix the form errors before submitting.", "warning");
        }
    };

    const handleCancelEdit = () => {
        setEditingCustomerId(null);
    };

    const handleDelete = async (customerId: number) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await axios.delete(`http://localhost:31616/api/customer/${customerId}`);

                    setCustomers((prevCustomers) =>
                        prevCustomers.filter((customer) => customer.customerId !== customerId)
                    );

                    setError(null);

                    MySwal.fire("Deleted!", "The customer has been deleted.", "success");
                } catch (err) {
                    console.error("Failed to delete customer:", err);

                    MySwal.fire("Error!", "Failed to delete the customer.", "error");
                    setError("Error deleting the customer.");
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const totalPages = Math.ceil(customers.length / recordsPerPage);
    const startIdx = (currentPage - 1) * recordsPerPage;
    const paginatedCustomers = customers.slice(startIdx, startIdx + recordsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxButtons = 5;
        const halfRange = Math.floor(maxButtons / 2);

        let startPage = Math.max(currentPage - halfRange, 1);
        let endPage = Math.min(startPage + maxButtons - 1, totalPages);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(endPage - maxButtons + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`btn ${currentPage === i ? "btn-active" : ""} mx-1`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    const navigate = useNavigate();

    const navigateToForm = () => {
        navigate("/customerForm");
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={navigateToForm}
                className="btn btn-primary hover:bg-white-content text-white text-bold px-6 py-2 rounded-md mt-4 mb-4 w-full"
            >
                Add a new Customer
            </button>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Customers List</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="input input-bordered"
                    />
                    <button onClick={handleSearch} className="btn btn-primary">
                        Search
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full min-w-[1200px] bg-white border border-gray-200 rounded-lg shadow-md p-4 m-auto">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            <>
                                {searchId && searchResult ? (
                                    <tr key={searchResult.customerId}>
                                        <td>{searchResult.name}</td>
                                        <td>{searchResult.gender}</td>
                                        <td>{searchResult.email}</td>
                                        <td>{searchResult.phone}</td>
                                        <td>{searchResult.address}</td>
                                        <td>
                                            <div className="flex space-x-2">
                                                <button className="btn btn-warning btn-sm">Edit</button>
                                                <button className="btn btn-error btn-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : searchId && error ? (
                                    <tr>
                                        <td colSpan={6} className="text-center text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {customers.length > 0 ? (
                                            paginatedCustomers.map((customer) => (
                                                <React.Fragment key={customer.customerId}>
                                                    <tr>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.gender}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.phone}</td>
                                                        <td>{customer.address}</td>
                                                        <td>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    onClick={() => handleEdit(customer)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-error btn-sm"
                                                                    onClick={() => handleDelete(customer.customerId)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {editingCustomerId === customer.customerId && (
                                                        <tr>
                                                            <td colSpan={6}>
                                                                <form
                                                                    className="bg-gray-100 p-4 rounded-lg mt-2"
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        handleFormSubmit(customer.customerId);
                                                                    }}
                                                                >
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            placeholder="Name"
                                                                            value={formData.name}
                                                                            onChange={handleFormChange}
                                                                            className={`input input-bordered w-full ${formErrors.name ? "border-red-500" : ""}`}
                                                                        />
                                                                        {formErrors.name && (
                                                                            <span className="text-red-500">{formErrors.name}</span>
                                                                        )}
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            placeholder="Email"
                                                                            value={formData.email}
                                                                            onChange={handleFormChange}
                                                                            className={`input input-bordered w-full ${formErrors.email ? "border-red-500" : ""}`}
                                                                        />
                                                                        {formErrors.email && (
                                                                            <span className="text-red-500">{formErrors.email}</span>
                                                                        )}
                                                                        <input
                                                                            type="text"
                                                                            name="phone"
                                                                            placeholder="Phone"
                                                                            value={formData.phone}
                                                                            onChange={handleFormChange}
                                                                            className={`input input-bordered w-full ${formErrors.phone ? "border-red-500" : ""}`}
                                                                        />
                                                                        {formErrors.phone && (
                                                                            <span className="text-red-500">{formErrors.phone}</span>
                                                                        )}
                                                                        <input
                                                                            type="text"
                                                                            name="address"
                                                                            placeholder="Address"
                                                                            value={formData.address}
                                                                            onChange={handleFormChange}
                                                                            className={`input input-bordered w-full ${formErrors.address ? "border-red-500" : ""}`}
                                                                        />
                                                                        {formErrors.address && (
                                                                            <span className="text-red-500">{formErrors.address}</span>
                                                                        )}
                                                                        <select
                                                                            name="gender"
                                                                            value={formData.gender}
                                                                            onChange={handleFormChange}
                                                                            className="select select-bordered w-full"
                                                                        >
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="mt-4 flex justify-end space-x-2">
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleCancelEdit}
                                                                            className="btn btn-outline btn-error"
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button type="submit" className="btn btn-primary">
                                                                            Save Changes
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center">
                                                    No customers found.
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </tbody>

                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        className="btn btn-outline btn-circle"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack />
                    </button>
                    {renderPageNumbers()}
                    <button
                        className="btn btn-outline btn-circle"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomerTable;
