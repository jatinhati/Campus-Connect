import { Message, ChatContact } from '../types/chat';

// In a real app, these would be API calls to your backend
class MessageService {
  private static instance: MessageService;
  private messages: Record<string, Message[]> = {};
  private contacts: ChatContact[] = [];

  private constructor() {
    // Initialize with sample data
    this.contacts = [
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
      }
    ];

    // Initialize sample messages
    this.messages = {
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
          text: 'Are you coming to the hackathon this weekend?',
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
        }
      ]
    };
  }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  // Get all contacts
  public getContacts(): ChatContact[] {
    return this.contacts;
  }

  // Get messages for a specific chat
  public getMessages(chatId: string): Message[] {
    return this.messages[chatId] || [];
  }

  // Send a new message
  public sendMessage(chatId: string, text: string): Message {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date(),
      isRead: false
    };

    if (!this.messages[chatId]) {
      this.messages[chatId] = [];
    }

    this.messages[chatId].push(newMessage);

    // Update contact's last message
    const contact = this.contacts.find(c => c.id === chatId);
    if (contact) {
      contact.lastMessage = text;
      contact.lastMessageTime = 'Just now';
    }

    return newMessage;
  }

  // Mark messages as read
  public markAsRead(chatId: string): void {
    if (this.messages[chatId]) {
      this.messages[chatId].forEach(message => {
        if (message.senderId !== 'me') {
          message.isRead = true;
        }
      });
    }

    // Update contact's unread count
    const contact = this.contacts.find(c => c.id === chatId);
    if (contact) {
      contact.unread = 0;
    }
  }

  // Search contacts
  public searchContacts(query: string): ChatContact[] {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get unread count for a chat
  public getUnreadCount(chatId: string): number {
    return this.messages[chatId]?.filter(
      message => !message.isRead && message.senderId !== 'me'
    ).length || 0;
  }

  // Get total unread count
  public getTotalUnreadCount(): number {
    return this.contacts.reduce((total, contact) => total + contact.unread, 0);
  }
}

export default MessageService; 