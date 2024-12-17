'use client'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="text-center space-y-8 px-4 max-w-4xl">
        {/* Main Title with gradient text */}
        <h1 className="text-6xl md:text-7xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
            SSO React Template
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Connect your wallet and start building with Web3
        </p>

        {/* Decorative elements */}
        <div className="relative">
          {/* Feature highlights */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Easy Setup', icon: '🚀' },
              { title: 'Secure', icon: '🔒' },
              { title: 'Multi-Chain', icon: '⛓️' },
            ].map((feature) => (
              <div key={feature.title} 
                   className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                            border border-gray-200 dark:border-gray-700
                            group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-purple-500/30 to-blue-400/30 blur-3xl animate-blob animation-delay-2000" />
      </div>
    </div>
  )
}
