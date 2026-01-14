-- Add service_category column to crs_partners table
ALTER TABLE public.crs_partners 
ADD COLUMN service_category TEXT DEFAULT 'operations';

-- Update existing records with appropriate categories based on service_description
UPDATE public.crs_partners 
SET service_category = 'operations' 
WHERE service_description ILIKE '%operations%' OR service_description ILIKE '%administration%';

UPDATE public.crs_partners 
SET service_category = 'energy' 
WHERE service_description ILIKE '%energy%';