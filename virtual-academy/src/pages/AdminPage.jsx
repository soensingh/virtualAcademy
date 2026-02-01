import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/form`);
        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }
        const data = await response.json();
        const submissions = Array.isArray(data?.data) ? data.data : [];
        setItems(submissions);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    load();
  }, []);

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Form Submissions</h1>
      {status === "loading" && <p className={styles.status}>Loading...</p>}
      {status === "error" && (
        <p className={styles.status}>Failed to load form data.</p>
      )}
      {status === "ready" && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Experience</th>
                <th>Topic</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No submissions yet.
                  </td>
                </tr>
              )}
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.experience || "-"}</td>
                  <td>{item.topic || "-"}</td>
                  <td>{item.name || "-"}</td>
                  <td>{item.phone || "-"}</td>
                  <td>{item.email || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
