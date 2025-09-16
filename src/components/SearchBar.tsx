import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button, TextField, TagGroup, TagList } from "@bcgov/design-system-react-components";

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
            <TextField
              label="Search Services"
              value={query}
              onChange={setQuery}
              className="w-full"
            />
          </div>
          <Button type="submit" variant="primary" size="medium">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="medium"
            onPress={handleReset}
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <TextField
              label="Add Tags"
              value={tagInput}
              onChange={setTagInput}
              onKeyDown={handleTagKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              size="medium"
              onPress={() => addTag(tagInput)}
              isDisabled={!tagInput.trim()}
            >
              Add Tag
            </Button>
          </div>

          {selectedTags.length > 0 && (
            <TagGroup aria-label="Selected filter tags">
              <TagList 
                items={selectedTags.map(tag => ({
                  id: tag,
                  textValue: tag,
                  onRemove: () => removeTag(tag)
                }))}
              />
            </TagGroup>
          )}
        </div>
      </form>
    </div>
  );
}