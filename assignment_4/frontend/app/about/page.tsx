import { NextPage } from "next";
import Head from "next/head";
import Header from "../Component/Header";

const About: NextPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <Head>
        <title>About Us - Task Management Platform</title>
      </Head>

      {/* Header */}
      <Header />

      {/* About Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-6 shadow-lg
         container mx-auto px-6 text-center my-[30]">
          <h1 className="text-4xl font-extrabold tracking-wide">About Us</h1>
          <p className="mt-2 text-lg font-medium opacity-90">
            Discover the driving force behind our Task Management Platform.
          </p>
        </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Introduction Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Task Management Platform is designed to help teams and businesses enhance their productivity by streamlining daily operations. We are committed to creating user-friendly, intuitive solutions tailored to the needs of small and medium-sized businesses. Our goal is to empower teams to work smarter, not harder.
          </p>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">Core Features</h2>
          <ul className="space-y-3 text-gray-800">
            <li className="flex items-center space-x-2">
              <span className="text-purple-600">&#9679;</span>
              <span>Role-based workflows for better team coordination.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-purple-600">&#9679;</span>
              <span>Task tracking with priority settings and deadlines.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-purple-600">&#9679;</span>
              <span>Integrated calendar for seamless event management.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-purple-600">&#9679;</span>
              <span>Team collaboration with shared files and reports.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-purple-600">&#9679;</span>
              <span>Secure authentication and data storage for peace of mind.</span>
            </li>
          </ul>
        </section>

        {/* Our Vision Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where every team, regardless of size, has access to tools that foster efficiency, collaboration, and growth. Through constant innovation and a focus on user needs, we aim to set the standard for task management solutions globally.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">Get in Touch</h2>
          <p className="text-gray-800 mb-6">
            Have questions or need assistance? Reach out to our dedicated team:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">Janvi Patel</h3>
              <p className="text-gray-700">Email:</p>
              <a
                href="mailto:janvipravinbhaipatel@cmail.carleton.ca"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                janvipravinbhaipatel@cmail.carleton.ca
              </a>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">Gurwinder Singh</h3>
              <p className="text-gray-700">Email:</p>
              <a
                href="mailto:gurwindersingh3@cmail.carleton.ca"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                gurwindersingh3@cmail.carleton.ca
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-500 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Task Management Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;