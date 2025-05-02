"use client";

import { useState } from "react";

type LoginType = "load-tracking" | "customer-tools" | "drive-with-stagecoach" | null;

export default function LoginSection() {
  const [activeLogin, setActiveLogin] = useState<LoginType>(null);

  const toggleLogin = (type: LoginType) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLogin(activeLogin === type ? null : type);
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-gray-100 border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Login Toggle Bar */}
        <div className="flex justify-end">
          <div className="flex space-x-4 text-sm">
            <a 
              href="#" 
              onClick={toggleLogin("load-tracking")}
              className={`py-2 px-3 transition-colors ${
                activeLogin === "load-tracking" 
                  ? "text-primary font-medium" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Load Tracking/POD's
            </a>
            <a 
              href="#" 
              onClick={toggleLogin("customer-tools")}
              className={`py-2 px-3 transition-colors ${
                activeLogin === "customer-tools" 
                  ? "text-primary font-medium" 
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              Customer Tools
            </a>
            <a 
              href="https://intelliapp.driverapponline.com/c/stagecoach?r=MVTWarehousing_HP" 
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 transition-colors text-gray-700 hover:text-primary"
            >
              Drive With Stagecoach
            </a>
          </div>
        </div>
      </div>

      {/* Login Forms Section */}
      {activeLogin && (
        <div className="absolute top-full left-0 right-0 w-full bg-white shadow-md border-t border-gray-200 py-4 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              {/* Load Tracking/POD's Login */}
              {activeLogin === "load-tracking" && (
                <div className="bg-gray-50 p-4 rounded-md w-full max-w-md">
                  <form action="https://sgce.loadtracking.com/login" method="post" className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary mb-2">Load Tracking/POD's</h3>
                    <div>
                      <label htmlFor="username1" className="block text-sm font-medium text-gray-700 mb-1">
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username1"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password1"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}

              {/* Customer Tools Login */}
              {activeLogin === "customer-tools" && (
                <div className="bg-gray-50 p-4 rounded-md w-full max-w-md">
                  <form action="https://sgce.loadtracking.com/im/apps/home" method="post" className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary mb-2">Customer Tools</h3>
                    <div>
                      <label htmlFor="username2" className="block text-sm font-medium text-gray-700 mb-1">
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username2"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password2"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}

              {/* Drive With Stagecoach Login */}
              {activeLogin === "drive-with-stagecoach" && (
                <div className="bg-gray-50 p-4 rounded-md w-full max-w-md">
                  <form action="https://intelliapp.driverapponline.com/c/stagecoach?r=MVTWarehousing_HP" method="post" className="space-y-3">
                    <h3 className="font-semibold text-lg text-primary mb-2">Drive With Stagecoach</h3>
                    <div>
                      <label htmlFor="username3" className="block text-sm font-medium text-gray-700 mb-1">
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username3"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="password3" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password3"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
