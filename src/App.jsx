import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { 
  Star, Users, TrendingUp, Globe, Search, Target, Zap, Award, Eye, Clock, 
  Smartphone, Monitor, Tablet, ChevronRight, Lightbulb, RefreshCw 
} from 'lucide-react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const API_BASE_URL = 'https://mini-business-306313009197.europe-west1.run.app';


function App() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [businessData, setBusinessData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [seoTips, setSeoTips] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchBusinessData = async () => {
    if (!formData.name || !formData.location) {
      alert("Please fill in both business name and location!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/business-data`, formData);
      setBusinessData(response.data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      await Promise.all([
        fetchAnalytics(),
        fetchSeoTips(),
        fetchRecommendations()
      ]);
    } catch (error) {
      console.error('Error fetching business data:', error);
      alert("Error fetching business data. Please try again.");
    }
    setLoading(false);
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics`, {
        params: formData
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchSeoTips = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seo-tips`);
      setSeoTips(response.data.tips);
    } catch (error) {
      console.error('Error fetching SEO tips:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/growth-recommendations`, {
        params: formData
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const regenerateHeadline = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/regenerate-headline`, {
        params: formData
      });
      setBusinessData(prev => ({ ...prev, headline: response.data.headline }));
    } catch (error) {
      console.error('Error regenerating headline:', error);
      alert("Error regenerating headline. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const StatCard = ({ title, value, Icon, trend, color = "blue" }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↗️' : '↘️'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
    </div>
  );

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
  
  <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <Award className="w-5 h-5" />
              <span className="ml-2">Business data successfully loaded!</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Unlock Your Business Potential
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <button
              onClick={fetchBusinessData}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Your Business...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Analyze Business
                </span>
              )}
            </button>
          </div>
        </div>

        {businessData && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Google Rating"
                value={`${businessData.rating}/5`}
                Icon={Star}
                color="yellow"
                trend={Math.floor(Math.random() * 10 + 1)}
              />
              <StatCard
                title="Total Reviews"
                value={businessData.reviews}
                Icon={Users}
                color="green"
                trend={Math.floor(Math.random() * 15 + 5)}
              />
              <StatCard
                title="SEO Score"
                value={`${businessData.seoScore}/100`}
                Icon={TrendingUp}
                color="blue"
                trend={Math.floor(Math.random() * 8 + 2)}
              />
              <StatCard
                title="Monthly Views"
                value={businessData.monthlyViews.toLocaleString()}
                Icon={Eye}
                color="purple"
                trend={Math.floor(Math.random() * 12 + 3)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <TabButton
                id="overview"
                label="Overview"
                active={activeTab === 'overview'}
                onClick={setActiveTab}
              />
              <TabButton
                id="analytics"
                label="Analytics"
                active={activeTab === 'analytics'}
                onClick={setActiveTab}
              />
              <TabButton
                id="seo"
                label="SEO Tools"
                active={activeTab === 'seo'}
                onClick={setActiveTab}
              />
              <TabButton
                id="recommendations"
                label="Growth Tips"
                active={activeTab === 'recommendations'}
                onClick={setActiveTab}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Overview</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">AI-Generated SEO Headline</h4>
                        <p className="text-gray-700 mb-4">{businessData.headline}</p>
                        <button
                          onClick={regenerateHeadline}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2"
                        >
                          <RefreshCw className="w-5 h-5" />
                          <span>Regenerate Headline</span>
                        </button>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Business Insights</h4>
                        <p className="text-gray-700">{businessData.insights}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Competitor Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Your Rating:</span>
                            <span className="font-semibold">{businessData.rating}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Market Average:</span>
                            <span>{businessData.competitorAnalysis.averageRating}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Performance:</span>
                            <span className={`font-semibold ${businessData.competitorAnalysis.performance === 'Above Average' ? 'text-green-600' : 'text-red-600'}`}>
                              {businessData.competitorAnalysis.performance}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span>SEO Performance</span>
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Overall SEO Score</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${businessData.seoScore}%` }}
                                ></div>
                              </div>
                              <span className="font-semibold">{businessData.seoScore}/100</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Click-Through Rate</span>
                            <span className="font-semibold text-green-600">{businessData.clickThroughRate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Business Verified</span>
                            <span className={`font-semibold ${businessData.businessInfo.verified ? 'text-green-600' : 'text-red-600'}`}>
                              {businessData.businessInfo.verified ? '✅ Verified' : '❌ Not Verified'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Social Media Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Engagement Rate:</span>
                            <span className="font-semibold">{businessData.socialMedia.engagement}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Reach:</span>
                            <span className="font-semibold">{businessData.socialMedia.reach.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Top Platform:</span>
                            <span className="font-semibold">{businessData.socialMedia.topPlatform}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && analytics && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Weekly Views</h4>
                      <div className="space-y-2">
                        {analytics.dailyViews.map((day, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{day.day}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${(day.views / 250) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{day.views}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4">Device Breakdown</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                              <Smartphone className="w-5 h-5" />
                              <span>Mobile</span>
                            </span>
                            <span className="font-semibold">{analytics.deviceBreakdown.mobile}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                              <Monitor className="w-5 h-5" />
                              <span>Desktop</span>
                            </span>
                            <span className="font-semibold">{analytics.deviceBreakdown.desktop}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                              <Tablet className="w-5 h-5" />
                              <span>Tablet</span>
                            </span>
                            <span className="font-semibold">{analytics.deviceBreakdown.tablet}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4">Top Search Terms</h4>
                        <div className="space-y-2">
                          {analytics.topSearchTerms.map((term, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{term.term}</span>
                              <span className="text-sm font-medium text-gray-900">{term.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Optimization Tools</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>SEO Tips</span>
                      </h4>
                      <ul className="space-y-3">
                        {seoTips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ChevronRight className="w-5 h-5" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Keyword Suggestions</span>
                      </h4>
                      <ul className="space-y-3">
                        {businessData.keywordSuggestions.map((keyword, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ChevronRight className="w-5 h-5" />
                            <span className="text-sm text-gray-700">{keyword}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Globe className="w-5 h-5" />
                        <span>Backlink Opportunities</span>
                      </h4>
                      <ul className="space-y-3">
                        {businessData.backlinkOpportunities.map((opportunity, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ChevronRight className="w-5 h-5" />
                            <span className="text-sm text-gray-700">{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Content Ideas</span>
                      </h4>
                      <ul className="space-y-3">
                        {businessData.contentIdeas.map((idea, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ChevronRight className="w-5 h-5" />
                            <span className="text-sm text-gray-700">{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recommendations' && recommendations && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth Recommendations</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Priority Actions</span>
                      </h4>
                      <ul className="space-y-3">
                        {recommendations.priority.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Marketing Strategies</span>
                      </h4>
                      <ul className="space-y-3">
                        {recommendations.marketing.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Globe className="w-5 h-5" />
                        <span>SEO Improvements</span>
                      </h4>
                      <ul className="space-y-3">
                        {recommendations.seo.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-500 font-bold">•</span>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Business Profile</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Business Name</span>
                    <span className="text-gray-900">{businessData.businessInfo.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Location</span>
                    <span className="text-gray-900">{businessData.businessInfo.location}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Category</span>
                    <span className="text-gray-900 capitalize">{businessData.businessInfo.category}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Established</span>
                    <span className="text-gray-900">{businessData.businessInfo.established}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Quick Actions</span>
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={regenerateHeadline}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate New SEO Headline</span>
                  </button>
                  <button
                    onClick={fetchSeoTips}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Get Fresh SEO Tips</span>
                  </button>
                  <button
                    onClick={fetchAnalytics}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Refresh Analytics</span>
                  </button>
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
                    <p className="text-sm text-gray-700">
                      Regular updates to your business information and engaging with customer reviews 
                      can significantly boost your local search ranking!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
