import { useState } from 'react';
import StatusBar from './StatusBar';
import BottomNav from './BottomNav';
import FloatingButton from './FloatingButton';
import NotificationsSheet from './NotificationsSheet';
import HomeTab from './tabs/HomeTab';
import GameTab from './tabs/GameTab';
import CartTab from './tabs/CartTab';
import FavoritesTab from './tabs/FavoritesTab';
import ProfileTab from './tabs/ProfileTab';
import AITab from './tabs/AITab';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameInitialTab, setGameInitialTab] = useState<'quiz' | 'games'>('quiz');
  const [storyOverlay, setStoryOverlay] = useState(false);

  const handleBannerAction = (action: string) => {
    switch (action) {
      case 'game':
        setGameInitialTab('games');
        setShowGame(true);
        setActiveTab('');
        break;
      case 'quiz':
        setGameInitialTab('quiz');
        setShowGame(true);
        setActiveTab('');
        break;
      case 'favorites':
        setShowGame(false);
        setActiveTab('favorites');
        break;
      case 'newArrivals':
        setShowGame(false);
        setActiveTab('home');
        break;
    }
  };

  const renderTab = () => {
    if (showGame) return <GameTab initialTab={gameInitialTab} />;

    switch (activeTab) {
      case 'home': return <HomeTab onNotifications={() => setShowNotifications(true)} onAction={handleBannerAction} onStoryOverlay={setStoryOverlay} />;
      case 'ai': return <AITab />;
      case 'cart': return <CartTab />;
      case 'favorites': return <FavoritesTab />;
      case 'profile': return <ProfileTab />;
      default: return <HomeTab onNotifications={() => setShowNotifications(true)} onAction={handleBannerAction} onStoryOverlay={setStoryOverlay} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setShowGame(false);
    setActiveTab(tab);
  };

  return (
    <div className="relative w-full h-full bg-white">
      <StatusBar />

      <div
        className="absolute inset-0 top-[52px] bottom-[72px] overflow-x-hidden"
        style={{ overflowY: storyOverlay ? 'hidden' : 'auto' }}
      >
        {renderTab()}
      </div>

      {/* Floating button - only on home tab */}
      {activeTab === 'home' && !showGame && (
        <FloatingButton
          onTap={() => {
            setShowGame(true);
            setActiveTab('');
          }}
          bottomOffset={86}
        />
      )}

      <BottomNav activeTab={showGame ? '' : activeTab} onTabChange={handleTabChange} />

      {/* Notifications overlay */}
      {showNotifications && (
        <NotificationsSheet onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}
