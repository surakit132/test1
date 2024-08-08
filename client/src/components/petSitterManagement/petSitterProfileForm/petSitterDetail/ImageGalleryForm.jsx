import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../../../utils/storage';
import PetSitterAddImgGallery from '../../../../assets/svgs/pet-sitter-management/pet-sitter-addImgGallery.svg';

const ImageGalleryForm = ({ image_gallery, setFormData, petsitterId }) => {
  const handleImageUpload = async (event) => {
    if (image_gallery.length < 10) {
      const file = event.target.files[0];
      if (file) {
        const profileId = petsitterId();
        const fileName = `${profileId}/${uuidv4()}`;
        try {
          const { data, error } = await supabase
            .storage
            .from('petsitter_image_gallery')
            .upload(fileName, file, { upsert: true });

          if (error) {
            throw error;
          }

          const { data: publicUrlData, error: urlError } = supabase
            .storage
            .from('petsitter_image_gallery')
            .getPublicUrl(fileName);
          if (urlError) {
            throw urlError;
          }

          setFormData((prev) => ({
            ...prev,
            image_gallery: [...prev.image_gallery, publicUrlData.publicUrl],
          }));
        } catch (error) {
          console.error('Error uploading or fetching image URL:', error);
        }
      }
    }
  };

  const handleRemoveImage = async (index) => {
    const imageUrl = image_gallery[index];
    const fileName = decodeURIComponent(imageUrl.split('/').pop());

    try {
      const { error } = await supabase
        .storage
        .from('petsitter_image_gallery')
        .remove([fileName]);

      if (error) {
        throw error;
      }

      setFormData((prev) => ({
        ...prev,
        image_gallery: prev.image_gallery.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error('Error removing image from gallery:', error);
    }
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <label className="text-[16px] leading-[24px] text-black font-medium">
        Image Gallery* (minimum 3 images, maximum 10 images)
      </label>
      <div className="container mx-auto">
        <div className="flex gap-[24px] flex-wrap">
          {image_gallery.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`upload-${index}`} className="w-[167px] h-[167px] rounded-[8px] flex justify-center items-center object-contain bg-primarygray-200" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute w-[24px] h-[24px] top-[-5px] right-[-5px] bg-primarygray-400 text-white rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
          {image_gallery.length < 10 && (
            <label className="cursor-pointer">
              <img
                src={PetSitterAddImgGallery}
                alt="Add"
                className="w-[167px] h-[167px] inline-block"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryForm;

