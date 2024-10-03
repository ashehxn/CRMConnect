import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sale } from "../../models/Sale";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SalesTable: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Sale | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editingSaleId, setEditingSaleId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        productName: "",
        saleAmount: 0,
        saleDate: "",
        salesRepId: 0,
        customerId: 0
    });
    const [formErrors, setFormErrors] = useState({
        productName: "",
        saleAmount: "",
        saleDate: "",
        salesRepId: "",
        customerId: ""
    });

    const recordsPerPage = 7;

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = () => {
        setLoading(true);
        axios
            .get("http://localhost:31616/api/sale")
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setSales(response.data);
                    setError(null);
                } else {
                    setError("Expected an array of sales, but got unexpected data.");
                }
            })
            .catch(() => {
                setError("Error fetching sales.");
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
            .get(`http://localhost:31616/api/sale/${searchId}`)
            .then((response) => {
                setSearchResult(response.data);
                setError(null);
            })
            .catch(() => {
                setSearchResult(null);
                setError(`No sale found with ID: ${searchId}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = (sale: Sale) => {
        setEditingSaleId(sale.saleId);
        setFormData({
            productName: sale.productName,
            saleAmount: sale.saleAmount,
            saleDate: sale.saleDate.toString().split("T")[0],
            salesRepId: sale.salesRepId ?? 0,
            customerId: sale.customerId ?? 0 
        });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors: any = {};

        if (!formData.productName) errors.productName = "Product name is required.";

        if (!formData.saleAmount) {
            errors.saleAmount = "Amount is required.";
        } else if (formData.saleAmount <= 0) {
            errors.saleAmount = "Amount must be a positive number.";
        }

        if (!formData.saleDate) errors.saleDate = "Date is required.";

        if (!formData.salesRepId) {
            errors.salesRepId = "Sales Representative Id is required.";
        } else if (formData.salesRepId <= 0) {
            errors.salesRepId = "Sales Representative Id must be a positive number.";
        }

        if (!formData.customerId) {
            errors.customerId = "Customer Id is required.";
        } else if (formData.customerId <= 0) {
            errors.customerId = "Customer Id must be a positive number.";
        }

        setFormErrors(errors);
        
        return Object.keys(errors).length === 0;
    };


    const handleFormSubmit = (saleId: number) => {
        if (validateForm()) {
            axios
                .put(`http://localhost:31616/api/sale/${saleId}`, formData)
                .then(() => {
                    setSales((prevSales) =>
                        prevSales.map((sale) =>
                            sale.saleId === saleId ? { ...sale, ...formData } : sale
                        )
                    );
                    setEditingSaleId(null);
                })
                .catch(() => {
                    Swal.fire("Error!", "Failed to update the customer.", "error");
                });
        } else {
            Swal.fire("Validation Error", "Please fix the form errors before submitting.", "warning");
        }
    };

    const handleCancelEdit = () => {
        setEditingSaleId(null);
    };

    const handleDelete = async (saleId: number) => {
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
                    await axios.delete(`http://localhost:31616/api/sale/${saleId}`);

                    setSales((prevSales) =>
                        prevSales.filter((sale) => sale.saleId !== saleId)
                    );

                    setError(null);

                    MySwal.fire("Deleted!", "The sale has been deleted.", "success");
                } catch (err) {
                    console.error("Failed to delete sale:", err);

                    MySwal.fire("Error!", "Failed to delete the sale.", "error");
                    setError("Error deleting the sale.");
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const totalPages = Math.ceil(sales.length / recordsPerPage);
    const startIdx = (currentPage - 1) * recordsPerPage;
    const paginatedSales = sales.slice(startIdx, startIdx + recordsPerPage);

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
        navigate("/salesForm");
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={navigateToForm}
                className="btn btn-primary hover:bg-white-content text-white text-bold px-6 py-2 rounded-md mt-4 mb-4 w-full"
            >
                Add a new Sale
            </button>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Sales List</h2>
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
                            <th>Product name</th>
                            <th>Sale amount</th>
                            <th>Date</th>
                            <th>Representative Id</th>
                            <th>Customer Id</th>
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
                                    <tr key={searchResult.saleId}>
                                        <td>{searchResult.productName}</td>
                                        <td>{searchResult.saleAmount}</td>
                                        <td>{new Date(searchResult.saleDate).toLocaleDateString()}</td>
                                        <td>{searchResult.salesRepId}</td>
                                        <td>{searchResult.customerId}</td>
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
                                        {sales.length > 0 ? (
                                            paginatedSales.map((sale) => (
                                                <React.Fragment key={sale.saleId}>
                                                    <tr>
                                                        <td>{sale.productName}</td>
                                                        <td>{sale.saleAmount}</td>
                                                        <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                                        <td>{sale.salesRepId}</td>
                                                        <td>{sale.customerId}</td>
                                                        <td>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                    onClick={() => handleEdit(sale)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-error btn-sm"
                                                                    onClick={() => handleDelete(sale.saleId)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {editingSaleId === sale.saleId && (
                                                        <tr>
                                                            <td colSpan={6}>
                                                                <form
                                                                    className="bg-gray-100 p-4 rounded-lg mt-2"
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        handleFormSubmit(sale.saleId);
                                                                    }}
                                                                >
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="w-full">
                                                                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                                                                Product Name
                                                                            </label>
                                                                            <input
                                                                                id="productName"
                                                                                type="text"
                                                                                name="productName" // Ensure this matches your formData structure
                                                                                placeholder="Name"
                                                                                value={formData.productName}
                                                                                onChange={handleFormChange}
                                                                                className={`input input-bordered w-full ${formErrors.productName ? "border-red-500" : ""}`}
                                                                            />
                                                                            {formErrors.productName && (
                                                                                <span className="text-red-500">
                                                                                    {formErrors.productName}
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                Sale Amount
                                                                            </label>
                                                                            <input
                                                                                type="number"
                                                                                name="saleAmount"
                                                                                value={formData.saleAmount}
                                                                                onChange={handleFormChange}
                                                                                className="input input-bordered w-full"
                                                                            />
                                                                            {formErrors.saleAmount && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {formErrors.saleAmount}
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                Sale Date
                                                                            </label>
                                                                            <input
                                                                                type="date"
                                                                                name="saleDate"
                                                                                value={formData.saleDate}
                                                                                onChange={handleFormChange}
                                                                                className="input input-bordered w-full"
                                                                            />
                                                                            {formErrors.saleDate && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {formErrors.saleDate}
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                Sales Rep ID
                                                                            </label>
                                                                            <input
                                                                                type="number"
                                                                                name="salesRepId"
                                                                                value={formData.salesRepId}
                                                                                onChange={handleFormChange}
                                                                                className="input input-bordered w-full"
                                                                            />
                                                                            {formErrors.salesRepId && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {formErrors.salesRepId}
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        <div className="w-full">
                                                                            <label className="block text-sm font-medium text-gray-700">
                                                                                Customer ID
                                                                            </label>
                                                                            <input
                                                                                type="number"
                                                                                name="customerId"
                                                                                value={formData.customerId}
                                                                                onChange={handleFormChange}
                                                                                className="input input-bordered w-full"
                                                                            />
                                                                            {formErrors.customerId && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {formErrors.customerId}
                                                                                </p>
                                                                            )}
                                                                        </div>
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
                                                    No sales found.
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

export default SalesTable;
