"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Download,
  Loader,
} from "lucide-react";
import PaymentsTabs from "./PaymentsTabs";
import PaymentsTable from "./PaymentsTable";
import PaymentStats from "./PaymentStats";
import Pagination from "../ui/Pagination";
import { admin_getAdminPayments } from "../../../../service/admin/admin_getAdminPayments";
import { admin_getPayments } from "../../../../service/admin/admin_getPayments.service";
export interface Payment {
  id: string;
  bookingId: string;
  hotelName: string;
  hotelId: string;
  hostName: string;
  hostId: string;
  guestName: string;
  guestId: string;
  amount: number;
  platformFee: number;
  hostPayout: number;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
  paymentMethod: string;
}
export interface PaymentList {
  hostPayout: number;
  paymentMethod: string;
  bookingId: string;
  id: number;
  amount: number;
  platformFee: number;
  paymentDate: string; 
  status: "pending" | "completed" | "failed"; 

  user: {
    id: string;
    fullName: string;
  };

  hotel: {
    hotelId: string;
    hotelName: string;
    host: {
      id: string;
      fullName: string;
    };
  };
}

export default function PaymentsView() {
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    pieChart: {},
    topCards: {
      AverageCommission: 0,
      PlatformFees: 0,
      TotalRevenue: 0,
      TotalTransactions: 0,
    },
  });
  const [paymentList, setPaymentList] = useState<PaymentList[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true);
        const response = await admin_getAdminPayments();
        const response2 = await admin_getPayments();
        console.log(response);
        console.log("res list:", response2);
        if (response.success && response2.success) {
          setData(response.data);
          setPaymentList(response2.data.payments); // Corrected to use response2.data for paymentList
        } else {
          setError(true);
        }
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getData();
  }, []);

  if (error) {
    return <div>ERROR</div>;
  }

  if (loader) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Payment Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage all platform payments and commissions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search payments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Calendar className="w-5 h-5" />
              <span>Date Range</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <PaymentStats data={data} />

      {/* Tabs */}
      <PaymentsTabs
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
      />

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <PaymentsTable activeSubTab={activeSubTab} data={paymentList}/>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
}
