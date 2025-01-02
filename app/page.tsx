'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectList } from '@/components/project-list';
import { Hero } from '@/components/hero';
import { SearchFilters } from '@/components/search-filters';
import { updateGitHubToken } from '@/lib/github';
import ComingSoon from '@/components/ComingSoon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('');
  const [language, setLanguage] = useState<string>('');

  // Handle GitHub token from URL after OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      updateGitHubToken(token);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />
      <Hero />
      <main className='container mx-auto px-4 py-8 flex-grow'>
        <SearchFilters
          onSearch={setSearchQuery}
          onTagsChange={setSelectedTags}
          onDifficultyChange={setDifficulty}
          onLanguageChange={setLanguage}
        />
        <Tabs defaultValue='projects' className='mt-8'>
          <TabsList>
            <TabsTrigger value='projects'>Projects</TabsTrigger>
            <TabsTrigger value='discord'>Discord Servers</TabsTrigger>
          </TabsList>
          <TabsContent value='projects'>
            <ProjectList
              searchQuery={searchQuery}
              selectedTags={selectedTags}
              difficulty={difficulty}
              language={language}
            />
          </TabsContent>
          <TabsContent value='discord'>
            <ComingSoon />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
