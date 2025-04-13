import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();

  // Fetch contact requests
  const { data: contactRequests, isLoading, isError, refetch } = useQuery({
    queryKey: ["/api/contact", activeTab],
    queryFn: () => apiRequest<ContactRequest[]>(
      `/api/contact${activeTab !== "all" ? `?status=${activeTab}` : ""}`
    ),
  });

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveTab(filter);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Admin <span className="text-primary">Dashboard</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 max-w-2xl mx-auto opacity-80">
            View and manage contact requests from potential clients.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <FilterButton
            filter="all"
            label="All Requests"
            active={activeTab === "all"}
            onClick={() => handleFilterChange("all")}
          />
          <FilterButton
            filter="new"
            label="New"
            active={activeTab === "new"}
            onClick={() => handleFilterChange("new")}
          />
          <FilterButton
            filter="pending"
            label="Pending"
            active={activeTab === "pending"}
            onClick={() => handleFilterChange("pending")}
          />
          <FilterButton
            filter="contacted"
            label="Contacted"
            active={activeTab === "contacted"}
            onClick={() => handleFilterChange("contacted")}
          />
          <FilterButton
            filter="completed"
            label="Completed"
            active={activeTab === "completed"}
            onClick={() => handleFilterChange("completed")}
          />
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto bg-background rounded-xl shadow-lg">
          <table className="w-full">
            <thead className="bg-card">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">#ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium opacity-70">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-4 text-sm opacity-70">Loading contact requests...</p>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center text-destructive">
                      <i className="bx bx-error-circle text-3xl"></i>
                    </div>
                    <p className="mt-4 text-sm opacity-70">
                      An error occurred while fetching contact requests.
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : contactRequests && contactRequests.length > 0 ? (
                contactRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 text-sm">{request.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{request.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <a href={`mailto:${request.email}`} className="text-primary hover:underline">
                        {request.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        {request.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center opacity-50">
                      <i className="bx bx-inbox text-3xl"></i>
                    </div>
                    <p className="mt-4 text-sm opacity-70">No contact requests found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Contact Details Panel (could be expanded in the future) */}
        <div className="mt-8 p-8 bg-background rounded-xl shadow-lg">
          <h3 className="font-space font-medium text-xl mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Requests"
              value={contactRequests?.length || 0}
              icon="bx-envelope"
              color="primary"
            />
            <StatCard
              title="New"
              value={contactRequests?.filter(r => r.status === "new").length || 0}
              icon="bx-bell"
              color="secondary"
            />
            <StatCard
              title="Pending"
              value={contactRequests?.filter(r => r.status === "pending").length || 0}
              icon="bx-time"
              color="secondary"
            />
            <StatCard
              title="Completed"
              value={contactRequests?.filter(r => r.status === "completed").length || 0}
              icon="bx-check-circle"
              color="primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  filter: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground font-medium"
          : "bg-card hover:bg-primary/10"
      )}
    >
      {label}
    </button>
  );
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-500";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "contacted":
        return "bg-purple-500/20 text-purple-500";
      case "completed":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: "primary" | "secondary";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-card rounded-lg p-4 flex items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center mr-4",
          color === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
        )}
      >
        <i className={`bx ${icon} text-xl`}></i>
      </div>
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <p className="text-2xl font-space font-medium">{value}</p>
      </div>
    </div>
  );
};

export default Admin;