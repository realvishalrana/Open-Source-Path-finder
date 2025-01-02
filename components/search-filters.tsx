'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
  onDifficultyChange: (difficulty: string) => void;
  onLanguageChange: (language: string) => void;
}

export function SearchFilters({
  onSearch,
  onTagsChange,
  onDifficultyChange,
  onLanguageChange,
}: SearchFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const popularTags = [
    'javascript',
    'python',
    'react',
    'typescript',
    'rust',
    'golang',
    'good-first-issue',
    'hacktoberfest',
    'documentation',
    'bug',
  ];

  const addTag = (tag: string) => {
    const newTags = [...selectedTags, tag];
    setSelectedTags(newTags);
    onTagsChange(newTags);
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    onTagsChange(newTags);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className='space-y-4 mb-8'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-grow'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search projects...'
            className='pl-10'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select onValueChange={onDifficultyChange}>
          <SelectTrigger className='w-full sm:w-[200px]'>
            <SelectValue placeholder='Difficulty' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='beginner'>Beginner</SelectItem>
            <SelectItem value='intermediate'>Intermediate</SelectItem>
            <SelectItem value='advanced'>Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onLanguageChange}>
          <SelectTrigger className='w-full sm:w-[200px]'>
            <SelectValue placeholder='Language' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='javascript'>JavaScript</SelectItem>
            <SelectItem value='typescript'>TypeScript</SelectItem>
            <SelectItem value='python'>Python</SelectItem>
            <SelectItem value='rust'>Rust</SelectItem>
            <SelectItem value='go'>Go</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-wrap gap-2'>
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant='secondary'
            className='cursor-pointer'
            onClick={() => removeTag(tag)}
          >
            {tag}
            <X className='ml-1 h-3 w-3' />
          </Badge>
        ))}
      </div>
      <div className='flex flex-wrap gap-2'>
        {popularTags
          .filter((tag) => !selectedTags.includes(tag))
          .map((tag) => (
            <Badge
              key={tag}
              variant='outline'
              className='cursor-pointer hover:bg-secondary'
              onClick={() => addTag(tag)}
            >
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
}
