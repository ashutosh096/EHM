import React, { useEffect, useState } from "react";
import API from "../../../api/axios";

export default function ContactUsers() {
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  useEffect(() => {
    setLoadingContacts(true);
    API.get("/contacts")
      .then((res) => {
        const sorted = res.data.contacts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setContacts(sorted);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      })
      .finally(() => setLoadingContacts(false));
  }, []);

  const getSourceBadge = (interestedIn = "") => {
    if (interestedIn.includes("[STARC Demo]")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          STARC Demo
        </span>
      );
    }
    if (interestedIn.includes("[Contact Us]")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          Contact Us
        </span>
      );
    }
    if (interestedIn.includes("[STARC Brochure]")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          STARC Brochure
        </span>
      );
    }
    if (interestedIn.includes("[Case Study]")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          Case Study
        </span>
      );
    }
    if (interestedIn.includes("[Net-Zero]")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
          Net-Zero
        </span>
      );
    }
    
    // Fallback detection logic for legacy/pre-existing database entries
    if (interestedIn.startsWith("STARC:")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          STARC Demo
        </span>
      );
    }
    if (interestedIn.includes("STARC Brochure")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          STARC Brochure
        </span>
      );
    }
    if (interestedIn.includes("Case Study Download")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
          Case Study
        </span>
      );
    }
    if (interestedIn.includes("Net-Zero")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
          Net-Zero
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
        Contact Us
      </span>
    );
  };

  const getCleanedInterest = (interestedIn = "") => {
    return interestedIn
      .replace("[STARC Demo] ", "")
      .replace("[Contact Us] ", "")
      .replace("[STARC Brochure] ", "")
      .replace("[Case Study] ", "")
      .replace("[Net-Zero] ", "");
  };

  return (
    <div className="text-[#35582a]">
      <h2 className="text-2xl font-bold mb-4 underline">Contact Messages</h2>
      {loadingContacts ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto max-h-[60vh]">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-[#4b7735] text-white sticky top-0">
              <tr>
                <th className="py-2 px-4 border-b text-left">Source</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Mobile</th>
                <th className="py-2 px-4 border-b text-left">Interested In / Support Type</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Received At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <tr key={contact._id || idx} className="hover:bg-gray-150">
                  <td className="py-2 px-4 border-b">
                    {getSourceBadge(contact.interestedIn)}
                  </td>
                  <td className="py-2 px-4 border-b font-medium text-gray-900">{contact.name}</td>
                  <td className="py-2 px-4 border-b text-gray-600">{contact.email}</td>
                  <td className="py-2 px-4 border-b text-gray-600">{contact.mobile || "N/A"}</td>
                  <td className="py-2 px-4 border-b font-medium text-gray-800">
                    {getCleanedInterest(contact.interestedIn)}
                  </td>
                  <td className="py-2 px-4 border-b max-w-xs truncate text-gray-600" title={contact.message}>
                    {contact.message}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-500 text-sm">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}