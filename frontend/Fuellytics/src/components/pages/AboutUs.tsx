import React from 'react';

const AboutUs = () => {
  const coreValues = [
    { title: "Data-Driven", description: "Making decisions based on comprehensive analytics" },
    { title: "Accuracy", description: "Providing precise and reliable metrics" },
    { title: "Efficiency", description: "Helping optimize fuel consumption" },
    { title: "Innovation", description: "Pioneering new analysis methods" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 to-indigo-100 blur-3xl opacity-30 transform -skew-y-6"></div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Empowering vehicle owners and manufacturers with comprehensive fuel economy analytics
            to make informed decisions and promote sustainability.
          </p>
        </div>

        {/* Mission & Vision Sections */}
        <div className="grid gap-12 mb-24">
          {/* Mission Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-white rounded-lg p-8 border border-slate-100 hover:border-blue-100 transition-colors duration-200">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To provide cutting-edge analytics and insights about vehicle fuel economy,
                helping consumers and businesses make environmentally conscious and 
                economically sound decisions about their transportation needs.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-white rounded-lg p-8 border border-slate-100 hover:border-indigo-100 transition-colors duration-200">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To become the leading platform for vehicle efficiency analytics,
                driving the transition towards more sustainable transportation
                through data-driven insights and innovative analysis tools.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="relative group transform hover:-translate-y-1 transition-all duration-200"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-white rounded-lg p-6 border border-slate-100 hover:border-blue-100 transition-colors duration-200">
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;