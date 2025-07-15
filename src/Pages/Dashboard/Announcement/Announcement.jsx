import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiAlertCircle,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Announcements = () => {
  const [activePage, setActivePage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const {
    data: announcementsData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["announcements", activePage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/announcements?page=${activePage}&limit=6`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const announcements = announcementsData?.data || [];
  const { totalPages = 1, totalItems = 0 } =
    announcementsData?.pagination || {};

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg max-w-3xl mx-auto mt-8">
        <div>
          <FiAlertCircle className="text-xl" />
          <span>Failed to load announcements. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <LoadingSpinner fullScreen size="xl" isLoading={isLoading}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3">
              <FiBell className="text-3xl text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Announcements
              </h2>
            </div>
            <div className="w-24 h-1 bg-accent mx-auto my-6"></div>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {announcements.length
                ? `Showing ${announcements.length} of ${totalItems} announcements`
                : "Important notices from building management"}
            </p>
          </div>

          {/* Announcements List */}
          {announcements.length > 0 ? (
            <>
              <div className="space-y-6 mb-10">
                {activePage === 1 && announcements[0] && (
                  <div className="card bg-base-100 border-l-4 border-primary shadow-lg hover:shadow-xl transition-shadow">
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <h3 className="card-title text-xl flex items-center gap-2">
                          {announcements[0].title}
                          <span className="badge badge-primary">Latest</span>
                        </h3>
                      </div>
                      <p className="text-base-content/80 mt-2">
                        {announcements[0].description}
                      </p>
                      <p className="text-sm text-base-content/60 mt-3">
                        {new Date(announcements[0].createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Other Announcements */}
                {(activePage === 1
                  ? announcements.slice(1)
                  : announcements
                ).map((announcement) => (
                  <div
                    key={announcement._id}
                    className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="card-body">
                      <h3 className="card-title">{announcement.title}</h3>
                      <p className="text-base-content/80 mt-2">
                        {announcement.description}
                      </p>
                      <p className="text-sm text-base-content/60 mt-3">
                        {new Date(announcement.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
                <div className="text-sm text-text-secondary">
                  Page {activePage} of {totalPages}
                </div>

                <div className="join">
                  <button
                    onClick={() =>
                      setActivePage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={activePage === 1 || isFetching}
                    className="join-item btn btn-sm bg-base-200 border-base-300 hover:bg-base-300 disabled:opacity-50"
                  >
                    <FiChevronLeft />
                  </button>

                  {Array.from({
                    length: Math.min(5, totalPages),
                  }).map((_, idx) => {
                    const pageNum =
                      activePage <= 3
                        ? idx + 1
                        : Math.min(activePage + idx - 2, totalPages);
                    return (
                      <button
                        key={idx}
                        onClick={() => setActivePage(pageNum)}
                        className={`join-item btn btn-sm ${
                          activePage === pageNum
                            ? "bg-primary text-white border-primary"
                            : "bg-base-200 border-base-300"
                        }`}
                        disabled={isFetching}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setActivePage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={activePage === totalPages || isFetching}
                    className="join-item btn btn-sm bg-base-200 border-base-300 hover:bg-base-300 disabled:opacity-50"
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <div className="text-sm text-text-secondary">
                  {totalItems} announcements total
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-text-secondary">
                No announcements available at the moment
              </p>
            </div>
          )}
        </div>
      </section>
    </LoadingSpinner>
  );
};

export default Announcements;
