import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface SearchBarProps {
  onSearch: (query: string, tags: string[]) => void;
  onReset: () => void;
}

export function SearchBar({
  onSearch,
  onReset,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, selectedTags);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !selectedTags.includes(trimmedTag)) {
      setSelectedTags([...selectedTags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleReset = () => {
    setQuery("");
    setTagInput("");
    setSelectedTags([]);
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search services by name or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-border"
            />
          </div>
          <Button type="submit" variant="default">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add tags to filter (press Enter)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              className="flex-1 border border-border"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addTag(tagInput)}
              disabled={!tagInput.trim()}
            >
              Add Tag
            </Button>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}