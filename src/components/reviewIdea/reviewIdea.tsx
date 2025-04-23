import React, { useState } from "react";
import { Modal, Button } from "rizzui";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api/api.config";

export default function ReviewIdea() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(location.state?.idea || {});
  console.log("Idea Data:", formData);
  console.log("Idea Data:", formData._id);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle Stage Change
  const handleStageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      stage: { ...prevData.stage, label: e.target.value },
    }));
  };

  // ✅ useMutation for updating the idea
  const mutation = useMutation({
    mutationKey: ["updateIdea", formData.id],
    mutationFn: async (updatedData) => {
      const response = await apiClient.patch(
        `/review-idea/${formData._id}`,
        updatedData
      );
      console.log("Idea Data:", formData);
      console.log("Idea Data res*6nessdn2cd5:", response.data);

      return response.data;
    },
    onSuccess: (data) => {
      console.log("Idea updated successfully:", data);
      setIsEditing(false);
      navigate(-1);
    },
    onError: (err) => {
      console.error("Error updating idea:", err);
    },
  });

  // ✅ Handle Save
  const handleSave = () => {
    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={true} onClose={() => navigate(-1)}>
      <div className="p-6 w-full max-w-3xl">
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Review Idea</h2>
          <Button variant="outline" onClick={() => navigate(-1)}>
            ✖ Close
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {[
            "title",
            "shortDescription",
            "problemDescription",
            "proposedSolution",
            "innovativeAspects",
            "competitiveAnalysis",
            "targetedAudience",
            "marketNeeded",
          ].map((field) => (
            <div key={field}>
              <h3 className="font-medium">
                {field.replace(/([A-Z])/g, " $1")}
              </h3>
              {isEditing ? (
                <textarea
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p>{formData[field]}</p>
              )}
            </div>
          ))}

          {/* Funds Required */}
          <div>
            <h3 className="font-medium">Funds Required</h3>
            {isEditing ? (
              <input
                type="number"
                name="funds"
                value={formData.funds || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>${formData.funds}</p>
            )}
          </div>

          {/* Files */}
          <div>
            <h3 className="font-medium">Files</h3>
            {formData.files ? (
              <a
                href={formData.files}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View File
              </a>
            ) : (
              <p>No files uploaded.</p>
            )}
          </div>

          {/* Stage */}
          <div>
            <h3 className="font-medium">Stage</h3>
            {isEditing ? (
              <select
                value={formData.stage?.label || ""}
                onChange={handleStageChange}
                className="w-full p-2 border rounded"
              >
                <option value="Refined">Refined</option>
                <option value="Unrefined">Unrefined</option>
              </select>
            ) : (
              <p>{formData.stage?.label}</p>
            )}
          </div>

          {/* Submitted By */}
          <div>
            <h3 className="font-medium">Submitted By</h3>
            <p>{formData.username}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={mutation.isLoading}>
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
          <Button variant="outline" onClick={() => navigate(-1)}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
