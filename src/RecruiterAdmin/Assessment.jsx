import React, { useState } from "react";
import Pagination from '../components/LandingPage/Pagination';
import { useNavigate } from "react-router-dom";

function Assessment() {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    const data = [
        { id: "#145756", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "1/09/2025" },
        { id: "#145757", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "2/09/2025" },
        { id: "#145758", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "3/09/2025" },
        { id: "#145759", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "4/09/2025" },
        { id: "#145760", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "5/09/2025" },
        { id: "#145761", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "6/09/2025" },
        { id: "#145762", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "7/09/2025" },
        { id: "#145763", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "8/09/2025" },
        { id: "#145764", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "9/09/2025" },
        { id: "#145765", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "10/09/2025" },
        { id: "#145766", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "11/09/2025" },
        { id: "#145767", company: "Netfotech Solution", jobTitle: "QA Cypress + Java", createdOn: "12/09/2025" },
    ];


    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Assessment</h1>

            <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">

                <table className="min-w-[800px] w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left py-4 px-6 font-semibold text-gray-700">ID</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Company</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Job Title</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Created On</th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.map((row, index) => (
                            <tr
                                key={row.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-6 text-gray-700">{row.id}</td>
                                <td className="py-3 px-6 text-blue-600 cursor-pointer">
                                    {row.company}
                                </td>
                                <td className="py-3 px-6 text-gray-700">{row.jobTitle}</td>
                                <td className="py-3 px-6 text-gray-700">{row.createdOn}</td>
                                <td className="py-3 px-6">
                                    <button
                                        onClick={() =>
                                            navigate("/RecruiterAdmin-Dashboard/Assessment/QuestionsList")}
                                            
                                        className="px-6 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default Assessment;