import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Send, Paperclip, Info, Phone, Video, MoreVertical, User } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

// Sample chat contacts
const chatContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Are you coming to the hackathon this weekend?',
    lastMessageTime: '10:30 AM',
    unread: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Robotics Club',
    avatar: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Meeting scheduled for tomorrow at 5 PM',
    lastMessageTime: 'Yesterday',
    unread: 0,
    isOnline: true
  },
  {
    id: '3',
    name: 'Vikram Mehta',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Thanks for sharing the notes!',
    lastMessageTime: 'Yesterday',
    unread: 0,
    isOnline: false
  },
  {
    id: '4',
    name: 'Neha Kapoor',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Can you help me with the project?',
    lastMessageTime: 'Monday',
    unread: 0,
    isOnline: false
  },
  {
    id: '5',
    name: 'Coding Club',
    avatar: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'We need volunteers for the upcoming coding competition',
    lastMessageTime: 'Sunday',
    unread: 0,
    isOnline: true
  }
];

// Sample messages
const sampleMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      senderId: '1',
      text: 'Hey, how are you doing?',
      timestamp: new Date(2023, 4, 15, 10, 30),
      isRead: true
    },
    {
      id: '102',
      senderId: 'me',
      text: 'I\'m good, thanks! How about you?',
      timestamp: new Date(2023, 4, 15, 10, 32),
      isRead: true
    },
    {
      id: '103',
      senderId: '1',
      text: 'I\'m doing well too. Are you coming to the hackathon this weekend?',
      timestamp: new Date(2023, 4, 15, 10, 35),
      isRead: false
    }
  ],
  '2': [
    {
      id: '201',
      senderId: '2',
      text: 'Hello everyone, we\'re organizing a robotics workshop next week.',
      timestamp: new Date(2023, 4, 14, 15, 0),
      isRead: true
    },
    {
      id: '202',
      senderId: 'me',
      text: 'That sounds great! What topics will be covered?',
      timestamp: new Date(2023, 4, 14, 15, 5),
      isRead: true
    },
    {
      id: '203',
      senderId: '2',
      text: 'We\'ll cover basics of Arduino programming and sensor integration. Meeting scheduled for tomorrow at 5 PM for further planning.',
      timestamp: new Date(2023, 4, 14, 15, 10),
      isRead: true
    }
  ]
};

function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(id || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search query
  const filteredContacts = chatContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get active contact details
  const activeContact = chatContacts.find(contact => contact.id === activeChat);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      // Simulate loading delay
      setIsLoading(true);
      const timer = setTimeout(() => {
        setMessages(sampleMessages[activeChat] || []);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [activeChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || !activeChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputMessage,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, 'h:mm a');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday ' + format(date, 'h:mm a');
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };

  return (
    <div className="container-custom py-6 flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-180px)]">
        <div className="flex h-full">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 input text-sm"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <button
                    key={contact.id}
                    className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-start ${
                      activeChat === contact.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setActiveChat(contact.id)}
                  >
                    <div className="relative">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                      />
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 bg-primary-700 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <User size={40} className="mx-auto text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">No conversations found</p>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <img 
                  src={user?.avatar || "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150"} 
                  alt={user?.name || "User Avatar"} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name || "Guest User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "guest@example.com"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          {activeChat && activeContact ? (
            <div className="flex-1 flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={activeContact.avatar} 
                    alt={activeContact.name} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{activeContact.name}</h3>
                    <p className="text-xs text-gray-500">
                      {activeContact.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Video size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Info size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {isLoading ? (
                  // Loading State
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-end">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                      <div className="rounded-lg bg-gray-200 p-2 max-w-xs w-64 h-16"></div>
                    </div>
                    <div className="flex items-end justify-end">
                      <div className="rounded-lg bg-gray-200 p-2 max-w-xs w-48 h-12"></div>
                    </div>
                    <div className="flex items-end">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                      <div className="rounded-lg bg-gray-200 p-2 max-w-xs w-72 h-20"></div>
                    </div>
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'items-end'}`}
                      >
                        {message.senderId !== 'me' && (
                          <img 
                            src={activeContact.avatar} 
                            alt={activeContact.name} 
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 mr-2" 
                          />
                        )}
                        <div>
                          <div 
                            className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                              message.senderId === 'me' 
                                ? 'bg-primary-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'me' ? 'text-right' : ''
                          } text-gray-500`}>
                            {formatMessageDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-300 mb-2">
                        <MessageCircle size={48} className="mx-auto" />
                      </div>
                      <p className="text-sm text-gray-500">No messages yet</p>
                      <p className="text-xs text-gray-400">Send a message to start a conversation</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    className="flex-1 input mx-2"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button 
                    className={`p-2 rounded-full ${
                      inputMessage.trim() 
                        ? 'bg-primary-700 text-white hover:bg-primary-800' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-md p-8">
                <div className="text-gray-300 mb-3">
                  <MessageCircle size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Messages</h3>
                <p className="text-gray-600 mb-6">
                  Connect with students, clubs, and colleges through private messages.
                </p>
                <p className="text-sm text-gray-500">
                  Select a conversation or start a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;