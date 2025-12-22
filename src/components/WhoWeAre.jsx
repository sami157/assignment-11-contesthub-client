const WhoWeAre = () => {
  return (
    <section className="bg-base-100 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            What is ContestHub?
          </h2>

          <p className="text-base-content/80 mb-4 leading-relaxed">
            ContestHub is a modern online platform designed to connect creators,
            participants, and organizers through engaging creative contests.
            Our goal is to provide a secure, transparent, and user-friendly
            environment where ideas can compete and talent can be recognized.
          </p>

          <p className="text-base-content/80 mb-6 leading-relaxed">
            Whether you are hosting a contest, participating in one, or managing
            the platform, ContestHub offers powerful tools, secure payments, and
            role-based dashboards to ensure a smooth and enjoyable experience
            for everyone.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="badge badge-outline">Creative Contests</span>
            <span className="badge badge-outline">Secure Payments</span>
            <span className="badge badge-outline">Role-Based Access</span>
            <span className="badge badge-outline">Responsive Design</span>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-xl">
              Why Choose ContestHub
            </h3>

            <ul className="space-y-3 text-base-content/80">
              <li className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                Transparent contest management and winner selection
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                Secure Stripe-powered payment system
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                Dedicated dashboards for users, creators, and admins
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                Scalable, production-ready architecture
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;