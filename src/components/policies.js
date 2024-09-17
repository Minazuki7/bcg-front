import React, { useState, useEffect } from "react";
import {
  getAllPolicies,
  addPolicy,
  updatePolicy,
  deletePolicy,
} from "../requests/policies/policesServices";
import Table from "./Table";

const PoliciesList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterCriterion, setFilterCriterion] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newPolicy, setNewPolicy] = useState({}); // To handle adding a new policy

  useEffect(() => {
    const fetchPolicies = async (page) => {
      try {
        const filters =
          filterCriterion && filterValue
            ? { [filterCriterion]: filterValue }
            : {};

        const data = await getAllPolicies(page, itemsPerPage, filters);

        setPolicies(data.data);
        setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies(currentPage);
  }, [currentPage, itemsPerPage, filterCriterion, filterValue]);

  const handleAddPolicy = async () => {
    try {
      await addPolicy(newPolicy);
      // Re-fetch the policies after adding
      const data = await getAllPolicies(currentPage, itemsPerPage);
      setPolicies(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePolicy = async (id) => {
    try {
      await deletePolicy(id);
      // Re-fetch the policies after deleting
      const data = await getAllPolicies(currentPage, itemsPerPage);
      setPolicies(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdatePolicy = async (id) => {
    const updatedPolicy = {
      /* new policy data here */
    };
    try {
      await updatePolicy(id, updatedPolicy);
      // Re-fetch the policies after updating
      const data = await getAllPolicies(currentPage, itemsPerPage);
      setPolicies(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    { key: "policy_id", title: "Policy ID" },
    { key: "date_of_purchase", title: "Date of Purchase" },
    { key: "customer_id", title: "Customer ID" },
    { key: "fuel", title: "Fuel" },
    { key: "vehicle_segment", title: "Vehicle Segment" },
    { key: "premium", title: "Premium" },
    { key: "bodily_injury_liability", title: "Bodily Injury Liability" },
    { key: "personal_injury_protection", title: "Personal Injury Protection" },
    { key: "property_damage_liability", title: "Property Damage Liability" },
    { key: "collision", title: "Collision" },
    { key: "comprehensive", title: "Comprehensive" },
    { key: "customer_gender", title: "Customer Gender" },
    { key: "customer_income_group", title: "Customer Income Group" },
    { key: "customer_region", title: "Customer Region" },
    { key: "customer_marital_status", title: "Customer Marital Status" },
  ];

  return (
    <div>
      <div className="filters">
        <select
          onChange={(e) => setFilterCriterion(e.target.value)}
          value={filterCriterion}
        >
          <option value="">Select Filter Criterion</option>
          <option value="customer_region">Region</option>
          <option value="vehicle_segment">Vehicle Segment</option>
          <option value="fuel">Fuel</option>
          <option value="policy_id">Policy ID</option>
          <option value="customer_id">Customer ID</option>
        </select>
        {filterCriterion && (
          <input
            type="text"
            placeholder={`Enter ${filterCriterion}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>

      <div className="add-policy">
        <h3>Add New Policy</h3>
        <input
          type="text"
          placeholder="Policy ID"
          onChange={(e) =>
            setNewPolicy({ ...newPolicy, policy_id: e.target.value })
          }
        />

        <button onClick={handleAddPolicy}>Add Policy</button>
      </div>

      <Table
        columns={columns}
        data={policies}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        onDelete={handleDeletePolicy}
        onUpdate={handleUpdatePolicy}
      />
    </div>
  );
};

export default PoliciesList;
