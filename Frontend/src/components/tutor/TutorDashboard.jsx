import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGrid, FiUsers, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import TutorSidebar from './TutorSidebar'
import TutorOverview from './TutorOverview'
import TutorStudents from './TutorStudents'

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TutorOverview />
      case 'students':
        return <TutorStudents />
      default:
        return <TutorOverview />
    }
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: <FiGrid /> },
    { id: 'students', label: 'Students', icon: <FiUsers /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-white shadow-md py-3 px-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-accent-600">MTC Tutor Dashboard</h1>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-accent-50 text-accent-600 hover:bg-accent-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - conditionally rendered for mobile */}
        {isSidebarOpen && (
          <TutorSidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab)
              if (isMobile) setIsSidebarOpen(false)
            }} 
            tabs={tabs}
            isMobile={isMobile}
          />
        )}
        
        {/* Main Content */}
        <main className={`flex-1 p-4 md:p-8 ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0 md:mt-6"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default TutorDashboard