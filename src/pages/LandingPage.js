import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, Globe, ArrowBigDownDash } from "lucide-react";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
     
     {/* NavBar */}
     <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
          ✦ Xpedite API
        </div>
        <button className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-800/50 transition-colors font-semibold">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center px-6" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />  {/* Overlay */}

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            / Xpedite API
          </h1>

          <div className="mt-4 h-1 w-40 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
          
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed"> The modern API testing platform that developers love. Beautiful, fast, and intuitive – everything Postman should have been.</p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
             className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform flex items-center justify-center gap-2 font-semibold shadow-lg"
             onClick={() => navigate("/dashboard")}>
              <Zap className="h-5 w-5" />
              Create New Collection
              <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigate("/dashboard")} className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800/50 transition-colors font-semibold">
              Import Collection
            </button>
          </div>
        </div>

        {/* Floating Arrow */}
        <button
          onClick={() => {const section = document.getElementById("features"); if (section) {section.scrollIntoView({ behavior: "smooth" })}}}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <ArrowBigDownDash className="h-8 w-8" />
        </button>

      </section>

     {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Built for Modern Developers
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Everything you need to test, debug, and document your APIs with style.
          </p>
        </div>
      
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature Card */}
          <div className="relative group p-8 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-indigo-500/70 transition-all duration-300 text-center hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-400">
              Execute requests instantly with our optimized engine. No lag, no waiting.
            </p>
          </div>
      
          {/* Feature Card */}
          <div className="relative group p-8 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-purple-500/70 transition-all duration-300 text-center hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure by Design</h3>
            <p className="text-gray-400">
              Advanced authentication methods and secure credential storage.
            </p>
          </div>
      
          {/* Feature Card */}
          <div className="relative group p-8 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-pink-500/70 transition-all duration-300 text-center hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Environment Sync</h3>
            <p className="text-gray-400">
              Seamlessly switch between dev, staging, and production environments.
            </p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
       <section className="py-20 px-6">
         <div className="max-w-3xl mx-auto text-center bg-gray-900/60 rounded-2xl border border-gray-800 p-12">
           <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
             Ready to revolutionize your API testing?
           </h2>
           <p className="text-lg text-gray-400 mb-10">
             Join thousands of developers who have already made the switch to a better API testing experience.
           </p>
           <div className="flex justify-center">
             <button onClick={() => navigate("/dashboard")} className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform flex items-center justify-center gap-2 font-semibold shadow-lg">
               Get Started Now
               <ArrowRight className="h-5 w-5" />
             </button>
           </div>
         </div>
       </section>                                                                                                               
    </div>
  );
}

export default LandingPage;
