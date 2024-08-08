import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_STORAGE_URL,
  process.env.SUPABASE_STORAGE_TOKEN
);

export const handleImageUpload = async (file) => {
  const fileName = uuidv4();
  const { data, error } = await supabase.storage
    .from("chat_images")
    .upload(fileName, file, { upsert: true });
  return `${process.env.SUPABASE_STORAGE_URL}/storage/v1/object/public/${data.fullPath}`
};
