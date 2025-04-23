import { Button } from "rizzui";
export const InnovatorSection = () => {
  return (
    <div id="innovator" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
              For Innovators
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              Turn Your Vision Into Reality
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Have a groundbreaking idea but lack resources or technical
              expertise? Our platform connects you with the right people to help
              refine and fund your innovation.
            </p>

            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Get expert feedback to refine your ideas
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Connect with potential investors
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Communicate directly through our chat system
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  <strong>AI-powered idea protection</strong> ensures your
                  innovations remain unique and secure
                </p>
              </div>
              <Button className="mt-6">Be an innovator</Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Innovator working on idea"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const InvestorSection = () => {
  return (
    <div id="investor" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mt-10 lg:mt-0 lg:col-start-1">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Investor analyzing charts"
            />
          </div>
          <div className="lg:col-start-2">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
              For Investors
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              Discover Vetted Investment Opportunities
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Gain access to a curated list of ideas that have been refined and
              validated by industry experts. Invest with confidence in the next
              big thing.
            </p>

            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Browse ideas pre-vetted by industry experts
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Connect directly with innovative entrepreneurs
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Secure early opportunities in promising ventures
                </p>
              </div>
              <Button className="mt-6">Be an investor</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExpertSection = () => {
  return (
    <div id="expert" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
              For Experts
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">
              Share Your Knowledge, Shape The Future
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Use your industry expertise to help refine promising ideas. Play a
              crucial role in bringing innovations to market by providing
              valuable feedback and validation.
            </p>

            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Review and refine innovative ideas
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Build your reputation and network
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-500">
                  Contribute to the next generation of innovations
                </p>
              </div>
              <Button className="mt-6">Be an expert</Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Expert reviewing documents"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
