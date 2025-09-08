import { useState, useEffect } from "react"
import { ethers } from "ethers"
import SellApprovalABI from "../constant/SellApproval.json" 

const CONTRACT_ADDRESS = "0xE7c5c2b4615cD0e9Bf421796A559F9CFe79514d1" // deployed contract

export default function AdminDashboard() {
  const [contract, setContract] = useState(null)
  const [pendingUsers, setPendingUsers] = useState([])
  const [approvedUsers, setApprovedUsers] = useState([])
  const [rejectedUsers, setRejectedUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Load contract
  useEffect(() => {
    if (!window.ethereum) return
    const provider = new ethers.BrowserProvider(window.ethereum)
    provider.getSigner().then((signer) => {
      const instance = new ethers.Contract(CONTRACT_ADDRESS, SellApprovalABI, signer)
      setContract(instance)
    })
  }, [])

  // Load all users
  async function loadUsers() {
    if (!contract) return
    setLoading(true)
    try {
      const pendings = await contract.getPendingUsers()
      const approved = await contract.getApprovedUsers()
      const rejected = await contract.getRejectedUsers()
      setPendingUsers(pendings)
      setApprovedUsers(approved)
      setRejectedUsers(rejected)
    } catch (err) {
      // setMessage("Error loading users: " + err.message)
    }
    setLoading(false)
  }

  // Actions
  async function approveUser(user) {
    if (!contract) return
    setLoading(true)
    try {
      const tx = await contract.approveUser(user)
      await tx.wait()
      setMessage(`✅ Approved ${user}`)
      loadUsers()
    } catch (err) {
      setMessage("Approval failed: " + err.message)
    }
    setLoading(false)
  }

  async function rejectUser(user) {
    if (!contract) return
    setLoading(true)
    try {
      const tx = await contract.rejectUser(user)
      await tx.wait()
      setMessage(`❌ Rejected ${user}`)
      loadUsers()
    } catch (err) {
      setMessage("Rejection failed: " + err.message)
    }
    setLoading(false)
  }

  async function removeUser(user) {
    if (!contract) return
    setLoading(true)
    try {
      const tx = await contract.removeUser(user)
      await tx.wait()
      setMessage(`🗑 Removed ${user}`)
      loadUsers()
    } catch (err) {
      setMessage("Remove failed: " + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-full mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-black">Admin Dashboard</h1>

        <button
          onClick={loadUsers}
          className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 mb-4"
        >
          Load Users
        </button>

        {loading && <p className="text-gray-500">Loading...</p>}

        {/* Pending */}
        <h2 className="text-xl font-semibold mb-2 text-black">⏳ Pending Requests</h2>
        <ul className="space-y-2 mb-6">
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending users.</p>
          ) : (
            pendingUsers.map((user) => (
              <li key={user} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span className="font-mono text-black">{user}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => approveUser(user)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(user)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Approved */}
        <h2 className="text-xl font-semibold mb-2 text-black">✅ Approved Users</h2>
        <ul className="space-y-2 mb-6">
          {approvedUsers.length === 0 ? (
            <p className="text-gray-500">No approved users.</p>
          ) : (
            approvedUsers.map((user) => (
              <li key={user} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span className="font-mono text-black">{user}</span>
                <button
                  onClick={() => removeUser(user)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Rejected */}
        <h2 className="text-xl font-semibold mb-2 text-black">🚫 Rejected Users</h2>
        <ul className="space-y-2">
          {rejectedUsers.length === 0 ? (
            <p className="text-gray-500">No rejected users.</p>
          ) : (
            rejectedUsers.map((user) => (
              <li key={user} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span className="font-mono text-black">{user}</span>
                <button
                  onClick={() => removeUser(user)}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        {message && (
          <p className="mt-4 text-sm text-gray-700 bg-gray-100 p-2 rounded">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
