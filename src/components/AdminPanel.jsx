import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SellApprovalABI from "../constant/SellApproval.json";

const CONTRACT_ADDRESS = "0xE7c5c2b4615cD0e9Bf421796A559F9CFe79514d1";

export default function AdminDashboard() {
  const [contract, setContract] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // Load contract
  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getSigner().then((signer) => {
      const instance = new ethers.Contract(CONTRACT_ADDRESS, SellApprovalABI, signer);
      setContract(instance);
    });
  }, []);

  // Auto-load and refresh users every 10s
  useEffect(() => {
    if (!contract) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const pendings = await contract.getPendingUsers();
        const approved = await contract.getApprovedUsers();
        const rejected = await contract.getRejectedUsers();
        setPendingUsers(pendings);
        setApprovedUsers(approved);
        setRejectedUsers(rejected);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 10000);
    return () => clearInterval(interval);
  }, [contract]);

  // Actions
  const approveUser = async (user) => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.approveUser(user);
      await tx.wait();
      setMessage(`✅ Approved ${user}`);
    } catch (err) {
      setMessage("Approval failed: " + err.message);
    }
    setLoading(false);
  };

  const rejectUser = async (user) => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.rejectUser(user);
      await tx.wait();
      setMessage(`❌ Rejected ${user}`);
    } catch (err) {
      setMessage("Rejection failed: " + err.message);
    }
    setLoading(false);
  };

  const removeUser = async (user) => {
    if (!contract) return;
    setLoading(true);
    try {
      const tx = await contract.removeUser(user);
      await tx.wait();
      setMessage(`🗑 Removed ${user}`);
    } catch (err) {
      setMessage("Remove failed: " + err.message);
    }
    setLoading(false);
  };

  // Render a single user item
  const renderUserItem = (user, actions) => (
    <li
      key={user}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-lg border"
    >
      <span className="font-mono text-black text-xs sm:text-base break-all mb-2 sm:mb-0">{user}</span>
      <div className="flex flex-wrap gap-2">
        {actions}
        <button
          onClick={() => window.open(`/api/admin/download?wallet=${user}`, "_blank")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
        >
          Download
        </button>
        <button
          onClick={async () => {
            const res = await fetch(`/api/admin/download?wallet=${user}&preview=true`);
            const contentType = res.headers.get("Content-Type");

            if (contentType === "application/pdf") {
              window.open(`/api/admin/download?wallet=${user}&preview=true`, "_blank");
            } else {
              setPreviewUrl(`/api/admin/download?wallet=${user}&preview=true`);
            }
          }}
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
        >
          Preview
        </button>
      </div>
    </li>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 ">
      <div className="w-full max-w-7xl mx-auto bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-black text-center sm:text-left">Admin Dashboard</h1>

        {/* {loading && <p className="text-gray-500 mb-2 text-center">Loading...</p>} */}

        {/* Pending */}
        <h2 className="text-xl font-semibold mb-2 text-black">⏳ Pending Requests</h2>
        <ul className="space-y-2 mb-6 overflow-x-auto">
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending users.</p>
          ) : (
            pendingUsers.map((user) =>
              renderUserItem(
                user,
                <>
                  <button
                    onClick={() => approveUser(user)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(user)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Reject
                  </button>
                </>
              )
            )
          )}
        </ul>

        {/* Approved */}
        <h2 className="text-xl font-semibold mb-2 text-black">✅ Approved Users</h2>
        <ul className="space-y-2 mb-6 overflow-x-auto">
          {approvedUsers.length === 0 ? (
            <p className="text-gray-500">No approved users.</p>
          ) : (
            approvedUsers.map((user) =>
              renderUserItem(
                user,
                <button
                  onClick={() => removeUser(user)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Remove
                </button>
              )
            )
          )}
        </ul>

        {/* Rejected */}
        <h2 className="text-xl font-semibold mb-2 text-black">🚫 Rejected Users</h2>
        <ul className="space-y-2 overflow-x-auto">
          {rejectedUsers.length === 0 ? (
            <p className="text-gray-500">No rejected users.</p>
          ) : (
            rejectedUsers.map((user) =>
              renderUserItem(
                user,
                <button
                  onClick={() => removeUser(user)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Remove
                </button>
              )
            )
          )}
        </ul>

        {/* {message && (
          <p className="mt-4 text-sm text-gray-700 bg-gray-100 p-2 rounded text-center sm:text-left">
            {message}
          </p>
        )} */}
      </div>
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] relative">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              ✕
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-[80vh] max-w-full mx-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
