// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import SellApprovalABI from "../constant/SellApproval.json"; // ABI JSON file

// const CONTRACT_ADDRESS = "0x3dAd28DF6953E3F54733054F197878b70ec73a34"; // replace with deployed address

// export default function AdminDashboard() {
//   const [account, setAccount] = useState<string>("");
//   const [contract, setContract] = useState<ethers.Contract | null>(null);
//   const [pendingUsers, setPendingUsers] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   // Connect to contract using existing wallet (Metamask already connected globally)
//   useEffect(() => {
//     const init = async () => {
//       try {
//         //@ts-ignore
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const addr = await signer.getAddress();
//         setAccount(addr);

//         const contractInstance = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           SellApprovalABI,
//           signer
//         );
//         setContract(contractInstance);

//         // auto-load pending requests on mount
//         loadPending(contractInstance);
//       } catch (err) {
//         setMessage("⚠️ Wallet not connected: " + err.message);
//       }
//     };

//     init();
//   }, []);

//   // Load pending users
//   async function loadPending(contractInstance?: ethers.Contract) {
//     if (!(contractInstance || contract)) return;
//     setLoading(true);
//     try {
//       const users: string[] = await (contractInstance || contract)!.getPendingUsers();
//       setPendingUsers(users);
//     } catch (err: any) {
//       setMessage("Error loading pending users: " + err.message);
//     }
//     setLoading(false);
//   }

//   // Approve user
//   async function approveUser(user: string) {
//     if (!contract) return;
//     setLoading(true);
//     try {
//       const tx = await contract.approveUser(user);
//       await tx.wait();
//       setMessage(`✅ Approved ${user}`);
//       loadPending();
//     } catch (err: any) {
//       setMessage("Approval failed: " + err.message);
//     }
//     setLoading(false);
//   }

//   // Reject user
//   async function rejectUser(user: string) {
//     if (!contract) return;
//     setLoading(true);
//     try {
//       const tx = await contract.rejectUser(user);
//       await tx.wait();
//       setMessage(`❌ Rejected ${user}`);
//       loadPending();
//     } catch (err: any) {
//       setMessage("Rejection failed: " + err.message);
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//         {/* Show connected wallet */}
//         {account ? (
//           <p className="mb-4 text-gray-600">Connected: {account}</p>
//         ) : (
//           <p className="text-red-500">⚠️ Wallet not connected</p>
//         )}

//         {/* Pending list */}
//         {loading ? (
//           <p className="text-gray-500">Loading pending requests...</p>
//         ) : pendingUsers.length === 0 ? (
//           <p className="text-gray-500">No pending requests.</p>
//         ) : (
//           <div className="grid gap-4 mt-4">
//             {pendingUsers.map((user) => (
//               <div
//                 key={user}
//                 className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg"
//               >
//                 <span className="font-mono text-sm">{user}</span>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => approveUser(user)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => rejectUser(user)}
//                     className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Status message */}
//         {message && (
//           <p className="mt-4 text-sm text-gray-700 bg-gray-100 p-2 rounded">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
