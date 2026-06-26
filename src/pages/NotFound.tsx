import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <Helmet>
        <title>Page Not Found | Sativa Yard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-sm border border-emerald-50">
        <span className="text-4xl text-emerald-800 font-bold">404</span>
      </div>
      
      <h1 className="font-serif text-4xl md:text-5xl font-black text-forest mb-4">Page Not Found</h1>
      <p className="text-emerald-800/70 mb-8 max-w-md font-medium leading-relaxed">
        We couldn't find the page you are looking for. It may have been moved, deleted, or never existed.
      </p>
      
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-900/10 cursor-pointer"
      >
        <ArrowLeft className="h-5 w-5" /> Go Back Home
      </Link>
    </div>
  );
}
