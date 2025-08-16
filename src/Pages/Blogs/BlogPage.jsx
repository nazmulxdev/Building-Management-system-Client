import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeBlogModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(4px)" },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  const categories = [
    "All",
    "Sustainability",
    "Technology",
    "Maintenance",
    "Community",
  ];

  const blogs = [
    {
      id: 1,
      title: "5 Green Building Technologies Reducing Carbon Footprints",
      excerpt:
        "Explore how modern buildings are implementing innovative solutions like solar skins and smart glass to achieve net-zero energy consumption.",
      category: "Sustainability",
      date: "May 15, 2023",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "The Future of Smart Buildings: IoT Integration in 2023",
      excerpt:
        "How Internet of Things devices are revolutionizing building management through predictive maintenance and energy optimization.",
      category: "Technology",
      date: "April 28, 2023",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Preventative HVAC Maintenance: A Cost-Saving Guide",
      excerpt:
        "Learn seasonal maintenance checklists that can extend your HVAC system's lifespan by 40% while reducing energy costs.",
      category: "Maintenance",
      date: "April 10, 2023",
      readTime: "5 min read",
      image:
        "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPneH5Ac9lvTqROo1atKrgB2D8Nw9cFVUfELC0h",
    },
    {
      id: 4,
      title: "Creating Vibrant Communities in Mixed-Use Developments",
      excerpt:
        "Case studies showing how thoughtful design fosters interaction between residential, commercial, and retail tenants.",
      category: "Community",
      date: "March 22, 2023",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      title: "Water Conservation Strategies for Large Buildings",
      excerpt:
        "Implementing greywater systems and smart irrigation can reduce building water usage by up to 45% annually.",
      category: "Sustainability",
      date: "March 15, 2023",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
    },
    {
      id: 6,
      title: "Biophilic Design: Bringing Nature Into Urban Spaces",
      excerpt:
        "How incorporating natural elements improves tenant wellbeing and productivity in office buildings.",
      category: "Sustainability",
      date: "February 28, 2023",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 7,
      title: "The Rise of Touchless Building Technologies",
      excerpt:
        "From voice-activated elevators to smartphone access control - how contactless solutions are becoming standard.",
      category: "Technology",
      date: "February 15, 2023",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 8,
      title: "Winterizing Your Building: Essential Checklist",
      excerpt:
        "Protect your property from cold weather damage with these 12 critical maintenance tasks before winter arrives.",
      category: "Maintenance",
      date: "January 30, 2023",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 9,
      title: "Tenant Retention Through Amenity Innovation",
      excerpt:
        "How creative amenities like coworking lounges and pet spas are reducing commercial vacancy rates.",
      category: "Community",
      date: "January 18, 2023",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    },
    {
      id: 10,
      title: "AI-Powered Energy Management Systems",
      excerpt:
        "Next-generation building automation that learns usage patterns to optimize energy consumption in real-time.",
      category: "Technology",
      date: "January 5, 2023",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-base-100 ">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-primary-content py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold sm:text-5xl mb-6">
              Building Insights
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Expert knowledge on modern building management, sustainability
              practices, and community development
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-lg w-full pl-12 pr-4 bg-base-100 text-gray-500 dark:text-neutral-content border border-base-300  focus:border-primary focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral dark:text-neutral-content"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-content shadow-md"
                    : "bg-base-200 hover:bg-base-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 bg-primary/90 text-primary-content text-xs px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-text-secondary mb-3">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold  mb-3 hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-text-secondary mb-5">{blog.excerpt}</p>
                  <button
                    onClick={() => openBlogModal(blog)}
                    className="btn btn-sm btn-primary"
                  >
                    Read Article
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium  mb-2">No articles found</h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl text-primary font-bold  mb-3">
              Stay Updated
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-6">
              Subscribe to our monthly newsletter for the latest building
              management insights and articles.
            </p>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "You have subscribe successfully.",
                    showConfirmButton: false,
                    timer: 2000,
                  }).then(() => {
                    e.target.reset();
                  });
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="input input-bordered flex-1 bg-base-100"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
      {/* Animated Blog Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Animated Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              variants={backdropVariants}
              onClick={closeBlogModal}
            ></motion.div>

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
              <motion.div
                className="relative transform overflow-hidden rounded-xl bg-base-100 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                variants={modalVariants}
                layoutId={`blog-${selectedBlog.id}`}
              >
                {/* Close Button */}
                <button
                  onClick={closeBlogModal}
                  className="absolute top-4 right-4 btn btn-circle btn-primary z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal Content */}
                <motion.div
                  className="overflow-y-auto flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Hero Image with animation */}
                  <motion.div
                    className="relative h-64 w-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <motion.img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <motion.span
                        className="bg-primary text-primary-content text-xs px-3 py-1 rounded-full mb-2 inline-block"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedBlog.category}
                      </motion.span>
                      <motion.h2
                        className="text-2xl font-bold"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {selectedBlog.title}
                      </motion.h2>
                      <motion.div
                        className="flex items-center text-sm opacity-90 mt-2"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span>{selectedBlog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedBlog.readTime}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Blog Content with staggered animation */}
                  <motion.div
                    className="p-6 sm:p-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3,
                        },
                      },
                    }}
                  >
                    <motion.div className="prose max-w-none">
                      <motion.p
                        className="lead"
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        {selectedBlog.excerpt}
                      </motion.p>

                      <motion.h3
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        Introduction
                      </motion.h3>
                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        This would be the detailed content of your blog post. In
                        a real implementation, you would either store full
                        content in your blog data object or fetch it from a CMS.
                      </motion.p>

                      {/* Add more content sections with the same motion components */}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogPage;
