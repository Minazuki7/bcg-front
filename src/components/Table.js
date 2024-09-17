import React from "react";
import "./Table.css";

const Table = ({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
  onUpdate,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
            <th>Actions</th> {/* Add a column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {row[col.key] !== undefined
                      ? row[col.key].toString()
                      : "N/A"}
                  </td>
                ))}
                <td>
                  {/* Update Button */}
                  <button onClick={() => onUpdate(row.policy_id)}>
                    Update
                  </button>

                  {/* Delete Button */}
                  <button onClick={() => onDelete(row.policy_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
