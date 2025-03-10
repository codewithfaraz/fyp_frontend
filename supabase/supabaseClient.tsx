import { createClient } from "@supabase/supabase-js";

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabaseClient = createClient(projectUrl, projectKey);
