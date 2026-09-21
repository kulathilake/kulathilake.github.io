import React, { useState, useEffect } from 'react';
import { NavTab, Post } from './types';
import { BUILD_TIME_POSTS, fetchPostsFromGitHub } from './data/posts';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PostView } from './components/PostView';
import { ResearchView } from './components/ResearchView';
import { CodeView } from './components/CodeView';
import { AboutView } from './components/AboutView';
import { ArchiveView } from './components/ArchiveView';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [posts, setPosts] = useState<Post[]>(BUILD_TIME_POSTS);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Load build-time posts immediately, and optionally sync with remote GitHub repository
  useEffect(() => {
    // If a custom repository is set or if fetching updates, check remote
    fetchPostsFromGitHub('kulathilake', 'blog-posts', 'main', 'posts')
      .then((fetchedPosts) => {
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        }
      })
      .catch((err) => {
        console.info('Using local build-time markdown posts:', err);
      });
  }, []);

  // Scroll to top on navigation or post selection
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab, activePost]);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setActivePost(null);
  };

  const handleGoHome = () => {
    setCurrentTab('home');
    setActivePost(null);
  };

  const handleSelectPost = (post: Post) => {
    setActivePost(post);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f1] text-[#1a1a1a]">
      {/* Top Header matching both mockups */}
      <Header
        currentTab={activePost ? ('research' as NavTab) : currentTab}
        onSelectTab={handleSelectTab}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activePost ? (
          <PostView
            post={activePost}
            allPosts={posts}
            onBack={() => setActivePost(null)}
            onSelectPost={handleSelectPost}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView
                posts={posts}
                onSelectPost={handleSelectPost}
                onOpenContact={() => setIsContactOpen(true)}
                onViewAllResearch={() => handleSelectTab('research')}
              />
            )}

            {currentTab === 'research' && (
              <ResearchView
                posts={posts}
                onSelectPost={handleSelectPost}
              />
            )}

            {currentTab === 'code' && <CodeView />}

            {currentTab === 'about' && (
              <AboutView onOpenContact={() => setIsContactOpen(true)} />
            )}

            {currentTab === 'archive' && (
              <ArchiveView
                posts={posts}
                onSelectPost={handleSelectPost}
              />
            )}
          </>
        )}
      </main>

      {/* Minimalist Academic Footer matching both mockups */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCode={() => handleSelectTab('code')}
      />

      {/* Minimalist Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
