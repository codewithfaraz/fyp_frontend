import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button } from "rizzui";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { apiClient } from "../../../api/api.config";
const mutationKey = ["updateIdea"]; // Mutation key for tracking updates

const ViewIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { idea, isEditing: initialEditState } = location.state || {}; // Get idea and isEditing from state
  const [isEditing, setIsEditing] = useState(initialEditState || false); // Use initialEditState
  const [formData, setFormData] = useState(idea);

  if (!idea) {
    return <div className="text-center">No idea data available.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mutation function for updating idea
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (updatedData) => {
      const response = await apiClient.patch(
        `/innovator/update-idea/${formData.id}`,
        updatedData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Idea updated successfully:", data);
      setIsEditing(false);
      navigate(-1); // Navigate back to the previous page
    },
    onError: (err) => {
      console.error("Error updating idea:", err);
    },
  });

  // Mutation state tracking
  const mutationState = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.data,
  });

  const handleSave = () => {
    const updatedData = {
      title: formData.projectTitle,
      category: formData.category,
      funds: formData.amount,
      competitiveAnalysis: formData.competitiveAnalysis,
      problemDescription: formData.problemDescription,
      proposedSolution: formData.proposedSolution,
      marketNeeded: formData.marketNeeded,
      targetedAudience: formData.targetedAudience,
    };

    mutation.mutate(updatedData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-20 bg-gray-900 backdrop-blur">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {isEditing ? (
          <h2 className="text-xl font-bold text-center">Edit Idea</h2>
        ) : (
          <h2 className="text-xl font-bold text-center">View Idea</h2>
        )}

        <form className="flex flex-col space-y-4 mt-4">
          <Input
            label="Title"
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Amount"
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Competitive Analysis"
            type="text"
            name="competitiveAnalysis"
            value={formData.competitiveAnalysis}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Problem Description"
            type="text"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Proposed Solution"
            type="text"
            name="proposedSolution"
            value={formData.proposedSolution}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Market Needed"
            type="text"
            name="marketNeeded"
            value={formData.marketNeeded}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Targeted Audience"
            type="text"
            name="targetedAudience"
            value={formData.targetedAudience}
            onChange={handleChange}
            readOnly={!isEditing}
          />

          {mutation.isError && (
            <p className="text-red-500 text-center">
              Error updating idea. Try again.
            </p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-500 text-center">
              Idea updated successfully!
            </p>
          )}

          <div className="flex justify-center">
            {isEditing ? (
              <Button onClick={handleSave} disabled={mutation.isLoading}>
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewIdea;
