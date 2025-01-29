import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  User,
  Upload,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data
const analyticsData = {
  users: 2547,
  automation: 156,
  efficiency: 89,
  tasks: 1234
};

const mockUsers = [
  { id: 1, name: 'Muhammad Usman', email: 'usman@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Ameer Hamza', email: 'hamza@example.com', role: 'User', status: 'Active' },
  { id: 2, name: 'Hafiz Ahmed', email: 'ahmed@example.com', role: 'User', status: 'Active' },
];

const mockAutomations = [
  { 
    id: 1, 
    name: 'Invoice Processing', 
    description: 'Automatically process incoming invoices',
    status: 'Active',
    lastRun: '2 hours ago',
    nextRun: 'In 1 hour'
  },
  { 
    id: 2, 
    name: 'Data Backup', 
    description: 'Daily backup of critical data',
    status: 'Paused',
    lastRun: '1 day ago',
    nextRun: 'Paused'
  },
];

const mockNotifications = [
  {
    id: 1,
    title: 'New User Registration',
    message: 'A new user has registered on the platform.',
    time: '5 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Automation Failed',
    message: 'The invoice processing automation failed to complete.',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    title: 'System Update',
    message: 'System maintenance scheduled for tonight at 2 AM.',
    time: '2 hours ago',
    read: true
  }
];

const mockAnalyticsData = {
  userGrowth: [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1900 },
    { month: 'Mar', users: 2400 },
    { month: 'Apr', users: 2800 },
    { month: 'May', users: 3200 },
    { month: 'Jun', users: 3800 }
  ],
  automationUsage: [
    { name: 'Invoice Processing', value: 400 },
    { name: 'Data Backup', value: 300 },
    { name: 'Report Generation', value: 200 },
    { name: 'Email Campaigns', value: 100 }
  ],
  taskCompletion: [
    { day: 'Mon', completed: 45, total: 50 },
    { day: 'Tue', completed: 38, total: 42 },
    { day: 'Wed', completed: 52, total: 55 },
    { day: 'Thu', completed: 41, total: 48 },
    { day: 'Fri', completed: 37, total: 40 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showNewAutomationModal, setShowNewAutomationModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: 'Muhammad Usman',
    email: 'usman@example.com',
    role: 'Admin',
    avatar: 'https://th.bing.com/th/id/OIF.qeyMxlsI1UNMTCDnJzCTxA?rs=1&pid=ImgDetMain'
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Visionary Edge</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Register
            </button>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)} title="Sign In">
            <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </button>
            </form>
          </Modal>
        )}

        {/* Register Modal */}
        {showRegisterModal && (
          <Modal onClose={() => setShowRegisterModal(false)} title="Register">
            <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Register
              </button>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-indigo-700 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h2 className="text-xl font-bold">Visionary Edge</h2>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-indigo-600 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8">
          <NavItem icon={<LayoutDashboard />} text="Dashboard" active={activeTab === 'dashboard'} expanded={isSidebarOpen} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Users />} text="Users" active={activeTab === 'users'} expanded={isSidebarOpen} onClick={() => setActiveTab('users')} />
          <NavItem icon={<LineChart />} text="Analytics" active={activeTab === 'analytics'} expanded={isSidebarOpen} onClick={() => setActiveTab('analytics')} />
          <NavItem icon={<Settings />} text="Automation" active={activeTab === 'automation'} expanded={isSidebarOpen} onClick={() => setActiveTab('automation')} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none ml-2 w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="relative p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                            notification.read ? 'opacity-75' : ''
                          }`}
                        >
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowAccountSettings(true)}
                className="relative"
              >
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Users"
                  value={analyticsData.users}
                  change="+12.5%"
                  positive={true}
                />
                <MetricCard
                  title="Automated Workflows"
                  value={analyticsData.automation}
                  change="+23.1%"
                  positive={true}
                />
                <MetricCard
                  title="Efficiency Rate"
                  value={`${analyticsData.efficiency}%`}
                  change="+5.2%"
                  positive={true}
                />
                <MetricCard
                  title="Active Tasks"
                  value={analyticsData.tasks}
                  change="-3.4%"
                  positive={false}
                />
              </div>

              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <ActivityItem
                    title="New Automation Workflow Created"
                    description="Invoice processing automation deployed successfully"
                    time="2 hours ago"
                  />
                  <ActivityItem
                    title="System Update"
                    description="Performance optimization completed"
                    time="5 hours ago"
                  />
                  <ActivityItem
                    title="User Report Generated"
                    description="Monthly analytics report for February 2024"
                    time="1 day ago"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Users</h2>
                  <button
                    onClick={() => setShowNewUserModal(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={20} className="mr-2" />
                    Add User
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingUser(user)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* User Growth Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mockAnalyticsData.userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Automation Usage */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Automation Usage</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockAnalyticsData.automationUsage}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {mockAnalyticsData.automationUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Task Completion */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Task Completion Rate</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockAnalyticsData.taskCompletion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#4F46E5" />
                        <Bar dataKey="total" fill="#E5E7EB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Automation Workflows</h2>
                  <button
                    onClick={() => setShowNewAutomationModal(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus size={20} className="mr-2" />
                    New Automation
                  </button>
                </div>
              </div>
              <div className="p-6 grid gap-6">
                {mockAutomations.map((automation) => (
                  <div key={automation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{automation.name}</h3>
                        <p className="text-gray-500 mt-1">{automation.description}</p>
                      </div>
                      <button
                        className={`p-2 rounded-full ${
                          automation.status === 'Active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {automation.status === 'Active' ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span>Last run: {automation.lastRun}</span>
                      <span>Next run: {automation.nextRun}</span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <Modal onClose={() => setShowAccountSettings(false)} title="Account Settings">
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="h-24 w-24 rounded-full"
                />
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700"
                >
                  <Upload size={16} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setUserProfile(prev => ({
                          ...prev,
                          avatar: e.target?.result as string
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>

            {/* Profile Information */}
            <form onSubmit={(e) => { e.preventDefault(); setShowAccountSettings(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAccountSettings(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* New Automation Modal */}
      {showNewAutomationModal && (
        <Modal onClose={() => setShowNewAutomationModal(false)} title="Create New Automation">
          <form onSubmit={(e) => { e.preventDefault(); setShowNewAutomationModal(false); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Workflow Name</label>
              <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Schedule</label>
              <select className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option>Every hour</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowNewAutomationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* New/Edit User Modal */}
      {(showNewUserModal || editingUser) && (
        <Modal 
          onClose={() => {
            setShowNewUserModal(false);
            setEditingUser(null);
          }} 
          title={editingUser ? "Edit User" : "Add New User"}
        >
          <form onSubmit={(e) => { 
            e.preventDefault(); 
            setShowNewUserModal(false);
            setEditingUser(null);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                required 
                defaultValue={editingUser?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                required 
                defaultValue={editingUser?.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select 
                defaultValue={editingUser?.role || 'User'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            {!editingUser && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowNewUserModal(false);
                  setEditingUser(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function NavItem({ icon, text, active, expanded, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 ${
        active ? 'bg-indigo-800' : 'hover:bg-indigo-600'
      } transition-colors duration-200`}
    >
      <span className="text-indigo-100">{icon}</span>
      {expanded && <span className="ml-3 text-sm">{text}</span>}
    </button>
  );
}

function MetricCard({ title, value, change, positive }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ title, description, time }) {
  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default App;