'use client'

import { useState, useEffect } from "react";
import { X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Skill {
  _id: string;
  name: string;
}

interface EditSkillsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Skill[] | { data: Skill[] } | null;
  onSave: (skillIds: string[]) => void;
  skillsList?: Skill[]; 
}

export function EditSkillsModal({ 
  open, 
  onOpenChange, 
  initialData, 
  onSave,
  skillsList = []
}: EditSkillsModalProps) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load initial selected skills
  useEffect(() => {
    if (initialData) {
      const loadedSkills = Array.isArray(initialData) ? initialData : (initialData?.data || []);
      setSelectedSkills([...loadedSkills]);
    }
  }, [initialData]);

  // Filter available skills based on search
  const filteredSkills = skillsList.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchInput.toLowerCase());
    const notSelected = !selectedSkills.some((s) => s._id === skill._id);
    return matchesSearch && notSelected;
  });

  // Add skill from suggestions
  const handleAddSkill = (skill: Skill) => {
    if (!selectedSkills.some((s) => s._id === skill._id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchInput("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: Skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s._id !== skillToRemove._id));
  };

  const handleSubmit = () => {
    // Send only IDs to backend
    const skillIds = selectedSkills.map((skill) => skill._id);
    onSave(skillIds);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Update Skills</DialogTitle>
          <DialogDescription>
            Search and add skills that highlight your expertise.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Search Input */}
          <div className="space-y-2 relative">
            <Label htmlFor="skill-search">Search Skills</Label>
            <Input
              id="skill-search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g. React, Python, Project Management"
              className="flex-1"
            />
            
            {/* Dropdown suggestions */}
            {showSuggestions && searchInput && filteredSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 max-h-[200px] overflow-y-auto border rounded-md bg-white shadow-lg">
                {filteredSkills.slice(0, 8).map((skill) => (
                  <button
                    key={skill._id}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 border-b last:border-b-0 text-sm transition-colors"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            )}

            {showSuggestions && searchInput && filteredSkills.length === 0 && (
              <div className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg px-4 py-3 text-sm text-slate-400">
                No matching skills found
              </div>
            )}
          </div>

          {/* Selected Skills Area */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 min-h-[120px]">
            <div className="flex flex-wrap gap-2">
              {selectedSkills.length > 0 ? (
                selectedSkills.map((skill) => (
                  <Badge 
                    key={skill._id} 
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5 text-sm bg-white border-slate-200 text-slate-700 hover:bg-white shadow-sm flex items-center gap-1"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:bg-slate-100 rounded-full p-0.5 transition-colors"
                      type="button"
                    >
                      <X className="h-3 w-3 text-slate-400 hover:text-red-500" />
                    </button>
                  </Badge>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center w-full text-slate-400 py-4 gap-2">
                  <Lightbulb className="h-6 w-6 opacity-50" />
                  <span className="text-sm">No skills added yet. Start searching above!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-700 cursor-pointer hover:bg-blue-800" disabled={selectedSkills.length === 0}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
